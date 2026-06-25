<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Kitab Pilihan</h1>
      <p class="text-sm text-brand-muted">Koleksi kitab rujukan yang digunakan di Ma'had 'Umar bin Khattab.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <CardKitab v-for="kitab in mockKitab" :key="kitab.id" :kitab="kitab" />
    </div>
  </div>
</template>

<script setup lang="ts">
const mockKitab = [
  {
    id: 'kitab-1',
    judul: 'Al-Ajurrumiyyah',
    penulis: 'Ibnu Ajurrum',
    harga: 45000,
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
  },
  {
    id: 'kitab-4',
    judul: 'Mukhtashar Jiddan',
    penulis: 'Sayyid Ahmad Zaini Dahlan',
    harga: 50000,
    bisaStandalone: true,
    gambarUrl: null
  }
];
</script>
