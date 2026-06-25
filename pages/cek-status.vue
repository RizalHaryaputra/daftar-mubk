<template>
  <div class="max-w-lg mx-auto space-y-6 mt-10">
    <div class="text-center mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Cek Status Pendaftaran</h1>
      <p class="text-sm text-brand-muted">Masukkan kode invoice Anda untuk melihat status pendaftaran.</p>
    </div>

    <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8">
      <form @submit.prevent="checkStatus" class="space-y-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown text-center">Kode Invoice</label>
          <input type="text" v-model="invoiceCode" required placeholder="MUBK-YYYYMMDD-XXXX" class="px-4 py-3 text-center tracking-widest text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors uppercase" />
        </div>
        <AppButton type="submit" variant="primary" class="w-full">
          Cari
        </AppButton>
      </form>

      <!-- Hasil pencarian (mock) -->
      <div v-if="hasSearched" class="mt-8 pt-6 border-t border-brand-border">
        <div class="text-center mb-4">
          <p class="text-xs text-brand-muted mb-1">Status Pendaftaran</p>
          <StatusBadge :status="mockStatus" />
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4 border border-brand-border space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-brand-muted">Nama</span>
            <span class="font-medium text-brand-brown">Fulan bin Fulan</span>
          </div>
          <div class="flex justify-between">
            <span class="text-brand-muted">Program</span>
            <span class="font-medium text-brand-brown">Nahwu Dasar Intensif</span>
          </div>
          <div class="flex justify-between pt-2 mt-2 border-t border-brand-border">
            <span class="text-brand-muted">Total</span>
            <span class="font-medium text-brand-orange">Rp 250.000</span>
          </div>
        </div>

        <div v-if="mockStatus === 'pending'" class="mt-6">
          <AppButton variant="secondary" class="w-full">
            Lanjutkan Pembayaran
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const invoiceCode = ref('');
const hasSearched = ref(false);
const mockStatus = ref('pending');

const checkStatus = () => {
  // Simulasi fetch API
  if (invoiceCode.value) {
    hasSearched.value = true;
    // mock random status
    const statuses = ['pending', 'success', 'expire'];
    mockStatus.value = statuses[Math.floor(Math.random() * statuses.length)];
  }
};
</script>
