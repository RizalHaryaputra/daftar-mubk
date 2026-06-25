import { getFirestoreDb } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = getFirestoreDb();
  
  // Notifikasi Midtrans: order_id, transaction_status, dll
  const orderId = body.order_id;
  const status = body.transaction_status;
  
  // Extract kodeInvoice (if orderId was manipulated like MUBK-XXXX-timestamp)
  const kodeInvoice = orderId.split('-').slice(0, 3).join('-'); 
  
  let dbStatus = 'pending';
  if (status === 'capture' || status === 'settlement') {
    dbStatus = 'success';
  } else if (status === 'deny' || status === 'cancel' || status === 'expire') {
    dbStatus = 'failed';
  }
  
  const docRef = db.collection('pendaftaran').doc(kodeInvoice);
  await docRef.update({
    statusPembayaran: dbStatus,
    'midtrans.transactionId': body.transaction_id,
    'midtrans.paymentType': body.payment_type,
    'midtrans.statusRaw': status,
    updatedAt: new Date()
  });
  
  // Trigger email jika status success (Mock)
  if (dbStatus === 'success') {
    console.log(`Mock Email: Pendaftaran berhasil untuk invoice ${kodeInvoice}`);
  }
  
  return { success: true };
});
