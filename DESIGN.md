# Design System — Website MUBK Yogyakarta
> Panduan vibe coding untuk implementasi UI dengan Tailwind CSS + Nuxt.js

---

## 1. Brand Identity

### Warna Brand (diambil dari logo Ma'had 'Umar bin Khattab)

| Nama | Hex | Peran |
|---|---|---|
| **Brown Dark** | `#3D1F1A` | Warna dominan: navbar, hero, section gelap, footer |
| **Brown Deeper** | `#2A1511` | Footer, hover state elemen gelap |
| **Orange Primary** | `#F5720A` | CTA button, aksen, badge, link aktif |
| **Orange Muted** | `#F5720A1A` | Background badge/tag tipis di atas gelap (opacity 10%) |
| **Cream** | `#F5F0E8` | Background page utama (bukan putih murni) |
| **White** | `#FFFFFF` | Background card, input field |
| **Text Muted** | `#888880` | Label, metadata, caption |
| **Border Light** | `#E5DDD8` | Border card di atas cream |

### Extend Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          brown:   '#3D1F1A',
          deeper:  '#2A1511',
          orange:  '#F5720A',
          cream:   '#F5F0E8',
          border:  '#E5DDD8',
          muted:   '#888880',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Plus Jakarta Sans', 'sans-serif'],
      },
    }
  }
}
```

### Google Fonts (pasang di nuxt.config.ts)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500&display=swap'
        }
      ]
    }
  }
})
```

---

## 2. Tipografi

| Peran | Font | Tailwind Class | Catatan |
|---|---|---|---|
| Heading utama (H1) | Playfair Display | `font-display text-3xl font-normal` | Dipakai di hero & section title besar |
| Heading sekunder (H2) | Playfair Display | `font-display text-xl font-normal` | Section title (program, kitab, dll) |
| Heading tertier (H3) | Plus Jakarta Sans | `font-sans text-base font-medium` | Card title, label penting |
| Body / paragraf | Plus Jakarta Sans | `font-sans text-sm font-normal leading-relaxed` | Deskripsi, konten panjang |
| Caption / metadata | Plus Jakarta Sans | `font-sans text-xs text-brand-muted` | Jadwal, penulis, tag |
| Label / eyebrow | Plus Jakarta Sans | `font-sans text-xs font-medium tracking-widest uppercase` | Label kecil di atas heading |
| Harga | Plus Jakarta Sans | `font-sans text-sm font-medium text-brand-brown` | Nominal harga program/kitab |
| Huruf Arab dekoratif | serif (browser default) | `font-serif text-5xl text-brand-orange/30` | Aksen visual di card/hero |

---

## 3. Komponen UI

### 3.1 Navbar

```
Posisi: sticky top-0
Background: bg-brand-brown
Padding: px-6 py-3
Layout: flex items-center justify-between

Logo: font-display text-brand-orange text-base
Nav links: text-white/70 text-sm hover:text-white transition-colors
CTA button: lihat §3.5 Button Primary (ukuran kecil)
```

**Tailwind classes:**
```html
<nav class="sticky top-0 z-50 bg-brand-brown px-6 py-3 flex items-center justify-between">
  <span class="font-display text-brand-orange text-base">Ma'had 'Umar bin Khattab</span>
  <div class="hidden md:flex gap-6">
    <a class="text-white/70 text-sm hover:text-white transition-colors">Program</a>
    <a class="text-white/70 text-sm hover:text-white transition-colors">Kitab</a>
    <a class="text-white/70 text-sm hover:text-white transition-colors">Tentang</a>
  </div>
  <button class="bg-brand-orange text-white text-xs font-medium px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
    Daftar Sekarang
  </button>
</nav>
```

---

### 3.2 Hero Section

```
Background: bg-brand-brown
Padding: px-8 py-16 md:py-24
Posisi konten: max-w-lg (kiri), sisa kanan kosong / ornamen

Ornamen: huruf Arab besar posisi absolute kanan, opacity sangat rendah
Tag/eyebrow: badge kecil oranye di atas H1
Tagline H1: font-display text-3xl md:text-4xl text-white leading-snug
Sub: text-sm text-white/60 leading-relaxed mt-3 mb-6
Stats bar: border-t border-white/10 pt-6 mt-8 flex gap-8
```

**Tailwind classes:**
```html
<section class="bg-brand-brown relative overflow-hidden px-8 py-16 md:py-24 rounded-2xl">
  <!-- Ornamen huruf Arab -->
  <span class="absolute right-8 top-8 font-serif text-[120px] text-brand-orange/10 select-none leading-none">
    ع
  </span>

  <!-- Eyebrow -->
  <span class="inline-block bg-brand-orange/10 text-brand-orange text-xs font-medium px-3 py-1 rounded-full border border-brand-orange/30 mb-4">
    Program Bahasa Arab Yogyakarta
  </span>

  <!-- Heading -->
  <h1 class="font-display text-3xl md:text-4xl text-white leading-snug max-w-sm">
    Belajar Bahasa Arab<br>bersama <span class="text-brand-orange">Ahlinya</span>
  </h1>

  <!-- Sub -->
  <p class="text-sm text-white/60 leading-relaxed mt-3 mb-6 max-w-xs">
    Program intensif terstruktur, dari pemula hingga mahir, dengan kitab-kitab pilihan para ulama.
  </p>

  <!-- CTA Buttons -->
  <div class="flex gap-3 flex-wrap">
    <button class="bg-brand-orange text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
      Lihat Program →
    </button>
    <button class="text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors">
      Tentang MUBK
    </button>
  </div>

  <!-- Stats -->
  <div class="flex gap-8 border-t border-white/10 mt-10 pt-6">
    <div>
      <p class="font-display text-2xl text-brand-orange">12+</p>
      <p class="text-xs text-white/40 mt-0.5">Program aktif</p>
    </div>
    <div>
      <p class="font-display text-2xl text-brand-orange">500+</p>
      <p class="text-xs text-white/40 mt-0.5">Alumni peserta</p>
    </div>
    <div>
      <p class="font-display text-2xl text-brand-orange">8</p>
      <p class="text-xs text-white/40 mt-0.5">Tahun berpengalaman</p>
    </div>
  </div>
</section>
```

---

### 3.3 Card Program

```
Background: bg-white
Border: border border-brand-border
Radius: rounded-xl
Overflow: hidden (untuk gambar/area atas)

Area atas (gambar): bg-brand-brown h-28 relative
  → Huruf Arab besar sebagai placeholder visual
  → Badge status: "Buka" / "Segera Tutup" / "Tutup"

Body: p-4
  → Tag level (opsional): text-brand-orange text-xs font-medium
  → Judul: text-sm font-medium text-brand-brown leading-snug
  → Meta (jadwal): text-xs text-brand-muted mt-1
  → Divider + Footer: flex justify-between items-center

Footer card:
  → Harga: text-sm font-medium text-brand-brown
  → Tombol daftar: lihat §3.5 Button Secondary kecil
```

**Tailwind classes:**
```html
<div class="bg-white border border-brand-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
  <!-- Area visual atas -->
  <div class="bg-brand-brown h-28 relative flex items-center justify-center">
    <span class="font-serif text-5xl text-brand-orange/25 select-none">ن</span>
    <!-- Badge status -->
    <span class="absolute top-2.5 right-2.5 bg-brand-orange text-white text-[10px] font-medium px-2 py-0.5 rounded">
      Buka
    </span>
  </div>

  <!-- Body -->
  <div class="p-4">
    <p class="text-brand-orange text-[10px] font-medium uppercase tracking-wide mb-1">Pemula</p>
    <h3 class="text-sm font-medium text-brand-brown leading-snug mb-1">Nahwu Dasar Intensif</h3>
    <p class="text-xs text-brand-muted mb-3">Senin & Rabu · 19.30 WIB</p>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-3 border-t border-brand-border">
      <div>
        <p class="text-sm font-medium text-brand-brown">Rp 250.000</p>
        <p class="text-[10px] text-brand-muted">per program</p>
      </div>
      <button class="bg-brand-brown text-white text-[10px] font-medium px-3 py-1.5 rounded-md hover:bg-brand-deeper transition-colors">
        Daftar
      </button>
    </div>
  </div>
</div>
```

**Badge status:**
```html
<!-- Buka -->
<span class="bg-brand-orange text-white text-[10px] px-2 py-0.5 rounded">Buka</span>

<!-- Segera Tutup -->
<span class="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded">Segera Tutup</span>

<!-- Tutup -->
<span class="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded">Tutup</span>
```

---

### 3.4 Card Kitab

```
Layout: flex gap-3 items-start
Background: bg-white
Border: border border-brand-border
Radius: rounded-xl
Padding: p-3

Cover buku: w-9 h-12 bg-brand-brown rounded flex-shrink-0
  → Label "كتاب" kecil di tengah dengan warna brand-orange
Judul: text-xs font-medium text-brand-brown
Penulis: text-[10px] text-brand-muted
Harga: text-xs text-brand-orange font-medium
```

**Tailwind classes:**
```html
<div class="bg-white border border-brand-border rounded-xl p-3 flex gap-3 items-start hover:shadow-sm transition-shadow">
  <!-- Cover -->
  <div class="w-9 h-12 bg-brand-brown rounded flex-shrink-0 flex items-center justify-center">
    <span class="text-brand-orange text-[10px] font-serif">كتاب</span>
  </div>

  <!-- Info -->
  <div class="min-w-0">
    <p class="text-xs font-medium text-brand-brown leading-snug mb-0.5 truncate">Al-Ajurrumiyyah</p>
    <p class="text-[10px] text-brand-muted mb-2">Ibnu Ajurrum</p>
    <p class="text-xs text-brand-orange font-medium">Rp 45.000</p>
  </div>
</div>
```

---

### 3.5 Buttons

```html
<!-- Primary (CTA utama) -->
<button class="bg-brand-orange text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 active:scale-[0.98] transition-all">
  Daftar Sekarang
</button>

<!-- Secondary (dark) -->
<button class="bg-brand-brown text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-deeper active:scale-[0.98] transition-all">
  Lihat Detail
</button>

<!-- Outline (di atas background gelap) -->
<button class="text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 active:scale-[0.98] transition-all">
  Tentang MUBK
</button>

<!-- Ghost / link style -->
<button class="text-brand-orange text-sm font-medium hover:underline">
  Lihat semua →
</button>

<!-- Kecil (di dalam card) -->
<button class="bg-brand-brown text-white text-[10px] font-medium px-3 py-1.5 rounded-md hover:bg-brand-deeper transition-colors">
  Daftar
</button>
```

---

### 3.6 Section Header (dengan "Lihat semua")

```html
<div class="flex items-center justify-between mb-4">
  <h2 class="font-display text-xl text-brand-brown">Program Unggulan</h2>
  <button class="text-brand-orange text-sm font-medium hover:underline">Lihat semua →</button>
</div>
```

---

### 3.7 Section "Cara Daftar"

```
Background: bg-brand-brown
Radius: rounded-2xl
Padding: px-8 py-8
Grid: 4 kolom di desktop, 2 kolom di mobile

Step number: lingkaran kecil, border brand-orange/40, text brand-orange
Step title: text-white text-xs font-medium
Step desc: text-white/50 text-[10px] leading-relaxed
```

```html
<section class="bg-brand-brown rounded-2xl px-8 py-8">
  <h2 class="font-display text-xl text-white mb-6">Cara daftar</h2>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div class="text-center">
      <div class="w-8 h-8 rounded-full border border-brand-orange/40 bg-brand-orange/10 text-brand-orange text-sm font-medium flex items-center justify-center mx-auto mb-3">1</div>
      <p class="text-white text-xs font-medium mb-1">Pilih program</p>
      <p class="text-white/50 text-[10px] leading-relaxed">Cari program yang sesuai level Anda</p>
    </div>
    <!-- ulangi untuk step 2, 3, 4 -->
  </div>
</section>
```

---

### 3.8 CTA Banner

```
Background: bg-brand-orange
Radius: rounded-2xl
Padding: px-8 py-6
Layout: flex justify-between items-center (wrap di mobile)

Heading: font-display text-xl text-white font-normal
Sub: text-sm text-white/80
Button: bg-brand-brown text-white (lihat §3.5 Secondary)
```

```html
<section class="bg-brand-orange rounded-2xl px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  <div>
    <h2 class="font-display text-xl text-white font-normal mb-1">Siap memulai perjalanan bahasa Arab Anda?</h2>
    <p class="text-sm text-white/80">Pendaftaran dibuka — daftar sekarang sebelum batas waktu.</p>
  </div>
  <button class="bg-brand-brown text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-deeper transition-colors whitespace-nowrap flex-shrink-0">
    Daftar Sekarang →
  </button>
</section>
```

---

### 3.9 Form Input

```
Semua input pakai rounded-lg, border border-brand-border, focus:border-brand-orange
Background: bg-white
Padding: px-4 py-2.5
Font size: text-sm
Label: text-sm font-medium text-brand-brown mb-1.5

Required marker: text-brand-orange ml-0.5
Helper text: text-xs text-brand-muted mt-1
Error text: text-xs text-red-500 mt-1
```

```html
<!-- Text input -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-brown">
    Nama Lengkap <span class="text-brand-orange">*</span>
  </label>
  <input
    type="text"
    placeholder="Masukkan nama lengkap"
    class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors"
  />
</div>

<!-- Select / Dropdown -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-brown">
    Jenis Kelamin <span class="text-brand-orange">*</span>
  </label>
  <select class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors appearance-none">
    <option value="">Pilih jenis kelamin</option>
    <option value="laki-laki">Laki-laki</option>
    <option value="perempuan">Perempuan</option>
  </select>
</div>

<!-- Textarea -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-brown">Alamat Pengiriman</label>
  <textarea
    rows="3"
    placeholder="Masukkan alamat lengkap"
    class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
  ></textarea>
</div>
```

---

### 3.10 Status Badge Pendaftaran

```html
<!-- Pending -->
<span class="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
  Menunggu Pembayaran
</span>

<!-- Success -->
<span class="bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
  Terdaftar
</span>

<!-- Expire / Failed -->
<span class="bg-red-50 text-red-600 border border-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
  Kadaluarsa
</span>

<!-- Buku dikirim -->
<span class="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
  Buku Dikirim
</span>
```

---

### 3.11 Footer

```html
<footer class="bg-brand-deeper rounded-2xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  <span class="font-display text-brand-orange text-sm">Ma'had 'Umar bin Khattab</span>
  <div class="flex gap-5">
    <a class="text-white/40 text-xs hover:text-white/70 transition-colors">Program</a>
    <a class="text-white/40 text-xs hover:text-white/70 transition-colors">Kitab</a>
    <a class="text-white/40 text-xs hover:text-white/70 transition-colors">Kontak</a>
    <a class="text-white/40 text-xs hover:text-white/70 transition-colors">Cek Status</a>
  </div>
  <span class="text-white/20 text-xs">© 2026 MUBK Yogyakarta</span>
</footer>
```

---

## 4. Layout & Spacing

### Background Page

```html
<body class="bg-brand-cream min-h-screen">
  <div class="max-w-5xl mx-auto px-4 py-6 space-y-3">
    <!-- Semua section dibungkus di sini dengan gap 3 (12px) antar section -->
  </div>
</body>
```

### Grid Program (list page)

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- card-card program -->
</div>
```

### Grid Kitab (list page)

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
  <!-- card-card kitab -->
</div>
```

### Section Spacing

```
Antar section besar: space-y-3 (12px) di wrapper utama
Padding dalam section: px-6 md:px-8 py-8 md:py-12
Heading ke konten: mb-4 md:mb-6
Card ke card: gap-4
```

---

## 5. Halaman & Ornamen Dekoratif

### Ornamen Huruf Arab
Digunakan sebagai elemen visual pengganti gambar placeholder. Tidak perlu dihapus saat sudah ada gambar asli — bisa berdampingan.

```html
<!-- Di dalam area card yang gelap -->
<span class="font-serif text-[80px] text-brand-orange/20 select-none leading-none">ع</span>

<!-- Di hero, ukuran lebih besar -->
<span class="absolute right-8 top-6 font-serif text-[140px] text-brand-orange/8 select-none leading-none pointer-events-none">
  م
</span>
```

Huruf yang direkomendasikan sebagai ornamen: `ع` `م` `ب` `ن` `ق` `ص` `ك`

### Divider antar section (di atas cream)

```html
<hr class="border-brand-border" />
```

---

## 6. Dark Section Pattern

Untuk section yang pakai `bg-brand-brown`, selalu gunakan palet teks berikut:

| Elemen | Class |
|---|---|
| Heading | `text-white` |
| Subheading / body | `text-white/70` |
| Caption / meta | `text-white/40` |
| Aksen / highlight | `text-brand-orange` |
| Border / divider | `border-white/10` |
| Button outline | `border-white/20 text-white hover:bg-white/5` |
| Badge/tag di atas gelap | `bg-brand-orange/10 text-brand-orange border border-brand-orange/30` |

---

## 7. Responsivitas

| Breakpoint | Keterangan |
|---|---|
| Default (mobile) | 1 kolom, padding `px-4`, teks lebih kecil |
| `sm` (640px+) | Grid 2 kolom untuk card |
| `md` (768px+) | Tampilkan nav links desktop, layout flex horizontal |
| `lg` (1024px+) | Grid 3 kolom card, max-width container aktif |

Semua komponen di atas sudah ditulis dengan `md:` prefix untuk breakpoint utama. Mobile-first secara default.

---

## 8. Hal yang Perlu Dihindari

- ❌ Jangan pakai warna putih murni (`#fff`) sebagai background page — pakai `bg-brand-cream`
- ❌ Jangan pakai shadow berlebihan — desain ini flat, cukup `hover:shadow-sm` saja
- ❌ Jangan pakai warna baru di luar palet brand (coklat, orange, cream, putih, abu muted)
- ❌ Jangan pakai font weight `font-bold` (700) atau `font-semibold` (600) — cukup `font-medium` (500) untuk emphasis
- ❌ Jangan pakai border-radius sangat besar (`rounded-3xl`, `rounded-full`) untuk card — maksimal `rounded-2xl`
- ❌ Jangan pakai animasi berlebihan — cukup `transition-colors` dan `transition-shadow` untuk interaksi

---

*Dokumen ini adalah panduan styling untuk vibe coding website MUBK Yogyakarta. Gunakan bersama PRD.md untuk referensi fitur dan struktur data.*
