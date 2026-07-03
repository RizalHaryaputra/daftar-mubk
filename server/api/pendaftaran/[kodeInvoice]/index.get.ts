import { getFirestoreDb } from '../../../utils/firebase';
import { checkTransactionStatus } from '../../../utils/midtrans';

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
  
  let data = doc.data();
  let statusPembayaran = data.statusPembayaran;
  
  // Jika masih pending, coba sinkronisasi manual dengan Midtrans 
  // (Sangat berguna untuk testing di localhost di mana webhook tidak masuk)
  if (statusPembayaran === 'pending') {
    const midtransStatus = await checkTransactionStatus(kodeInvoice);
    if (midtransStatus) {
      const status = midtransStatus.transaction_status;
      let newStatus = 'pending';
      
      if (status === 'capture' || status === 'settlement') {
        newStatus = 'success';
      } else if (status === 'deny' || status === 'cancel' || status === 'expire') {
        newStatus = status === 'expire' ? 'expire' : 'failed';
      }
      
      if (newStatus !== 'pending') {
        await docRef.update({
          statusPembayaran: newStatus,
          'midtrans.transactionId': midtransStatus.transaction_id ?? null,
          'midtrans.paymentType': midtransStatus.payment_type ?? null,
          'midtrans.statusRaw': status,
          updatedAt: new Date()
        });
        
        // Update local data variable to reflect changes
        data = (await docRef.get()).data();
      }
    }
  }
  
  return {
    success: true,
    data: data
  };
});
