<template>
  <div class="max-w-2xl mx-auto pb-20 pt-8 px-4 space-y-8">
    
    <div class="text-center mb-12">
      <h1 class="font-display text-4xl md:text-5xl text-brand-brown mb-4 font-bold tracking-tight">Cek Status <span class="text-brand-orange italic">Transaksi</span></h1>
      <p class="text-brand-muted md:text-lg leading-relaxed max-w-md mx-auto">Masukkan kode invoice Anda (contoh: MUBK-YYYYMMDD-XXXX) untuk melacak status pendaftaran program atau pembelian kitab Anda.</p>
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
        <h2 class="font-display text-2xl text-brand-brown mb-2">Detail {{ result.programId === null ? 'Pembelian Kitab' : 'Pendaftaran' }}</h2>
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
          <span class="text-brand-muted">Nama {{ result.programId === null ? 'Pembeli' : 'Pendaftar' }}</span>
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

      <div v-else-if="result.statusPembayaran === 'success'" class="pt-6 border-t border-brand-border/50 relative z-10 space-y-4">
        <div class="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <p class="text-sm text-green-800 leading-relaxed">
            Pembayaran berhasil dikonfirmasi! Tanda terima dan instruksi selanjutnya telah dikirimkan ke email <span class="font-bold">{{ result.dataPeserta?.email }}</span>.
          </p>
        </div>

        <div v-if="result.linkGrupWa" class="flex justify-center pt-2">
          <a :href="result.linkGrupWa" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-1">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Gabung Grup WhatsApp
          </a>
        </div>

        <!-- Tracking Info -->
        <div v-if="result.statusPengiriman === 'dikirim' && result.nomorResi" class="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            </div>
            <div>
              <p class="text-xs font-bold text-blue-800 uppercase tracking-widest">Paket Sedang Dikirim</p>
              <p class="text-sm text-blue-900 font-medium">{{ result.kurirPengiriman }} - {{ result.nomorResi }}</p>
            </div>
          </div>
          <a :href="'https://cekresi.com/?noresi=' + result.nomorResi" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold transition-colors">
            Lacak Paket Sekarang
          </a>
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
