import { generateInvoiceCode } from '../../../utils/generateInvoiceCode';
import { getFirestoreDb } from '~/server/utils/firebase';
import { createSnapTransaction } from '~/server/utils/midtrans';
import { sendInvoiceEmail } from '~/server/utils/mailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { programId, programNama, jadwalPilihan, dataPeserta, kitabDibeli, ongkir, rincianBiaya } = body;

  const db = getFirestoreDb();

  // ===== 1. Validasi Duplikat =====
  // Cek jika email + programId sudah terdaftar dengan status success atau pending
  if (programId && dataPeserta?.email) {
    const existingSnap = await db.collection('pendaftaran')
      .where('dataPeserta.email', '==', dataPeserta.email)
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

  // ===== 2. Generate Kode Invoice =====
  const kodeInvoice = generateInvoiceCode();

  // ===== 3. Simpan ke Firestore =====
  const pendaftaranData = {
    kodeInvoice,
    programId: programId ?? null,
    programNama: programNama ?? null,
    jadwalPilihan: jadwalPilihan ?? null,
    dataPeserta: {
      ...dataPeserta,
      alamatPengiriman: kitabDibeli?.length > 0 ? (dataPeserta.alamatPengiriman ?? null) : null
    },
    kitabDibeli: kitabDibeli ?? [],
    ongkir: kitabDibeli?.length > 0
      ? { zona: ongkir?.zona ?? null, nominal: ongkir?.nominal ?? 0 }
      : { zona: null, nominal: 0 },
    rincianBiaya: {
      biayaProgram: rincianBiaya?.biayaProgram ?? 0,
      totalHargaKitab: rincianBiaya?.totalHargaKitab ?? 0,
      ongkir: rincianBiaya?.ongkir ?? 0,
      total: rincianBiaya?.total ?? 0
    },
    statusPembayaran: 'pending',
    statusPengiriman: kitabDibeli?.length > 0 ? 'belum_dikirim' : '-',
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

  // ===== 4. Create Transaksi Midtrans Snap =====
  const total = rincianBiaya?.total ?? 0;
  const itemDetails = [];

  if (rincianBiaya?.biayaProgram > 0) {
    itemDetails.push({
      id: programId ?? 'program',
      price: rincianBiaya.biayaProgram,
      quantity: 1,
      name: programNama ?? 'Program MUBK'
    });
  }

  for (const kitab of kitabDibeli ?? []) {
    itemDetails.push({
      id: kitab.kitabId,
      price: kitab.harga,
      quantity: kitab.qty ?? 1,
      name: kitab.judul
    });
  }

  if (rincianBiaya?.ongkir > 0) {
    itemDetails.push({
      id: 'ongkir',
      price: rincianBiaya.ongkir,
      quantity: 1,
      name: `Ongkos Kirim (${ongkir?.zona})`
    });
  }

  const snapResult = await createSnapTransaction(kodeInvoice, total, {
    first_name: dataPeserta?.namaLengkap,
    email: dataPeserta?.email,
    phone: dataPeserta?.noWa
  }, itemDetails);

  // ===== 5. Update Snap Token di Firestore =====
  await docRef.update({
    'midtrans.snapToken': snapResult.token,
    updatedAt: new Date()
  });

  // ===== 6. Kirim Email Invoice (Background) =====
  if (dataPeserta?.email) {
    let tipePesanan: 'program' | 'kitab' | 'kombinasi' = 'program';
    if (programId && (kitabDibeli?.length ?? 0) > 0) tipePesanan = 'kombinasi';
    else if (!programId && (kitabDibeli?.length ?? 0) > 0) tipePesanan = 'kitab';

    sendInvoiceEmail({
      to: dataPeserta.email,
      namaLengkap: dataPeserta.namaLengkap,
      kodeInvoice: kodeInvoice,
      total: total,
      items: itemDetails,
      tipePesanan
    }).catch(err => console.error('Gagal kirim email invoice:', err));
  }

  return {
    success: true,
    kodeInvoice,
    snapToken: snapResult.token,
    redirectUrl: snapResult.redirect_url
  };
});
