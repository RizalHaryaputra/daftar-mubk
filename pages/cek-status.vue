<template>
  <div class="max-w-lg mx-auto space-y-6 mt-10">
    <div class="text-center mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Cek Status Pendaftaran</h1>
      <p class="text-sm text-brand-muted">Masukkan kode invoice untuk melihat status pendaftaran Anda.</p>
    </div>

    <!-- Form Cari -->
    <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8">
      <form @submit.prevent="checkStatus" class="space-y-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown text-center">Kode Invoice</label>
          <input
            type="text"
            v-model="invoiceCode"
            required
            placeholder="MUBK-YYYYMMDD-XXXX"
            class="px-4 py-3 text-center tracking-widest text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors uppercase"
            @input="invoiceCode = (invoiceCode as string).toUpperCase()"
          />
        </div>
        <AppButton type="submit" variant="primary" class="w-full" :disabled="isLoading">
          {{ isLoading ? 'Mencari...' : 'Cari Pendaftaran' }}
        </AppButton>
      </form>

      <!-- Error -->
      <div v-if="error" class="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
        {{ error }}
      </div>
    </div>

    <!-- Hasil Pencarian -->
    <div v-if="result" class="bg-white border border-brand-border rounded-xl p-6 md:p-8 space-y-5">

      <!-- Status Utama -->
      <div class="text-center pb-4 border-b border-brand-border">
        <p class="text-xs text-brand-muted mb-2">Status Pembayaran</p>
        <StatusBadge :status="result.statusPembayaran" />
      </div>

      <!-- Rincian Pendaftaran -->
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-brand-muted">Kode Invoice</span>
          <span class="font-medium text-brand-brown">{{ result.kodeInvoice }}</span>
        </div>
        <div v-if="result.programNama" class="flex justify-between">
          <span class="text-brand-muted">Program</span>
          <span class="font-medium text-brand-brown">{{ result.programNama }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-brand-muted">Nama</span>
          <span class="font-medium text-brand-brown">{{ result.dataPeserta?.namaLengkap }}</span>
        </div>
        <div v-if="result.kitabDibeli?.length > 0" class="flex justify-between">
          <span class="text-brand-muted">Kitab Dipesan</span>
          <span class="font-medium text-brand-brown text-right max-w-[200px]">
            {{ result.kitabDibeli.map((k: any) => k.judul).join(', ') }}
          </span>
        </div>
        <div v-if="result.kitabDibeli?.length > 0" class="flex justify-between">
          <span class="text-brand-muted">Status Pengiriman</span>
          <span
            :class="result.statusPengiriman === 'dikirim' ? 'text-green-600' : 'text-amber-600'"
            class="font-medium capitalize"
          >
            {{ result.statusPengiriman === 'belum_dikirim' ? 'Belum Dikirim' : result.statusPengiriman === 'dikirim' ? 'Sudah Dikirim' : '-' }}
          </span>
        </div>
      </div>

      <!-- Total -->
      <div class="pt-4 border-t border-brand-border flex justify-between font-semibold">
        <span class="text-brand-brown">Total Pembayaran</span>
        <span class="text-brand-orange">Rp {{ result.rincianBiaya?.total?.toLocaleString('id-ID') }}</span>
      </div>

      <!-- CTA sesuai status -->
      <div v-if="result.statusPembayaran === 'pending'" class="pt-2 space-y-3">
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
          Pembayaran Anda belum selesai. Klik tombol di bawah untuk melanjutkan.
        </div>
        <AppButton variant="secondary" class="w-full" @click="resumePembayaran" :disabled="isResuming">
          {{ isResuming ? 'Memproses...' : 'Lanjutkan Pembayaran' }}
        </AppButton>
      </div>

      <div v-else-if="result.statusPembayaran === 'success'" class="pt-2">
        <div class="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700">
          ✅ Pembayaran berhasil dikonfirmasi. Email konfirmasi telah dikirim ke {{ result.dataPeserta?.email }}.
        </div>
      </div>

      <div v-else-if="result.statusPembayaran === 'expire' || result.statusPembayaran === 'failed'" class="pt-2">
        <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
          Pembayaran Anda telah kadaluarsa atau gagal. Silakan hubungi admin untuk informasi lebih lanjut.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const invoiceCode = ref('');
const result = ref<any>(null);
const isLoading = ref(false);
const isResuming = ref(false);
const error = ref('');

// Jika ada query param invoice, langsung cari
onMounted(() => {
  const qInvoice = route.query.invoice as string;
  if (qInvoice) {
    invoiceCode.value = qInvoice.toUpperCase();
    checkStatus();
  }
});

const checkStatus = async () => {
  if (!invoiceCode.value) return;
  isLoading.value = true;
  error.value = '';
  result.value = null;

  try {
    const response = await $fetch(`/api/pendaftaran/${invoiceCode.value.trim().toUpperCase()}`);
    result.value = (response as any).data;
  } catch (e: any) {
    const msg = e?.data?.statusMessage ?? e?.message ?? 'Terjadi kesalahan.';
    error.value = msg === 'Invoice tidak ditemukan'
      ? 'Kode invoice tidak ditemukan. Periksa kembali kode yang Anda masukkan.'
      : `Terjadi kesalahan: ${msg}`;
  } finally {
    isLoading.value = false;
  }
};

const resumePembayaran = async () => {
  if (!result.value?.kodeInvoice) return;
  isResuming.value = true;
  error.value = '';

  try {
    const response = await $fetch(`/api/pendaftaran/${result.value.kodeInvoice}/resume`, { method: 'POST' });
    const { snapToken } = response as any;

    if (snapToken && typeof window !== 'undefined' && (window as any).snap) {
      (window as any).snap.pay(snapToken, {
        onSuccess: () => checkStatus(),
        onPending: () => checkStatus(),
        onError: () => { error.value = 'Terjadi error saat pembayaran.'; },
        onClose: () => {}
      });
    } else {
      error.value = 'Tidak dapat membuka halaman pembayaran. Silakan coba lagi.';
    }
  } catch (e: any) {
    error.value = e?.data?.statusMessage ?? 'Terjadi kesalahan.';
  } finally {
    isResuming.value = false;
  }
};
</script>
