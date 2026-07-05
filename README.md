# Portal Pendaftaran MUBK

Portal web resmi untuk Pendaftaran Program Pembelajaran dan Pembelian Kitab Mahad Umar Bin Khattab (MUBK). Aplikasi ini dibangun dengan framework modern untuk memberikan pengalaman pengguna yang cepat, responsif, dan aman.

## 🚀 Fitur Utama

- **Pendaftaran Program & Pembelian Kitab:** Integrasi form pendaftaran program dan pembelian kitab dalam satu alur (Checkout) maupun terpisah.
- **Pembayaran Otomatis:** Terintegrasi dengan **Midtrans (Snap API)** untuk memproses pembayaran secara *real-time* (E-Wallet, Virtual Account, Qris, dll).
- **Perhitungan Ongkos Kirim Dinamis:** Sistem perhitungan ongkos kirim berdasarkan zona wilayah, termasuk opsi "Ambil Sendiri di Kantor" (Rp 0).
- **Pelacakan Pengiriman (Resi):** Sistem pelacakan pengiriman kitab. Admin dapat menginput nomor resi dan sistem akan otomatis mengirimkan email notifikasi ke peserta.
- **Notifikasi Email Otomatis:** Mengirim kuitansi (Invoice) Lunas, serta informasi pengiriman barang langsung ke email peserta menggunakan **Nodemailer**.
- **Dashboard Admin (CMS):** Area khusus pengurus untuk mengelola data pendaftaran, pesanan kitab, program baru, ongkos kirim, dan meng-ekspor data ke format Excel.
- **Optimasi SEO & Performa:** Dukungan meta tag Open Graph (OG), pembuatan sitemap otomatis, rendering sisi server (SSR) yang cepat, serta *image optimization*.

## 🛠 Teknologi yang Digunakan

- **Frontend:** [Nuxt 3](https://nuxt.com/), [Vue 3](https://vuejs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore) (Database NoSQL)
- **Payment Gateway:** [Midtrans](https://midtrans.com/)
- **Email Service:** Nodemailer (SMTP)
- **Deployment:** [Vercel](https://vercel.com/) (Rekomendasi)

## 📦 Panduan Instalasi (Development)

Pastikan Anda sudah menginstal Node.js (versi 18+) di perangkat Anda.

1. **Kloning Repositori & Instalasi Dependensi**
   ```bash
   npm install
   ```

2. **Konfigurasi Environment Variables**
   Buat file `.env` di *root folder* proyek Anda dan isi kredensial berikut:

   ```env
   # Firebase Config
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id

   # Midtrans Config
   MIDTRANS_CLIENT_KEY=your_client_key
   MIDTRANS_SERVER_KEY=your_server_key
   MIDTRANS_IS_PRODUCTION=false

   # Email Config (Nodemailer)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

## 🚀 Panduan Deployment (Vercel)

Aplikasi ini sangat siap untuk diluncurkan ke Vercel. 
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Atur **Framework Preset** ke `Nuxt.js`.
3. Masukkan seluruh konfigurasi dari file `.env` ke bagian **Environment Variables** di Vercel.
4. Klik **Deploy**.
5. Pastikan domain `daftar.mahadumar.id` sudah dikonfigurasi dan dihubungkan pada menu *Domains* di Vercel.

---
*Dibuat untuk memudahkan operasional Mahad Umar Bin Khattab.*
