<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Kitab</h1>
      <AppButton variant="primary">Tambah Kitab</AppButton>
    </div>

    <div class="bg-white rounded-xl border border-brand-border p-8 text-center text-brand-muted">
      <p>Modul Kitab (CRUD) akan diimplementasikan setelah skema Firestore aktif.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});
</script>
