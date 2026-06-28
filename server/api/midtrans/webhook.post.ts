import { getFirestoreDb } from '../../utils/firebase';
import { sendConfirmationEmail } from '../../utils/mailer';

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
      try {
        await sendConfirmationEmail({
          to: data.dataPeserta.email,
          namaLengkap: data.dataPeserta.namaLengkap,
          kodeInvoice: data.kodeInvoice,
          programNama: data.programNama,
          total: data.rincianBiaya?.total
        });
      } catch (mailError) {
        // Jangan gagalkan webhook karena email gagal
        console.error('Email failed to send:', mailError);
      }
    }
  }

  return { success: true };
});
