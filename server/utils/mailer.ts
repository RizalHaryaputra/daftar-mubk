import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

interface ConfirmationEmailOptions {
  to: string;
  namaLengkap: string;
  kodeInvoice: string;
  programNama: string | null;
  total: number;
}

export const sendConfirmationEmail = async (opts: ConfirmationEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background-color: #3D1F1A; padding: 24px; text-align: center;">
        <h1 style="color: #F5720A; margin: 0; font-size: 22px;">MUBK Yogyakarta</h1>
        <p style="color: #fff; margin: 4px 0 0; font-size: 13px;">Ma'had 'Umar bin Khattab</p>
      </div>
      <div style="padding: 32px 24px; border: 1px solid #eee; border-top: none;">
        <p style="font-size: 16px; margin-top: 0;">Assalamu'alaikum, <strong>${opts.namaLengkap}</strong>!</p>
        <p>Pembayaran Anda telah berhasil dikonfirmasi. Berikut ringkasan pendaftaran Anda:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #777; width: 40%;">Kode Invoice</td>
            <td style="padding: 8px 0; font-weight: bold;">${opts.kodeInvoice}</td>
          </tr>
          ${opts.programNama ? `<tr>
            <td style="padding: 8px 0; color: #777;">Program</td>
            <td style="padding: 8px 0;">${opts.programNama}</td>
          </tr>` : ''}
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: bold;">Total Dibayar</td>
            <td style="padding: 12px 0; font-weight: bold; color: #F5720A;">Rp ${opts.total?.toLocaleString('id-ID')}</td>
          </tr>
        </table>
        <a href="${appUrl}/cek-status?invoice=${opts.kodeInvoice}" style="display: inline-block; background-color: #F5720A; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold;">
          Lihat Status Pendaftaran
        </a>
        <p style="margin-top: 24px; font-size: 13px; color: #777;">Simpan kode invoice Anda: <strong>${opts.kodeInvoice}</strong></p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"MUBK Yogyakarta" <${process.env.EMAIL_USER}>`,
    to: opts.to,
    subject: `✅ Pendaftaran Berhasil — ${opts.kodeInvoice}`,
    html
  });
};

interface InvoiceEmailOptions {
  to: string;
  namaLengkap: string;
  kodeInvoice: string;
}

export const sendInvoiceEmail = async (opts: InvoiceEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background-color: #3D1F1A; padding: 24px; text-align: center;">
        <h1 style="color: #F5720A; margin: 0; font-size: 22px;">MUBK Yogyakarta</h1>
      </div>
      <div style="padding: 32px 24px; border: 1px solid #eee; border-top: none;">
        <p>Assalamu'alaikum, <strong>${opts.namaLengkap}</strong>!</p>
        <p>Pendaftaran Anda telah diterima. Silakan selesaikan pembayaran sebelum batas waktu yang ditentukan.</p>
        <p><strong>Kode Invoice:</strong> ${opts.kodeInvoice}</p>
        <div style="margin: 24px 0;">
          <a href="${appUrl}/cek-status?invoice=${opts.kodeInvoice}" style="display: inline-block; background-color: #F5720A; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold; margin-right: 8px;">
            Lanjutkan Pembayaran
          </a>
        </div>
        <p style="font-size: 13px; color: #777;">Jangan bagikan kode invoice ini kepada siapapun.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"MUBK Yogyakarta" <${process.env.EMAIL_USER}>`,
    to: opts.to,
    subject: `📋 Invoice Pendaftaran MUBK — ${opts.kodeInvoice}`,
    html
  });
};
