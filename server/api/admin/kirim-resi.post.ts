import { getFirestoreDb } from '../../utils/firebase';
import { sendResiEmail } from '../../utils/mailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { pendaftaranId, kurir, nomorResi } = body;

  if (!pendaftaranId || !kurir || !nomorResi) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID Pendaftaran, Kurir, dan Nomor Resi wajib diisi'
    });
  }

  try {
    const db = getFirestoreDb();
    const docRef = db.collection('pendaftaran').doc(pendaftaranId);
    
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      throw createError({ statusCode: 404, statusMessage: 'Data pendaftaran tidak ditemukan' });
    }

    const data = docSnap.data()!;

    // Update the document
    await docRef.update({
      statusPengiriman: 'dikirim',
      kurirPengiriman: kurir,
      nomorResi: nomorResi,
      updatedAt: new Date()
    });

    // Send email to user
    if (data.dataPeserta?.email) {
      await sendResiEmail({
        to: data.dataPeserta.email,
        namaLengkap: data.dataPeserta.namaLengkap,
        kodeInvoice: data.kodeInvoice,
        kurir: kurir,
        nomorResi: nomorResi
      });
    }

    return {
      success: true,
      message: 'Resi berhasil disimpan dan email dikirim'
    };
  } catch (error: any) {
    console.error('Kirim resi error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Terjadi kesalahan pada server'
    });
  }
});
