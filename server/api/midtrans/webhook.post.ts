import { getFirestoreDb } from '~/server/utils/firebase';
import { sendConfirmationEmail, sendAdminNotificationEmail, sendFailedEmail } from '~/server/utils/mailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = getFirestoreDb();

  const orderId: string = body.order_id;
  const status: string = body.transaction_status;

  if (!orderId || !status) {
    throw createError({ statusCode: 400, message: 'Invalid webhook payload' });
  }

  // Ambil kode invoice dari orderId (format MUBK-YYYYMMDD-XXXX)
  // orderId di Midtrans bisa berupa kodeInvoice itu sendiri
  const kodeInvoice = orderId;

  let dbStatus = 'pending';
  if (status === 'capture' || status === 'settlement') {
    dbStatus = 'success';
  } else if (status === 'deny' || status === 'cancel' || status === 'expire') {
    dbStatus = status === 'expire' ? 'expire' : 'failed';
  }

  const docRef = db.collection('pendaftaran').doc(kodeInvoice);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    // Bisa jadi format orderId berbeda, coba query
    console.warn(`Pendaftaran tidak ditemukan untuk orderId: ${orderId}`);
    return { success: false, message: 'Pendaftaran not found' };
  }

  await docRef.update({
    statusPembayaran: dbStatus,
    'midtrans.transactionId': body.transaction_id ?? null,
    'midtrans.paymentType': body.payment_type ?? null,
    'midtrans.statusRaw': status,
    updatedAt: new Date()
  });

  // Kirim email konfirmasi jika sukses
  if (dbStatus === 'success') {
    const data = docSnap.data();
    if (data?.dataPeserta?.email) {
      const items = [];
      if (data.rincianBiaya?.biayaProgram > 0) {
        items.push({ name: data.programNama || 'Program MUBK', price: data.rincianBiaya.biayaProgram, quantity: 1 });
      }
      for (const k of data.kitabDibeli || []) {
        items.push({ name: k.judul, price: k.harga, quantity: k.qty || 1 });
      }
      if (data.rincianBiaya?.ongkir > 0) {
        items.push({ name: 'Ongkos Kirim', price: data.rincianBiaya.ongkir, quantity: 1 });
      }

      let tipePesanan: 'program' | 'kitab' | 'kombinasi' = 'program';
      if (data.programId && (data.kitabDibeli?.length ?? 0) > 0) tipePesanan = 'kombinasi';
      else if (!data.programId && (data.kitabDibeli?.length ?? 0) > 0) tipePesanan = 'kitab';

      try {
        await sendConfirmationEmail({
          to: data.dataPeserta.email,
          namaLengkap: data.dataPeserta.namaLengkap,
          kodeInvoice: data.kodeInvoice,
          total: data.rincianBiaya?.total,
          items,
          tipePesanan
        });
        
        await sendAdminNotificationEmail({
          to: '', 
          namaLengkap: data.dataPeserta.namaLengkap,
          kodeInvoice: data.kodeInvoice,
          total: data.rincianBiaya?.total,
          items,
          tipePesanan
        });
      } catch (mailError) {
        // Jangan gagalkan webhook karena email gagal
        console.error('Email failed to send:', mailError);
      }
    }
  } else if (dbStatus === 'failed' || dbStatus === 'expire') {
    const data = docSnap.data();
    if (data?.dataPeserta?.email) {
      const items = [];
      if (data.rincianBiaya?.biayaProgram > 0) items.push({ name: data.programNama || 'Program', price: data.rincianBiaya.biayaProgram, quantity: 1 });
      for (const k of data.kitabDibeli || []) items.push({ name: k.judul, price: k.harga, quantity: k.qty || 1 });
      if (data.rincianBiaya?.ongkir > 0) items.push({ name: 'Ongkos Kirim', price: data.rincianBiaya.ongkir, quantity: 1 });

      let tipePesanan: 'program' | 'kitab' | 'kombinasi' = 'program';
      if (data.programId && (data.kitabDibeli?.length ?? 0) > 0) tipePesanan = 'kombinasi';
      else if (!data.programId && (data.kitabDibeli?.length ?? 0) > 0) tipePesanan = 'kitab';

      try {
        await sendFailedEmail({
          to: data.dataPeserta.email,
          namaLengkap: data.dataPeserta.namaLengkap,
          kodeInvoice: data.kodeInvoice,
          total: data.rincianBiaya?.total,
          items,
          tipePesanan
        });
      } catch (mailError) {
        console.error('Failed email failed to send:', mailError);
      }
    }
  }

  return { success: true };
});
