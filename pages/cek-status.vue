<template>
  <div class="max-w-2xl mx-auto pb-20 pt-8 px-4 space-y-8">
    
    <div class="text-center mb-12">
      <h1 class="font-display text-4xl md:text-5xl text-brand-brown mb-4 font-bold tracking-tight">Cek Status <span class="text-brand-orange italic">Pendaftaran</span></h1>
      <p class="text-brand-muted md:text-lg leading-relaxed max-w-md mx-auto">Masukkan kode invoice Anda (contoh: MUBK-YYYYMMDD-XXXX) untuk melacak status pendaftaran dan pembayaran Anda.</p>
    </div>

    <!-- Form Cari -->
    <div class="bg-white border border-brand-border/50 shadow-xl rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
      <!-- Decorative element -->
      <div class="absolute -right-20 -top-20 w-48 h-48 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <form @submit.prevent="checkStatus" class="space-y-6 relative z-10">
        <div class="flex flex-col gap-3">
          <label class="text-xs font-bold uppercase tracking-widest text-brand-muted text-center">Kode Invoice</label>
          <input
            type="text"
            v-model="invoiceCode"
            required
            placeholder="MUBK-YYYYMMDD-XXXX"
            class="px-6 py-4 text-center tracking-widest text-base md:text-lg rounded-2xl border-2 border-brand-border/50 bg-brand-cream/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all uppercase font-medium text-brand-brown w-full shadow-inner"
            @input="invoiceCode = (invoiceCode as string).toUpperCase()"
          />
        </div>
        <AppButton type="submit" variant="primary" class="w-full !rounded-full !py-4 text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all" :disabled="isLoading">
          {{ isLoading ? 'Mencari...' : 'Lacak Status' }}
        </AppButton>
      </form>

      <!-- Error -->
      <div v-if="error" class="mt-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-3 relative z-10">
        <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {{ error }}
      </div>
    </div>

    <!-- Hasil Pencarian -->
    <div v-if="result" class="bg-white border border-brand-border/50 shadow-xl rounded-[40px] p-8 md:p-12 space-y-8 animate-fade-in relative overflow-hidden">
      <!-- Decorative element -->
      <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-brand-brown/5 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Header & Status Utama -->
      <div class="text-center pb-8 border-b border-brand-border/50 relative z-10">
        <div class="inline-block p-4 rounded-full bg-brand-cream/50 mb-4 border border-brand-border/30">
          <svg class="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 class="font-display text-2xl text-brand-brown mb-2">Detail Pendaftaran</h2>
        <p class="text-xs font-bold uppercase tracking-widest text-brand-muted mb-4">Status Pembayaran</p>
        <div class="flex justify-center">
          <StatusBadge :status="result.statusPembayaran" class="scale-110" />
        </div>
      </div>

      <!-- Rincian Pendaftaran -->
      <div class="space-y-4 text-sm relative z-10">
        <div class="flex justify-between items-center py-2 border-b border-brand-border/30 border-dashed">
          <span class="text-brand-muted">Kode Invoice</span>
          <span class="font-bold text-brand-brown bg-brand-cream px-3 py-1 rounded-md tracking-wider">{{ result.kodeInvoice }}</span>
        </div>
        
        <div class="flex justify-between items-center py-2 border-b border-brand-border/30 border-dashed">
          <span class="text-brand-muted">Nama Pendaftar</span>
          <span class="font-bold text-brand-brown">{{ result.dataPeserta?.namaLengkap }}</span>
        </div>

        <div v-if="result.programNama" class="flex justify-between items-center py-2 border-b border-brand-border/30 border-dashed">
          <span class="text-brand-muted">Program</span>
          <span class="font-medium text-brand-brown text-right max-w-[200px]">{{ result.programNama }}</span>
        </div>
        
        <div v-if="result.jadwalPilihan" class="flex justify-between items-center py-2 border-b border-brand-border/30 border-dashed">
          <span class="text-brand-muted">Jadwal</span>
          <span class="font-medium text-brand-orange text-right max-w-[200px] text-xs md:text-sm">{{ result.jadwalPilihan }}</span>
        </div>
        
        <div v-if="result.kitabDibeli?.length > 0" class="flex justify-between items-start py-2 border-b border-brand-border/30 border-dashed">
          <span class="text-brand-muted pt-1">Kitab Dipesan</span>
          <div class="flex flex-col items-end gap-1 text-right max-w-[200px]">
            <span v-for="(k, i) in result.kitabDibeli" :key="i" class="font-medium text-brand-brown bg-brand-cream/30 px-2 py-1 rounded text-xs">
              {{ k.judul }}
            </span>
          </div>
        </div>
        
        <div v-if="result.kitabDibeli?.length > 0" class="flex justify-between items-center py-2 border-b border-brand-border/30 border-dashed">
          <span class="text-brand-muted">Status Pengiriman</span>
          <span
            :class="result.statusPengiriman === 'dikirim' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'"
            class="font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border"
            :style="result.statusPengiriman === 'dikirim' ? 'border-color: #bbf7d0' : 'border-color: #fde68a'"
          >
            {{ result.statusPengiriman === 'belum_dikirim' ? 'Belum Dikirim' : result.statusPengiriman === 'dikirim' ? 'Sudah Dikirim' : '-' }}
          </span>
        </div>
      </div>

      <!-- Total -->
      <div class="pt-6 flex justify-between items-end relative z-10">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-brand-muted">Total Pembayaran</span>
        </div>
        <div class="text-3xl font-display text-brand-orange">
          Rp {{ result.rincianBiaya?.total?.toLocaleString('id-ID') }}
        </div>
      </div>

      <!-- CTA sesuai status -->
      <div v-if="result.statusPembayaran === 'pending'" class="pt-6 border-t border-brand-border/50 space-y-4 relative z-10">
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
          <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p class="text-sm text-amber-800 leading-relaxed">
            Pembayaran Anda belum selesai atau sedang menunggu konfirmasi sistem. Klik tombol di bawah untuk melanjutkan pembayaran via Midtrans.
          </p>
        </div>
        <AppButton variant="secondary" class="w-full !rounded-full !py-4 text-sm font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-all" @click="resumePembayaran" :disabled="isResuming">
          {{ isResuming ? 'Memproses...' : 'Lanjutkan Pembayaran' }}
        </AppButton>
      </div>

      <div v-else-if="result.statusPembayaran === 'success'" class="pt-6 border-t border-brand-border/50 relative z-10">
        <div class="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <p class="text-sm text-green-800 leading-relaxed">
            Pembayaran berhasil dikonfirmasi! Tanda terima dan instruksi selanjutnya telah dikirimkan ke email <span class="font-bold">{{ result.dataPeserta?.email }}</span>.
          </p>
        </div>
      </div>

      <div v-else-if="result.statusPembayaran === 'expire' || result.statusPembayaran === 'failed'" class="pt-6 border-t border-brand-border/50 relative z-10">
        <div class="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p class="text-sm text-red-800 leading-relaxed">
            Sesi pembayaran Anda telah kadaluarsa atau dibatalkan. Silakan lakukan pendaftaran ulang atau hubungi admin untuk bantuan.
          </p>
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
