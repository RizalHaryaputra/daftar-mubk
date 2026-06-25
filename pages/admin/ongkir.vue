<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Ongkir Zona</h1>
      <AppButton variant="primary">Simpan Perubahan</AppButton>
    </div>

    <div class="bg-white rounded-xl border border-brand-border p-6 max-w-lg">
      <form class="space-y-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">DI Yogyakarta (Rp)</label>
          <input type="number" value="15000" class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange" />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">Jawa Luar DIY (Rp)</label>
          <input type="number" value="25000" class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange" />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">Luar Jawa (Rp)</label>
          <input type="number" value="45000" class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});
</script>
