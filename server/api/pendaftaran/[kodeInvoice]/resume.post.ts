import { getFirestoreDb } from '../../../utils/firebase';
import { createSnapTransaction } from '../../../utils/midtrans';

export default defineEventHandler(async (event) => {
  const kodeInvoice = getRouterParam(event, 'kodeInvoice') as string;
  const db = getFirestoreDb();
  
  const docRef = db.collection('pendaftaran').doc(kodeInvoice);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Invoice tidak ditemukan' });
  }
  
  const data = doc.data();
  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' });
  }
  if (data.statusPembayaran !== 'pending') {
    throw createError({ statusCode: 400, statusMessage: 'Hanya transaksi pending yang dapat dilanjutkan' });
  }
  
  // Dalam real implementasi, midtrans akan block orderId yg sama jika tidak expire.
  // Biasanya kita append timestamp ke orderId saat request ulang atau reuse snapToken lama jika belum expire.
  
  return {
    success: true,
    snapToken: 'mock-snap-token-123456' // using mock
  };
});
