<template>
  <div class="space-y-6">
    <h1 class="font-display text-2xl text-brand-brown">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Stats Cards -->
      <div class="bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <p class="text-xs text-brand-muted uppercase tracking-widest font-medium mb-1">Pendaftar Baru</p>
        <p class="text-3xl font-display text-brand-orange">14</p>
      </div>
      
      <div class="bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <p class="text-xs text-brand-muted uppercase tracking-widest font-medium mb-1">Menunggu Pembayaran</p>
        <p class="text-3xl font-display text-amber-600">5</p>
      </div>
      
      <div class="bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <p class="text-xs text-brand-muted uppercase tracking-widest font-medium mb-1">Kitab Perlu Dikirim</p>
        <p class="text-3xl font-display text-blue-600">8</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <div class="p-4 border-b border-brand-border bg-gray-50 flex justify-between items-center">
        <h2 class="font-medium text-brand-brown">Pendaftaran Terbaru</h2>
        <NuxtLink to="/admin/pendaftaran" class="text-xs text-brand-orange hover:underline font-medium">Lihat Semua</NuxtLink>
      </div>
      <div class="p-4">
        <p class="text-sm text-brand-muted text-center py-4">Sistem sedang dalam mode simulasi, data pendaftaran belum dihubungkan dengan Firestore.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});
</script>
