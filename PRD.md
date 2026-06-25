# Product Requirements Document (PRD)
## Sistem Promosi & Pendaftaran Program Bahasa Arab MUBK Yogyakarta

**Versi:** 1.0
**Tanggal:** 20 Juni 2026
**Status:** Draft untuk Review

---

## 1. Overview & Tujuan Produk

### 1.1 Latar Belakang
MUBK Yogyakarta membutuhkan sebuah platform berbasis website yang menggabungkan fungsi promosi program bahasa Arab sekaligus sistem pendaftaran dan pembayaran terintegrasi. Saat ini proses pendaftaran dan promosi kemungkinan masih dilakukan secara terpisah/manual, sehingga dibutuhkan sistem yang menyatukan alur dari calon peserta melihat informasi program hingga menyelesaikan pendaftaran dan pembayaran dalam satu platform.

### 1.2 Tujuan
- Menyediakan kanal promosi program dan kitab ajar MUBK Yogyakarta secara online.
- Menyederhanakan proses pendaftaran program dengan alur otomatis (form + pembayaran).
- Memungkinkan penjualan kitab ajar terintegrasi dengan pendaftaran program (bundling opsional).
- Memberikan kemudahan administrasi bagi pengelola MUBK melalui panel admin.

### 1.3 Target Pengguna
| Tipe Pengguna | Deskripsi |
|---|---|
| Calon Peserta (Publik) | Mengunjungi website, melihat info program/kitab, mendaftar, dan membayar |
| Admin MUBK | Mengelola data program, kitab, pendaftaran, dan pengaturan ongkir |

### 1.4 Prinsip Desain Sistem
- **Praktis dan cepat** — tidak perlu pembuatan akun untuk pendaftar (guest checkout).
- **Extensible** — alur seleksi manual untuk program reguler dapat ditambahkan di kemudian hari tanpa mengubah struktur dasar.
- **Sederhana dulu, scalable kemudian** — ongkir flat rate dan tanpa tracking stok kompleks, karena skala operasional masih kecil.

---

## 2. User Flow

### 2.1 Flow Pendaftaran (Calon Peserta)

```
┌─────────────────┐
│  Landing Page    │
└────────┬─────────┘
         │
         ▼
┌─────────────────────┐      ┌──────────────────┐
│ Daftar Program (List)│ ───► │ Detail Program     │
└─────────────────────┘      └────────┬───────────┘
                                       │
         ┌─────────────────────┐      │
         │ Daftar Kitab (List)  │      │
         └──────────┬───────────┘      │
                     │                 │
                     ▼                 │
         ┌──────────────────┐          │
         │ Detail Kitab       │          │
         └──────────┬─────────┘          │
                     │                  │
                     ▼                  ▼
              ┌────────────────────────────┐
              │   Form Pendaftaran          │
              │  (pilih program, kitab opsional,
              │   isi data diri, pilih zona ongkir
              │   jika beli kitab)           │
              └──────────────┬───────────────┘
                              │
                              ▼
              ┌────────────────────────────┐
              │ Validasi Duplikat Email     │
              │ (cek status existing)       │
              └──────────────┬───────────────┘
                              │
              ┌───────────────┴────────────────┐
              │                                 │
       Email+Program sudah SUCCESS      Email+Program PENDING / belum ada
              │                                 │
              ▼                                 ▼
      Tolak, tampilkan peringatan      Lanjut proses submit
                                                 │
                                                 ▼
                                  ┌────────────────────────────┐
                                  │ Simpan ke Firestore          │
                                  │ status: "pending"            │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌────────────────────────────┐
                                  │ Create Transaksi Midtrans     │
                                  │ Snap → dapat snap token        │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌────────────────────────────┐
                                  │ Tampilkan Snap Popup           │
                                  │ User melakukan pembayaran       │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌────────────────────────────┐
                                  │ Midtrans kirim notifikasi      │
                                  │ ke webhook (server/api/)        │
                                  └──────────────┬────────────────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              ▼                  ▼                  ▼
                          "success"          "pending"          "expire"/"failed"
                              │                  │                  │
                              ▼                  ▼                  ▼
                    Update status          Tetap pending      Update status
                    Firestore: success     (user bisa          Firestore: expire/failed
                    Kirim email             lanjutkan bayar)
                    konfirmasi
```

### 2.2 Flow "Lanjutkan Pembayaran"

```
┌──────────────────────┐         ┌──────────────────────────┐
│ Email Konfirmasi       │ ──────► │ Klik tombol "Lanjutkan      │
│ (berisi link langsung)  │         │ Pembayaran"                  │
└──────────────────────┘         └──────────────┬─────────────┘
                                                 │
┌──────────────────────┐                        │
│ Halaman Cek Status     │ ───────────────────────┤
│ (input kode invoice)    │                        │
└──────────────────────┘                        │
                                                 ▼
                                  ┌────────────────────────────┐
                                  │ Cek status di Firestore        │
                                  └──────────────┬────────────────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              ▼                  ▼                  ▼
                          "pending"          "success"          "expire"/"failed"
                              │                  │                  │
                              ▼                  ▼                  ▼
                    Generate ulang/        Tampilkan          Tampilkan info
                    reuse snap token       detail status       gagal/expire
                    → buka Snap popup       sukses
```

### 2.3 Flow Admin

```
Login (Firebase Auth) ─► Dashboard
                            │
        ┌───────────────────┼───────────────────┬─────────────────────┐
        ▼                   ▼                   ▼                     ▼
  Kelola Pendaftaran   Kelola Program      Kelola Kitab        Kelola Ongkir (Zona)
  - Lihat list/detail   - CRUD program      - CRUD kitab         - Set nominal flat
  - Filter status        - Set flag wajib    - Set flag           per 3 zona
  - Update manual          beli kitab          standalone
    (kasus khusus)        - Set deadline       - Set aktif/
                                                  nonaktif
```

---

## 3. Skema Data Firestore

### 3.1 Collection: `programs`
```
programs/{programId}
{
  nama: string,
  deskripsi: string,
  jadwal: string,              // contoh: "Senin & Rabu, 19.30-21.00 WIB"
  durasi: string,               // contoh: "3 bulan"
  harga: number,
  tanggalMulai: timestamp,
  deadlineDaftar: timestamp,
  gambarUrl: string,             // URL Cloudinary
  status: string,                // "aktif" | "nonaktif"
  wajibBeliKitab: boolean,       // apakah ada kitab wajib untuk daftar program ini
  kitabWajibIds: array<string>,  // referensi ke kitabs/{kitabId}, kosong jika tidak wajib
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 3.2 Collection: `kitabs`
```
kitabs/{kitabId}
{
  judul: string,
  penulis: string,
  deskripsi: string,
  harga: number,
  gambarUrl: string,             // URL Cloudinary
  kategori: string,
  status: string,                 // "aktif" | "nonaktif"
  bisaStandalone: boolean,        // bisa dibeli tanpa daftar program
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 3.3 Collection: `pendaftaran`
```
pendaftaran/{pendaftaranId}
{
  kodeInvoice: string,            // contoh: MUBK-20260620-XXXX, unique index
  programId: string | null,       // null jika skenario C (beli kitab saja)
  programNama: string,            // denormalized untuk kemudahan tampilan admin

  dataPeserta: {
    // Data Utama
    namaLengkap: string,
    email: string,
    noWa: string,
    jenisKelamin: string,           // "laki-laki" | "perempuan"
    tempatLahir: string,
    tanggalLahir: timestamp,
    domisili: string,
    pekerjaan: string,               // free text

    // Data Lainnya
    pernahBelajarBahasaArab: string, // free text
    pernahIkutProgramMubk: boolean,  // Ya/Tidak

    // Alamat Pengiriman (hanya diisi jika ada pembelian kitab)
    alamatPengiriman: string | null
  },

  kitabDibeli: array<{
    kitabId: string,
    judul: string,                 // denormalized
    harga: number,                  // harga saat transaksi (snapshot)
    qty: number
  }>,

  ongkir: {
    zona: string,                   // "jogja" | "jawa" | "luar_jawa" | null
    nominal: number                  // 0 jika tidak ada pembelian kitab
  },

  rincianBiaya: {
    biayaProgram: number,
    totalHargaKitab: number,
    ongkir: number,
    total: number
  },

  statusPembayaran: string,         // "pending" | "success" | "expire" | "failed"
  statusPengiriman: string,         // "belum_dikirim" | "dikirim" | "-" (jika tidak beli kitab)

  midtrans: {
    orderId: string,
    snapToken: string,
    transactionId: string | null,
    paymentType: string | null,
    statusRaw: string | null         // status mentah dari Midtrans untuk audit
  },

  createdAt: timestamp,
  updatedAt: timestamp
}
```

> **Catatan index Firestore:** perlu composite index pada `dataPeserta.email` + `programId` + `statusPembayaran` untuk mendukung query validasi duplikat secara efisien.

### 3.4 Collection: `settings`
```
settings/ongkir
{
  jogja: number,
  jawa: number,
  luarJawa: number,
  updatedAt: timestamp
}
```

### 3.5 Collection: `admins`
Dikelola melalui Firebase Authentication (email/password). Tidak memerlukan collection Firestore terpisah kecuali ingin menyimpan metadata tambahan (opsional, di luar scope awal).

---

## 4. Spesifikasi Halaman

### 4.1 Halaman Publik

| Halaman | Tipe Konten | Deskripsi |
|---|---|---|
| Landing Page | Statis | Hero section, deskripsi MUBK, highlight program/kitab unggulan, CTA ke daftar program |
| Daftar Program | Dinamis (Firestore) | List seluruh program dengan status aktif, info ringkas (nama, harga, jadwal, deadline) |
| Detail Program | Dinamis (Firestore) | Info lengkap program, kitab wajib (jika ada), tombol "Daftar Sekarang" |
| Daftar Kitab | Dinamis (Firestore) | List kitab dengan status aktif, info ringkas (judul, penulis, harga) |
| Detail Kitab | Dinamis (Firestore) | Info lengkap kitab, tombol "Beli" (jika `bisaStandalone: true`) |
| Form Pendaftaran + Pembayaran | Dinamis | Form data diri, pilihan kitab tambahan (cart), pilihan zona ongkir, ringkasan biaya, integrasi Snap |
| Cek Status Pendaftaran | Dinamis | Input kode invoice → tampilkan status & tombol lanjutkan bayar jika pending |

### 4.2 Halaman Admin

| Halaman | Fungsi |
|---|---|
| Dashboard | Ringkasan pendaftaran masuk, total pendapatan, program mendekati deadline |
| Kelola Pendaftaran | List + filter (program/status/tanggal), detail pendaftaran, update status manual, tandai kitab terkirim |
| Kelola Program | CRUD program, atur flag kitab wajib, atur status aktif/nonaktif |
| Kelola Kitab | CRUD kitab, atur flag `bisaStandalone`, atur status aktif/nonaktif |
| Kelola Ongkir (Zona) | Atur nominal flat untuk 3 zona (Jogja, Jawa, Luar Jawa) |

### 4.3 Rincian Field Form Pendaftaran

**Data Utama:**
| Field | Tipe Input | Wajib |
|---|---|---|
| Nama Lengkap | Text | Ya |
| Email | Text (email) | Ya |
| No. WhatsApp | Text | Ya |
| Jenis Kelamin | Radio (Laki-laki / Perempuan) | Ya |
| Tempat Lahir | Text | Ya |
| Tanggal Lahir | Date picker | Ya |
| Domisili | Text | Ya |
| Pekerjaan/Profesi | Text (free text) | Ya |

**Data Lainnya:**
| Field | Tipe Input | Wajib |
|---|---|---|
| Pernah Belajar Bahasa Arab | Text (free text) | Tidak |
| Pernah Ikut Program MUBK | Radio (Ya / Tidak) | Tidak |

**Kondisional (muncul jika ada pembelian kitab):**
| Field | Tipe Input | Wajib |
|---|---|---|
| Alamat Pengiriman Lengkap | Textarea | Ya (jika beli kitab) |
| Zona Ongkir | Dropdown (Jogja/Jawa/Luar Jawa) | Ya (jika beli kitab) |

> Field "Lainnya" bersifat dapat menyesuaikan kebutuhan screening per program ke depannya — struktur form dirancang agar mudah menambah field baru tanpa mengubah skema inti.

---

## 5. Alur Integrasi Midtrans (Sequence Diagram)

```
Peserta          Frontend (Nuxt)        Server API (Nuxt)        Firestore         Midtrans
   │                    │                      │                    │                 │
   │ Isi & submit form   │                      │                    │                 │
   │───────────────────►│                      │                    │                 │
   │                    │ POST /api/pendaftaran │                    │                 │
   │                    │─────────────────────►│                    │                 │
   │                    │                      │ Validasi duplikat   │                 │
   │                    │                      │───────────────────►│                 │
   │                    │                      │◄───────────────────│                 │
   │                    │                      │ Simpan status:pending│                │
   │                    │                      │───────────────────►│                 │
   │                    │                      │ Create transaksi Snap │               │
   │                    │                      │──────────────────────────────────────►│
   │                    │                      │◄──────────────────────────────────────│
   │                    │                      │ Simpan snapToken     │                 │
   │                    │                      │───────────────────►│                 │
   │                    │◄─────────────────────│                    │                 │
   │ Buka Snap Popup     │                      │                    │                 │
   │◄───────────────────│                      │                    │                 │
   │                    │                      │                    │                 │
   │ Lakukan pembayaran  │                      │                    │                 │
   │───────────────────────────────────────────────────────────────────────────────►│
   │                    │                      │                    │                 │
   │                    │                      │  Webhook notifikasi  │                 │
   │                    │                      │◄──────────────────────────────────────│
   │                    │                      │ Update status        │                 │
   │                    │                      │───────────────────►│                 │
   │                    │                      │ Kirim email (Nodemailer/SMTP Gmail)    │
   │                    │                      │ ke peserta            │                 │
   │                    │                      │                    │                 │
```

### 5.1 Endpoint Server Routes (Nuxt) yang Dibutuhkan
| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/pendaftaran` | POST | Submit form pendaftaran baru, validasi duplikat, simpan ke Firestore, create transaksi Snap |
| `/api/pendaftaran/[kodeInvoice]` | GET | Ambil detail status pendaftaran via kode invoice |
| `/api/pendaftaran/[kodeInvoice]/resume` | POST | Generate ulang/reuse snap token untuk lanjutkan pembayaran |
| `/api/midtrans/webhook` | POST | Menerima notifikasi status pembayaran dari Midtrans, update Firestore, trigger email |

### 5.2 Logika Validasi Duplikat (di endpoint POST `/api/pendaftaran`)
```
1. Cek Firestore: ada dokumen pendaftaran dengan email sama + programId sama?
2. Jika ada dan statusPembayaran == "success":
   → Tolak request, return error "Anda sudah terdaftar di program ini"
3. Jika ada dan statusPembayaran == "pending":
   → Tolak pembuatan baru, arahkan ke pendaftaran lama (return kodeInvoice lama)
4. Jika tidak ada / status lain (expire/failed):
   → Lanjutkan proses submit baru seperti biasa
```

---

## 6. Struktur Folder Nuxt (High-Level)

```
daftar-mubk/
├── pages/
│   ├── index.vue                      # Landing page
│   ├── program/
│   │   ├── index.vue                  # Daftar program
│   │   └── [id].vue                   # Detail program
│   ├── kitab/
│   │   ├── index.vue                  # Daftar kitab
│   │   └── [id].vue                   # Detail kitab
│   ├── pendaftaran.vue                # Form pendaftaran + pembayaran
│   ├── cek-status.vue                 # Cek status pendaftaran
│   └── admin/
│       ├── login.vue
│       ├── dashboard.vue
│       ├── pendaftaran/
│       │   ├── index.vue
│       │   └── [id].vue
│       ├── program/
│       │   ├── index.vue
│       │   └── [id].vue
│       ├── kitab/
│       │   ├── index.vue
│       │   └── [id].vue
│       └── ongkir.vue
├── server/
│   └── api/
│       ├── pendaftaran/
│       │   ├── index.post.ts
│       │   └── [kodeInvoice]/
│       │       ├── index.get.ts
│       │       └── resume.post.ts
│       └── midtrans/
│           └── webhook.post.ts
├── composables/
│   ├── useFirestore.ts
│   ├── useCloudinary.ts
│   └── useMidtrans.ts
├── utils/
│   ├── generateInvoiceCode.ts
│   └── emailTemplates.ts
├── middleware/
│   └── admin-auth.ts                  # Proteksi halaman admin
├── plugins/
│   └── firebase.client.ts
└── nuxt.config.ts
```

---

## 7. Hal Teknis Tambahan

### 7.1 Notifikasi Email
- Menggunakan **Nodemailer** dengan **Gmail App Password** (bukan OAuth).
- Email dikirim pada 2 kondisi:
  1. Setelah submit form (berisi kode invoice + link cek status + link lanjutkan bayar)
  2. Setelah pembayaran sukses (konfirmasi pendaftaran berhasil)
- Limit Gmail SMTP: 500 email/hari (akun biasa) — aman untuk skala MUBK saat ini.

### 7.2 Format Kode Invoice
```
MUBK-YYYYMMDD-XXXX
contoh: MUBK-20260620-A1B2
```
- `YYYYMMDD`: tanggal submit
- `XXXX`: random alphanumeric 4 karakter untuk menghindari collision

### 7.3 Autentikasi Admin
- Firebase Auth (email/password), 1 akun admin tetap.
- Halaman admin dilindungi middleware yang mengecek status login.

### 7.4 Ongkir
- Nominal flat global per zona (Jogja / Jawa / Luar Jawa), disimpan di `settings/ongkir`.
- Berlaku sama untuk semua kitab — tidak ada pengaturan ongkir per item.

---

## 8. Out of Scope / Future Improvements

Hal-hal berikut **tidak termasuk** dalam scope pengembangan tahap awal, namun sistem dirancang agar dapat diperluas ke arah ini:

| Fitur | Keterangan |
|---|---|
| Sistem akun member (login peserta) | Saat ini guest checkout; riwayat pendaftaran/pembelian via akun bisa ditambahkan kemudian dengan linking by email |
| Seleksi manual pendaftar | Saat ini approval otomatis setelah bayar; alur seleksi (untuk program reguler) bisa ditambahkan sebagai status tambahan di masa depan |
| Integrasi API ongkir (RajaOngkir/Biteship) | Saat ini flat rate manual; bisa di-upgrade tanpa mengubah struktur checkout |
| Tracking stok kitab | Saat ini hanya status aktif/nonaktif, tanpa hitung stok otomatis |
| Multi-role admin | Saat ini 1 role full akses; pemisahan admin keuangan vs admin program bisa ditambahkan nanti |
| Halaman pengaturan umum (CMS ringan) | Saat ini kontak/info statis di kode; bisa dibuat dinamis di kemudian hari |
| Notifikasi WhatsApp | Saat ini hanya email; integrasi WA gateway (Fonnte/Wablas) bisa ditambahkan |
| Kuota peserta per kelas | Saat ini hanya deadline tanggal, tanpa batas jumlah peserta |

---

## 9. Ringkasan Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend Framework | Nuxt.js |
| Autentikasi | Firebase Auth (admin only) |
| Database | Firestore |
| Storage Media | Cloudinary |
| Hosting/Deployment | Vercel |
| Payment Gateway | Midtrans Snap |
| Email | Nodemailer + Gmail SMTP (App Password) |
| Backend API | Nuxt Server Routes (`server/api/`) |

---

*Dokumen ini merupakan hasil diskusi awal dan dapat direvisi sesuai kebutuhan lebih lanjut sebelum masuk tahap implementasi.*
