import { getFirestoreDb } from '../../utils/firebase';
import { createSnapTransaction } from '../../utils/midtrans';
import { generateInvoiceCode } from '#imports';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = getFirestoreDb();
  
  // 1. Validasi Duplikat (Mock)
  // if exists & status == success -> reject
  // if exists & status == pending -> reject, return old invoice
  
  // 2. Generate Invoice
  const kodeInvoice = generateInvoiceCode();
  
  // 3. Simpan ke Firestore
  const pendaftaranRef = db.collection('pendaftaran').doc(kodeInvoice);
  await pendaftaranRef.set({
    kodeInvoice,
    ...body, // includes form data, program details, total costs
    statusPembayaran: 'pending',
    statusPengiriman: body.beliKitab ? 'belum_dikirim' : '-',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  // 4. Create Transaksi Midtrans
  const total = body.rincianBiaya?.total || 250000;
  const snapResult = await createSnapTransaction(kodeInvoice, total, {
    first_name: body.dataPeserta?.namaLengkap,
    email: body.dataPeserta?.email,
    phone: body.dataPeserta?.noWa
  });
  
  // 5. Update db with snap token
  await pendaftaranRef.update({
    'midtrans.snapToken': snapResult.token,
    updatedAt: new Date()
  });
  
  return {
    success: true,
    kodeInvoice,
    snapToken: snapResult.token,
    redirectUrl: snapResult.redirect_url
  };
});
