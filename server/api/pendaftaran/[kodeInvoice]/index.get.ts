import { getFirestoreDb } from '../../../utils/firebase';

export default defineEventHandler(async (event) => {
  const kodeInvoice = getRouterParam(event, 'kodeInvoice');
  const db = getFirestoreDb();
  
  const docRef = db.collection('pendaftaran').doc(kodeInvoice);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invoice tidak ditemukan'
    });
  }
  
  return {
    success: true,
    data: doc.data()
  };
});
