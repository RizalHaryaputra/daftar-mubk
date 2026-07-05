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

export interface EmailItemDetail {
  name: string;
  price: number;
  quantity: number;
}

export interface ConfirmationEmailOptions {
  to: string;
  namaLengkap: string;
  kodeInvoice: string;
  total: number;
  items: EmailItemDetail[];
  tipePesanan: 'program' | 'kitab' | 'kombinasi';
  linkGrupWa?: string | null;
}

export const sendConfirmationEmail = async (opts: ConfirmationEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const itemsHtml = opts.items.map(item => `
    <tr style="border-bottom: 1px solid #f0f0f0;">
      <td style="padding: 12px 0; color: #555;">${item.name} <span style="color: #999; font-size: 12px;">x${item.quantity}</span></td>
      <td style="padding: 12px 0; text-align: right; font-weight: 500;">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
    </tr>
  `).join('');

  let instructionHtml = '';
  if (opts.tipePesanan === 'program' || opts.tipePesanan === 'kombinasi') {
    if (opts.linkGrupWa) {
      instructionHtml += `
        <div style="margin: 16px 0; padding: 16px; background-color: #E8F5E9; border-left: 4px solid #4CAF50; border-radius: 4px; text-align: center;">
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #2E7D32;"><strong>Info Program:</strong> Anda telah terdaftar dalam program kami. Silakan bergabung dengan grup WhatsApp untuk informasi selanjutnya.</p>
          <a href="${opts.linkGrupWa}" target="_blank" style="display: inline-block; background-color: #25D366; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold;">Gabung Grup WhatsApp</a>
        </div>
      `;
    } else {
      instructionHtml += `<p style="margin: 16px 0; padding: 12px; background-color: #FFF3E0; border-left: 4px solid #F5720A; font-size: 14px; border-radius: 4px;"><strong>Info Program:</strong> Persiapkan diri Anda untuk kelas! Informasi lebih lanjut akan segera menyusul atau hubungi Admin.</p>`;
    }
  }
  if (opts.tipePesanan === 'kitab' || opts.tipePesanan === 'kombinasi') {
    instructionHtml += `<p style="margin: 16px 0; padding: 12px; background-color: #FFF3E0; border-left: 4px solid #F5720A; font-size: 14px; border-radius: 4px;"><strong>Info Pengiriman:</strong> Kitab pesanan Anda sedang kami proses untuk pengemasan. Anda dapat melacak resi pengiriman melalui halaman Cek Status nanti.</p>`;
  }

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #3D1F1A; padding: 30px 24px; text-align: center;">
          <h1 style="color: #F5720A; margin: 0; font-size: 24px; letter-spacing: 1px;">MUBK Yogyakarta</h1>
          <p style="color: #e0e0e0; margin: 8px 0 0; font-size: 14px;">Ma'had 'Umar bin Khattab</p>
        </div>
        
        <div style="padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background-color: #E8F5E9; color: #2E7D32; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 16px;">
              ✓ Pembayaran Lunas
            </div>
            <h2 style="margin: 0; font-size: 20px; color: #3D1F1A;">Terima Kasih, ${opts.namaLengkap}!</h2>
            <p style="color: #666; margin-top: 8px; font-size: 15px;">Pembayaran Anda telah berhasil kami verifikasi.</p>
          </div>

          ${instructionHtml}

          <div style="margin-top: 32px; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Rincian Pesanan (#${opts.kodeInvoice})</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${itemsHtml}
              <tr>
                <td style="padding: 16px 0 8px; font-weight: bold; font-size: 16px;">Total Dibayar</td>
                <td style="padding: 16px 0 8px; text-align: right; font-weight: bold; font-size: 18px; color: #F5720A;">Rp ${opts.total?.toLocaleString('id-ID')}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 32px;">
            <a href="${appUrl}/cek-status?invoice=${opts.kodeInvoice}" style="display: inline-block; background-color: #F5720A; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold; box-shadow: 0 4px 6px rgba(245, 114, 10, 0.2);">
              Cek Status Pesanan
            </a>
          </div>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; font-size: 12px; color: #888;">Simpan email ini sebagai bukti pembayaran yang sah.</p>
        </div>
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

export interface InvoiceEmailOptions {
  to: string;
  namaLengkap: string;
  kodeInvoice: string;
  total?: number;
  items?: EmailItemDetail[];
  tipePesanan?: 'program' | 'kitab' | 'kombinasi';
  linkGrupWa?: string | null;
}

export const sendInvoiceEmail = async (opts: InvoiceEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const itemsHtml = (opts.items || []).map(item => `
    <tr style="border-bottom: 1px solid #f0f0f0;">
      <td style="padding: 12px 0; color: #555;">${item.name} <span style="color: #999; font-size: 12px;">x${item.quantity}</span></td>
      <td style="padding: 12px 0; text-align: right; font-weight: 500;">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #3D1F1A; padding: 30px 24px; text-align: center;">
          <h1 style="color: #F5720A; margin: 0; font-size: 24px; letter-spacing: 1px;">MUBK Yogyakarta</h1>
        </div>
        
        <div style="padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background-color: #FFF3E0; color: #E65100; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 16px;">
              ⏳ Menunggu Pembayaran
            </div>
            <h2 style="margin: 0; font-size: 20px; color: #3D1F1A;">Halo, ${opts.namaLengkap}!</h2>
            <p style="color: #666; margin-top: 8px; font-size: 15px;">Pesanan Anda berhasil dibuat. Silakan selesaikan pembayaran agar pesanan dapat segera diproses.</p>
          </div>

          <div style="margin-top: 32px; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Rincian Pesanan (#${opts.kodeInvoice})</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${itemsHtml}
              <tr>
                <td style="padding: 16px 0 8px; font-weight: bold; font-size: 16px;">Total Tagihan</td>
                <td style="padding: 16px 0 8px; text-align: right; font-weight: bold; font-size: 18px; color: #F5720A;">Rp ${opts.total?.toLocaleString('id-ID')}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 32px;">
            <a href="${appUrl}/cek-status?invoice=${opts.kodeInvoice}" style="display: inline-block; background-color: #F5720A; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold; box-shadow: 0 4px 6px rgba(245, 114, 10, 0.2);">
              Bayar Sekarang
            </a>
          </div>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; font-size: 12px; color: #888;">Tautan pembayaran memiliki batas waktu kedaluwarsa. Jangan bagikan tautan ini ke orang lain.</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"MUBK Yogyakarta" <${process.env.EMAIL_USER}>`,
    to: opts.to,
    subject: `📋 Menunggu Pembayaran — ${opts.kodeInvoice}`,
    html
  });
};

export const sendAdminNotificationEmail = async (opts: ConfirmationEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const itemsHtml = opts.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 8px 0; color: #555;">${item.name} x${item.quantity}</td>
      <td style="padding: 8px 0; text-align: right;">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background-color: #3D1F1A; padding: 24px; text-align: center;">
        <h1 style="color: #F5720A; margin: 0; font-size: 22px;">Admin Notification</h1>
      </div>
      <div style="padding: 32px 24px; border: 1px solid #eee; border-top: none;">
        <p style="font-size: 16px; margin-top: 0;">Pembayaran berhasil diterima dari <strong>${opts.namaLengkap}</strong>!</p>
        <p><strong>Tipe Pesanan:</strong> ${opts.tipePesanan.toUpperCase()}</p>
        
        <div style="margin-top: 20px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
          <p style="margin-top: 0; color: #888; font-size: 12px;">INVOICE: ${opts.kodeInvoice}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${itemsHtml}
            <tr>
              <td style="padding: 12px 0 0; font-weight: bold;">Total Pembayaran</td>
              <td style="padding: 12px 0 0; text-align: right; font-weight: bold; color: #F5720A;">Rp ${opts.total?.toLocaleString('id-ID')}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 24px;">
          <a href="${appUrl}/admin" style="display: inline-block; background-color: #F5720A; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold;">
            Buka Dashboard Admin
          </a>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"MUBK System" <${process.env.EMAIL_USER}>`,
    to: "rizalharyaputra.2023@student.uny.ac.id", // Kirim ke admin
    subject: `🔔 LUNAS: ${opts.tipePesanan.toUpperCase()} — ${opts.kodeInvoice}`,
    html
  });
};

export const sendFailedEmail = async (opts: InvoiceEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const itemsHtml = (opts.items || []).map(item => `
    <tr style="border-bottom: 1px solid #f0f0f0;">
      <td style="padding: 12px 0; color: #555;">${item.name} <span style="color: #999; font-size: 12px;">x${item.quantity}</span></td>
      <td style="padding: 12px 0; text-align: right; font-weight: 500;">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #3D1F1A; padding: 30px 24px; text-align: center;">
          <h1 style="color: #F5720A; margin: 0; font-size: 24px; letter-spacing: 1px;">MUBK Yogyakarta</h1>
        </div>
        
        <div style="padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background-color: #FFEBEE; color: #C62828; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 16px;">
              ❌ Pembayaran Batal/Kedaluwarsa
            </div>
            <h2 style="margin: 0; font-size: 20px; color: #3D1F1A;">Halo, ${opts.namaLengkap}</h2>
            <p style="color: #666; margin-top: 8px; font-size: 15px;">Mohon maaf, waktu pembayaran untuk pendaftaran Anda telah habis atau transaksi dibatalkan.</p>
          </div>

          <div style="margin-top: 32px; border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #fafafa;">
            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Rincian Pesanan Dibatalkan (#${opts.kodeInvoice})</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #888;">
              ${itemsHtml}
              <tr>
                <td style="padding: 16px 0 8px; font-weight: bold; font-size: 16px;">Total Tagihan</td>
                <td style="padding: 16px 0 8px; text-align: right; font-weight: bold; font-size: 18px;">Rp ${opts.total?.toLocaleString('id-ID')}</td>
              </tr>
            </table>
          </div>

          <p style="text-align: center; margin-top: 24px; font-size: 15px;">Jika Anda masih berminat, silakan lakukan pendaftaran ulang melalui situs web kami.</p>

          <div style="text-align: center; margin-top: 24px;">
            <a href="${appUrl}/" style="display: inline-block; background-color: #F5720A; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold; box-shadow: 0 4px 6px rgba(245, 114, 10, 0.2);">
              Daftar Ulang
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"MUBK Yogyakarta" <${process.env.EMAIL_USER}>`,
    to: opts.to,
    subject: `❌ Pembayaran Kedaluwarsa/Batal — ${opts.kodeInvoice}`,
    html
  });
};

export interface ResiEmailOptions {
  to: string;
  namaLengkap: string;
  kodeInvoice: string;
  kurir: string;
  nomorResi: string;
}

export const sendResiEmail = async (opts: ResiEmailOptions) => {
  const transporter = createTransporter();
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #3D1F1A; padding: 30px 24px; text-align: center;">
          <h1 style="color: #F5720A; margin: 0; font-size: 24px; letter-spacing: 1px;">MUBK Yogyakarta</h1>
        </div>
        
        <div style="padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background-color: #E3F2FD; color: #1976D2; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 16px;">
              🚚 Paket Telah Dikirim!
            </div>
            <h2 style="margin: 0; font-size: 20px; color: #3D1F1A;">Halo, ${opts.namaLengkap}</h2>
            <p style="color: #666; margin-top: 8px; font-size: 15px;">Kabar baik! Kitab pesanan Anda (Invoice #${opts.kodeInvoice}) sudah kami serahkan ke pihak ekspedisi dan saat ini sedang dalam perjalanan menuju alamat Anda.</p>
          </div>

          <div style="margin-top: 32px; border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #fafafa; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Jasa Pengiriman</p>
            <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: bold; color: #333;">${opts.kurir}</p>
            
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Nomor Resi</p>
            <p style="margin: 0; font-size: 22px; font-weight: bold; color: #F5720A; letter-spacing: 2px;">${opts.nomorResi}</p>
          </div>

          <div style="text-align: center; margin-top: 32px;">
            <a href="https://cekresi.com/?noresi=${opts.nomorResi}" target="_blank" style="display: inline-block; background-color: #1976D2; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold; box-shadow: 0 4px 6px rgba(25, 118, 210, 0.2);">
              Lacak Paket Sekarang
            </a>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #888; line-height: 1.5;">Status pelacakan mungkin membutuhkan waktu hingga 24 jam untuk diperbarui oleh pihak ekspedisi.<br>Anda juga dapat mengecek status pesanan melalui <a href="${appUrl}/cek-status?invoice=${opts.kodeInvoice}" style="color: #F5720A; text-decoration: none; font-weight: bold;">website kami</a>.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"MUBK Yogyakarta" <${process.env.EMAIL_USER}>`,
    to: opts.to,
    subject: `🚚 Paket Dikirim — ${opts.kodeInvoice}`,
    html
  });
};
