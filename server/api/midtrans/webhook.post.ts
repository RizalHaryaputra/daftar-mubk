import { getFirestoreDb } from '~/server/utils/firebase';
import { verifyMidtransSignature } from '~/server/utils/midtrans';
import { sendConfirmationEmail, sendAdminNotificationEmail, sendFailedEmail } from '~/server/utils/mailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = getFirestoreDb();

  const orderId: string = body?.order_id;
  const statusCode: string = body?.status_code;
  const grossAmount: string = body?.gross_amount;
  const signatureKey: string = body?.signature_key;
  const transactionStatus: string = body?.transaction_status;
  const fraudStatus: string | undefined = body?.fraud_status;

  if (!orderId || !statusCode || !grossAmount || !signatureKey || !transactionStatus) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid webhook payload: missing required Midtrans notification fields'
    });
  }

  // 1. Verifikasi Signature Key Midtrans (SHA512: order_id + status_code + gross_amount + ServerKey)
  const isValidSignature = verifyMidtransSignature(orderId, statusCode, grossAmount, signatureKey);
  if (!isValidSignature) {
    console.warn(`[Midtrans Webhook] Unauthorized signature attempt for orderId: ${orderId}`);
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid Midtrans signature key'
    });
  }

  // 2. Ambil dokumen pendaftaran dari Firestore
  const kodeInvoice = orderId;
  const docRef = db.collection('pendaftaran').doc(kodeInvoice);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    console.warn(`[Midtrans Webhook] Pendaftaran tidak ditemukan untuk orderId: ${orderId}`);
    return { success: false, message: 'Pendaftaran not found' };
  }

  const existingData = docSnap.data();
  const previousStatus = existingData?.statusPembayaran;

  // 3. Tentukan status pembayaran sesuai standar Midtrans
  let dbStatus = 'pending';
  if (transactionStatus === 'capture') {
    if (fraudStatus === 'challenge') {
      dbStatus = 'challenge';
    } else if (fraudStatus === 'accept') {
      dbStatus = 'success';
    }
  } else if (transactionStatus === 'settlement') {
    dbStatus = 'success';
  } else if (transactionStatus === 'pending') {
    dbStatus = 'pending';
  } else if (transactionStatus === 'deny' || transactionStatus === 'cancel' || transactionStatus === 'expire') {
    dbStatus = transactionStatus === 'expire' ? 'expire' : 'failed';
  }

  // 4. Update data transaksi di Firestore
  await docRef.update({
    statusPembayaran: dbStatus,
    'midtrans.transactionId': body.transaction_id ?? null,
    'midtrans.paymentType': body.payment_type ?? null,
    'midtrans.statusRaw': transactionStatus,
    'midtrans.statusCode': statusCode,
    'midtrans.fraudStatus': fraudStatus ?? null,
    updatedAt: new Date()
  });

  // 5. Kirim email konfirmasi jika status berubah menjadi sukses (hindari duplikasi kirim)
  if (dbStatus === 'success' && previousStatus !== 'success') {
    const data = existingData;
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
          tipePesanan,
          linkGrupWa: data.linkGrupWa
        });

        await sendAdminNotificationEmail({
          to: '',
          namaLengkap: data.dataPeserta.namaLengkap,
          kodeInvoice: data.kodeInvoice,
          total: data.rincianBiaya?.total,
          items,
          tipePesanan,
          linkGrupWa: data.linkGrupWa
        });
      } catch (mailError) {
        console.error('[Midtrans Webhook] Confirmation email failed to send:', mailError);
      }
    }
  } else if ((dbStatus === 'failed' || dbStatus === 'expire') && previousStatus !== 'failed' && previousStatus !== 'expire') {
    const data = existingData;
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
        console.error('[Midtrans Webhook] Failed status email failed to send:', mailError);
      }
    }
  }

  return { success: true, message: 'Webhook processed successfully' };
});
