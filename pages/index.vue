<template>
  <div class="space-y-6">
    <!-- Hero Section -->
    <section class="bg-brand-brown relative overflow-hidden px-8 py-16 md:py-24 rounded-2xl">
      <!-- Ornamen huruf Arab -->
      <span class="absolute right-8 top-8 font-serif text-[120px] text-brand-orange/10 select-none leading-none pointer-events-none">
        م
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
        <AppButton variant="primary" @click="navigateTo('/program')">
          Lihat Program &rarr;
        </AppButton>
        <AppButton variant="outline" @click="navigateTo('/')">
          Tentang MUBK
        </AppButton>
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

    <!-- Program Unggulan Section -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-display text-xl text-brand-brown">Program Unggulan</h2>
        <NuxtLink to="/program" class="text-brand-orange text-sm font-medium hover:underline">Lihat semua &rarr;</NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardProgram v-for="program in mockPrograms" :key="program.id" :program="program" />
      </div>
    </section>

    <!-- Cara Daftar Section -->
    <section class="bg-brand-brown rounded-2xl px-8 py-8 mt-12">
      <h2 class="font-display text-xl text-white mb-6">Cara daftar</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-8 h-8 rounded-full border border-brand-orange/40 bg-brand-orange/10 text-brand-orange text-sm font-medium flex items-center justify-center mx-auto mb-3">1</div>
          <p class="text-white text-xs font-medium mb-1">Pilih program</p>
          <p class="text-white/50 text-[10px] leading-relaxed">Cari program yang sesuai level Anda</p>
        </div>
        <div class="text-center">
          <div class="w-8 h-8 rounded-full border border-brand-orange/40 bg-brand-orange/10 text-brand-orange text-sm font-medium flex items-center justify-center mx-auto mb-3">2</div>
          <p class="text-white text-xs font-medium mb-1">Isi formulir</p>
          <p class="text-white/50 text-[10px] leading-relaxed">Lengkapi data diri dan alamat pengiriman</p>
        </div>
        <div class="text-center">
          <div class="w-8 h-8 rounded-full border border-brand-orange/40 bg-brand-orange/10 text-brand-orange text-sm font-medium flex items-center justify-center mx-auto mb-3">3</div>
          <p class="text-white text-xs font-medium mb-1">Pembayaran</p>
          <p class="text-white/50 text-[10px] leading-relaxed">Selesaikan pembayaran via transfer/e-wallet</p>
        </div>
        <div class="text-center">
          <div class="w-8 h-8 rounded-full border border-brand-orange/40 bg-brand-orange/10 text-brand-orange text-sm font-medium flex items-center justify-center mx-auto mb-3">4</div>
          <p class="text-white text-xs font-medium mb-1">Mulai belajar</p>
          <p class="text-white/50 text-[10px] leading-relaxed">Tunggu konfirmasi dan jadwal masuk kelas</p>
        </div>
      </div>
    </section>

    <!-- Kitab Pilihan Section -->
    <section class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-display text-xl text-brand-brown">Kitab Pilihan</h2>
        <NuxtLink to="/kitab" class="text-brand-orange text-sm font-medium hover:underline">Lihat semua &rarr;</NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <CardKitab v-for="kitab in mockKitab" :key="kitab.id" :kitab="kitab" />
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="bg-brand-orange rounded-2xl px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-12">
      <div>
        <h2 class="font-display text-xl text-white font-normal mb-1">Siap memulai perjalanan bahasa Arab Anda?</h2>
        <p class="text-sm text-white/80">Pendaftaran dibuka — daftar sekarang sebelum batas waktu.</p>
      </div>
      <AppButton variant="secondary" @click="navigateTo('/pendaftaran')" class="whitespace-nowrap flex-shrink-0">
        Daftar Sekarang &rarr;
      </AppButton>
    </section>
  </div>
</template>

<script setup lang="ts">
const mockPrograms = [
  {
    id: 'prog-1',
    nama: 'Nahwu Dasar Intensif',
    level: 'Pemula',
    jadwal: 'Senin & Rabu · 19.30 WIB',
    harga: 250000,
    status: 'aktif',
    gambarUrl: null
  },
  {
    id: 'prog-2',
    nama: 'Sharaf Menengah',
    level: 'Menengah',
    jadwal: 'Selasa & Kamis · 16.00 WIB',
    harga: 300000,
    status: 'aktif',
    gambarUrl: null
  },
  {
    id: 'prog-3',
    nama: 'Baca Kitab Lanjutan',
    level: 'Mahir',
    jadwal: 'Sabtu · 08.00 WIB',
    harga: 400000,
    status: 'tutup',
    gambarUrl: null
  }
];

const mockKitab = [
  {
    id: 'kitab-1',
    judul: 'Al-Ajurrumiyyah',
    penulis: 'Ibnu Ajurrum',
    harga: 450000, // wait this should be 45000
    bisaStandalone: true,
    gambarUrl: null
  },
  {
    id: 'kitab-2',
    judul: 'Al-Amtsilah At-Tashrifiyyah',
    penulis: 'KH. Ma\'shum Ali',
    harga: 35000,
    bisaStandalone: true,
    gambarUrl: null
  },
  {
    id: 'kitab-3',
    judul: 'Mutammimah Al-Ajurrumiyyah',
    penulis: 'Ar-Ru\'aini',
    harga: 65000,
    bisaStandalone: true,
    gambarUrl: null
  }
];

// Fix mock price
mockKitab[0].harga = 45000;
</script>
