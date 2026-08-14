import { generateInvoiceCode } from '../../../utils/generateInvoiceCode';
import { getFirestoreDb } from '~/server/utils/firebase';
import { createSnapTransaction } from '~/server/utils/midtrans';
import { sendInvoiceEmail } from '~/server/utils/mailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { programId, jadwalPilihan, modeBelajar, dataPeserta, kitabDibeli, ongkir, rincianBiaya } = body;

  const db = getFirestoreDb();

  // ===== 1. Validasi Data Peserta =====
  if (!dataPeserta?.namaLengkap || typeof dataPeserta.namaLengkap !== 'string' || !dataPeserta.namaLengkap.trim()) {
    throw createError({ statusCode: 400, message: 'Nama lengkap peserta wajib diisi.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dataPeserta?.email || !emailRegex.test(dataPeserta.email.trim())) {
    throw createError({ statusCode: 400, message: 'Format alamat email tidak valid.' });
  }

  if (!dataPeserta?.noWa || typeof dataPeserta.noWa !== 'string' || dataPeserta.noWa.trim().length < 8) {
    throw createError({ statusCode: 400, message: 'Nomor WhatsApp wajib diisi dengan benar.' });
  }

  const cleanedPeserta = {
    ...dataPeserta,
    namaLengkap: dataPeserta.namaLengkap.trim(),
    email: dataPeserta.email.trim().toLowerCase(),
    noWa: dataPeserta.noWa.trim()
  };

  // ===== 2. Validasi Duplikat Transaksi =====
  // Cek jika email + programId sudah terdaftar dengan status success atau pending
  if (programId && cleanedPeserta.email) {
    const existingSnap = await db.collection('pendaftaran')
      .where('dataPeserta.email', '==', cleanedPeserta.email)
      .where('programId', '==', programId)
      .get();

    if (!existingSnap.empty) {
      for (const docSnap of existingSnap.docs) {
        const data = docSnap.data();
        if (data.statusPembayaran === 'success') {
          throw createError({
            statusCode: 400,
            message: 'Anda sudah terdaftar dan berhasil membayar program ini.'
          });
        }
        if (data.statusPembayaran === 'pending') {
          // Kembalikan invoice lama agar user bisa lanjut bayar
          return {
            success: false,
            isDuplicate: true,
            kodeInvoice: data.kodeInvoice,
            snapToken: data.midtrans?.snapToken ?? null,
            message: 'Anda sudah memiliki pendaftaran yang menunggu pembayaran untuk program ini.'
          };
        }
      }
    }
  }

  // ===== 3. Backend Price Guard: Verifikasi Harga Program =====
  let verifiedBiayaProgram = 0;
  let verifiedProgramNama: string | null = null;
  let verifiedNamaPaket = 'Reguler';
  let linkGrupWa: string | null = null;
  let progData: any = null;

  if (programId) {
    const programSnap = await db.collection('programs').doc(programId).get();
    if (!programSnap.exists) {
      throw createError({ statusCode: 400, message: 'Program yang dipilih tidak ditemukan.' });
    }

    progData = programSnap.data();
    if (progData.status !== 'aktif') {
      throw createError({ statusCode: 400, message: 'Pendaftaran untuk program ini sedang ditutup.' });
    }

    // Cek deadline pendaftaran jika diset
    if (progData.deadlineDaftar) {
      const deadline = progData.deadlineDaftar.toDate ? progData.deadlineDaftar.toDate() : new Date(progData.deadlineDaftar);
      if (new Date() > deadline) {
        throw createError({ statusCode: 400, message: 'Batas waktu pendaftaran untuk program ini telah berakhir.' });
      }
    }

    verifiedProgramNama = progData.nama;

    // Verifikasi paket harga jika program memiliki opsi paket
    if (rincianBiaya?.namaPaket && Array.isArray(progData.paketHarga) && progData.paketHarga.length > 0) {
      const matchedPaket = progData.paketHarga.find((p: any) => p.nama === rincianBiaya.namaPaket);
      if (matchedPaket) {
        verifiedBiayaProgram = Math.round(Number(matchedPaket.harga) || 0);
        verifiedNamaPaket = matchedPaket.nama;
      } else {
        verifiedBiayaProgram = Math.round(Number(progData.harga) || 0);
      }
    } else {
      verifiedBiayaProgram = Math.round(Number(progData.harga) || 0);
    }

    // Tentukan Link Grup WhatsApp berdasarkan gender
    const jk = cleanedPeserta.jenisKelamin?.toLowerCase() || '';
    if (jk === 'laki-laki' && progData.linkGrupWaLaki) {
      linkGrupWa = progData.linkGrupWaLaki;
    } else if (jk === 'perempuan' && progData.linkGrupWaPerempuan) {
      linkGrupWa = progData.linkGrupWaPerempuan;
    } else {
      linkGrupWa = progData.linkGrupWa || null;
    }
  }

  // ===== 4. Backend Price Guard: Verifikasi Harga Kitab =====
  const verifiedKitabDibeli: Array<{ kitabId: string; judul: string; harga: number; qty: number }> = [];
  let verifiedTotalHargaKitab = 0;

  // Pastikan kitab wajib masuk jika program mewajibkan beli kitab
  const requestedKitabMap = new Map<string, number>();
  if (Array.isArray(kitabDibeli)) {
    for (const item of kitabDibeli) {
      const kId = item.kitabId || item.id;
      if (kId) {
        const qty = Math.max(1, Math.floor(Number(item.qty) || 1));
        requestedKitabMap.set(kId, qty);
      }
    }
  }

  if (progData?.wajibBeliKitab && Array.isArray(progData.kitabWajibIds)) {
    for (const wId of progData.kitabWajibIds) {
      if (!requestedKitabMap.has(wId)) {
        requestedKitabMap.set(wId, 1);
      }
    }
  }

  if (requestedKitabMap.size > 0) {
    for (const [kitabId, qty] of requestedKitabMap.entries()) {
      const kitabSnap = await db.collection('kitabs').doc(kitabId).get();
      if (!kitabSnap.exists) {
        throw createError({ statusCode: 400, message: `Kitab dengan ID "${kitabId}" tidak ditemukan.` });
      }
      const kData = kitabSnap.data();
      if (kData?.status !== 'aktif') {
        throw createError({ statusCode: 400, message: `Kitab "${kData?.judul || kitabId}" sedang tidak aktif/tersedia.` });
      }

      const realHarga = Math.round(Number(kData.harga) || 0);
      verifiedKitabDibeli.push({
        kitabId,
        judul: kData.judul,
        harga: realHarga,
        qty
      });
      verifiedTotalHargaKitab += realHarga * qty;
    }
  }

  // ===== 5. Backend Price Guard: Verifikasi Ongkir =====
  let verifiedOngkir = 0;
  let verifiedZona: string | null = null;

  if (verifiedKitabDibeli.length > 0) {
    const ongkirSnap = await db.collection('settings').doc('ongkir').get();
    const ongkirSetting = ongkirSnap.exists ? ongkirSnap.data() : { jogja: 15000, jawa: 25000, luarJawa: 45000 };

    const rawZona = ongkir?.zona;
    if (rawZona === 'jogja') {
      verifiedOngkir = Math.round(Number(ongkirSetting?.jogja ?? 15000));
      verifiedZona = 'jogja';
    } else if (rawZona === 'jawa') {
      verifiedOngkir = Math.round(Number(ongkirSetting?.jawa ?? 25000));
      verifiedZona = 'jawa';
    } else if (rawZona === 'luar_jawa') {
      verifiedOngkir = Math.round(Number(ongkirSetting?.luarJawa ?? 45000));
      verifiedZona = 'luar_jawa';
    } else if (rawZona === 'ambil_sendiri') {
      verifiedOngkir = 0;
      verifiedZona = 'ambil_sendiri';
    } else {
      throw createError({ statusCode: 400, message: 'Pilihan zona ongkos kirim tidak valid.' });
    }

    if (verifiedZona !== 'ambil_sendiri' && (!cleanedPeserta.alamatPengiriman || !cleanedPeserta.alamatPengiriman.trim())) {
      throw createError({ statusCode: 400, message: 'Alamat pengiriman wajib diisi untuk pengiriman kitab.' });
    }
  }

  // ===== 6. Backend Price Guard: Verifikasi Donasi & Total Akhir =====
  const verifiedDonasi = Math.max(0, Math.round(Number(rincianBiaya?.donasi) || 0));
  const verifiedTotal = verifiedBiayaProgram + verifiedTotalHargaKitab + verifiedOngkir + verifiedDonasi;

  if (verifiedTotal <= 0) {
    throw createError({ statusCode: 400, message: 'Total tagihan pembayaran tidak valid.' });
  }

  // ===== 7. Generate Kode Invoice =====
  const kodeInvoice = generateInvoiceCode();

  // ===== 8. Simpan ke Firestore dengan Data Terverifikasi =====
  const pendaftaranData = {
    kodeInvoice,
    programId: programId ?? null,
    programNama: verifiedProgramNama,
    jadwalPilihan: jadwalPilihan ?? null,
    modeBelajar: modeBelajar ?? null,
    dataPeserta: {
      ...cleanedPeserta,
      alamatPengiriman: verifiedKitabDibeli.length > 0 ? (cleanedPeserta.alamatPengiriman ?? null) : null
    },
    kitabDibeli: verifiedKitabDibeli,
    ongkir: verifiedKitabDibeli.length > 0
      ? { zona: verifiedZona, nominal: verifiedOngkir }
      : { zona: null, nominal: 0 },
    rincianBiaya: {
      biayaProgram: verifiedBiayaProgram,
      namaPaket: verifiedNamaPaket,
      totalHargaKitab: verifiedTotalHargaKitab,
      ongkir: verifiedOngkir,
      donasi: verifiedDonasi,
      total: verifiedTotal
    },
    linkGrupWa,
    statusPembayaran: 'pending',
    statusPengiriman: verifiedKitabDibeli.length > 0 ? 'belum_dikirim' : '-',
    midtrans: {
      orderId: kodeInvoice,
      snapToken: null,
      transactionId: null,
      paymentType: null,
      statusRaw: null
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const docRef = db.collection('pendaftaran').doc(kodeInvoice);
  await docRef.set(pendaftaranData);

  // ===== 9. Create Transaksi Midtrans Snap dengan Item Details Terverifikasi =====
  const itemDetails: any[] = [];

  if (verifiedBiayaProgram > 0) {
    itemDetails.push({
      id: programId ?? 'program',
      price: verifiedBiayaProgram,
      quantity: 1,
      name: `${verifiedProgramNama ?? 'Program MUBK'} (${verifiedNamaPaket})`.substring(0, 50)
    });
  }

  if (verifiedDonasi > 0) {
    itemDetails.push({
      id: 'donasi_sukarela',
      price: verifiedDonasi,
      quantity: 1,
      name: 'Donasi / Infaq Sukarela'
    });
  }

  for (const kitab of verifiedKitabDibeli) {
    itemDetails.push({
      id: kitab.kitabId,
      price: kitab.harga,
      quantity: kitab.qty,
      name: kitab.judul.substring(0, 50)
    });
  }

  if (verifiedOngkir > 0) {
    itemDetails.push({
      id: 'ongkir',
      price: verifiedOngkir,
      quantity: 1,
      name: `Ongkos Kirim (${verifiedZona})`.substring(0, 50)
    });
  }

  const snapResult = await createSnapTransaction(kodeInvoice, verifiedTotal, {
    first_name: cleanedPeserta.namaLengkap,
    email: cleanedPeserta.email,
    phone: cleanedPeserta.noWa
  }, itemDetails);

  // ===== 10. Update Snap Token di Firestore =====
  await docRef.update({
    'midtrans.snapToken': snapResult.token,
    updatedAt: new Date()
  });

  // ===== 11. Kirim Email Invoice =====
  if (cleanedPeserta.email) {
    let tipePesanan: 'program' | 'kitab' | 'kombinasi' = 'program';
    if (programId && verifiedKitabDibeli.length > 0) tipePesanan = 'kombinasi';
    else if (!programId && verifiedKitabDibeli.length > 0) tipePesanan = 'kitab';

    await sendInvoiceEmail({
      to: cleanedPeserta.email,
      namaLengkap: cleanedPeserta.namaLengkap,
      kodeInvoice,
      total: verifiedTotal,
      items: itemDetails,
      tipePesanan
    }).catch(err => console.error('[Pendaftaran API] Gagal kirim email invoice:', err));
  }

  return {
    success: true,
    kodeInvoice,
    snapToken: snapResult.token,
    redirectUrl: snapResult.redirect_url
  };
});
