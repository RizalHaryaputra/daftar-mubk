<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Program Kami</h1>
      <p class="text-sm text-brand-muted">Pilih program bahasa Arab yang sesuai dengan level Anda.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardProgram v-for="program in mockPrograms" :key="program.id" :program="program" />
    </div>
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
  },
  {
    id: 'prog-4',
    nama: 'Hiwar Dasar',
    level: 'Pemula',
    jadwal: 'Minggu · 16.00 WIB',
    harga: 200000,
    status: 'aktif',
    gambarUrl: null
  }
];
</script>
