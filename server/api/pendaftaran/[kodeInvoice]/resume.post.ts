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
  
  const snapToken = data.midtrans?.snapToken;
  if (!snapToken) {
    throw createError({ statusCode: 400, statusMessage: 'Token pembayaran tidak ditemukan. Silakan hubungi admin.' });
  }
  
  return {
    success: true,
    snapToken: snapToken
  };
});
