<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop (hidden on print) -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity print:hidden" @click="$emit('close')"></div>

    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4 print:p-0">
      <div class="relative w-full max-w-4xl bg-white rounded-[30px] shadow-2xl border border-brand-border/50 overflow-hidden z-10 print:shadow-none print:border-none print:rounded-none print:w-full print:max-w-none">
        
        <!-- Header (hidden on print) -->
        <div class="p-6 border-b border-brand-border/50 flex items-center justify-between bg-gray-50/80 print:hidden">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 class="font-display text-xl text-brand-brown">Label Pengiriman Paket</h3>
              <p class="text-xs text-brand-muted mt-0.5">Siap cetak untuk {{ printableOrders.length }} pesanan kitab</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button 
              @click="handlePrint" 
              class="px-5 py-2.5 bg-brand-orange text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak / Simpan PDF
            </button>
            <button 
              @click="$emit('close')" 
              class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Printable Area -->
        <div class="p-6 md:p-8 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0 space-y-6">
          <div v-if="printableOrders.length === 0" class="text-center py-12 text-brand-muted">
            <p>Tidak ada data pengiriman kitab yang valid untuk dicetak.</p>
          </div>

          <div 
            v-for="(order, idx) in printableOrders" 
            :key="order.id || idx" 
            class="shipping-label border-2 border-dashed border-gray-400 bg-white p-6 rounded-2xl print:rounded-none print:border-black print:p-6 print:break-inside-avoid print:page-break-after-always shadow-sm mb-6"
          >
            <!-- Label Header -->
            <div class="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-brown text-white flex items-center justify-center font-bold font-display text-lg">
                  M
                </div>
                <div>
                  <h4 class="font-bold text-base text-black tracking-tight uppercase">MA'HAD 'UMAR BIN KHATTAB</h4>
                  <p class="text-[11px] text-gray-600">Yogyakarta | Pengiriman Resmi Kitab & Buku Pembelajaran</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-500">KODE INVOICE</p>
                <p class="text-base font-bold text-black uppercase">#{{ order.kodeInvoice || order.id }}</p>
              </div>
            </div>

            <!-- Grid Pengirim & Penerima -->
            <div class="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6 mb-4">
              <!-- Pengirim -->
              <div class="p-4 bg-gray-50 print:bg-transparent rounded-xl border border-gray-200 print:border-black">
                <p class="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1">PENGIRIM:</p>
                <p class="font-bold text-sm text-black">Ma'had Umar bin Khattab (MUBK)</p>
                <p class="text-xs text-gray-700 mt-1">Pogung Kidul, Sinduadi, Mlati, Sleman, D.I. Yogyakarta 55284</p>
                <p class="text-xs font-semibold text-black mt-2">WA: 0812-2575-8157</p>
              </div>

              <!-- Penerima -->
              <div class="p-4 bg-amber-50/50 print:bg-transparent rounded-xl border-2 border-amber-300 print:border-black">
                <p class="text-[11px] font-bold uppercase tracking-widest text-brand-orange print:text-black mb-1">PENERIMA (TUJUAN):</p>
                <p class="font-bold text-base text-black">{{ order.dataPeserta?.namaLengkap || 'Nama Penerima' }}</p>
                <p class="text-sm font-bold text-black mt-0.5">{{ order.dataPeserta?.noWa || '-' }}</p>
                <div class="mt-2 text-xs text-gray-800 leading-relaxed font-medium">
                  <p class="font-bold text-[11px] uppercase text-gray-500">Alamat Lengkap:</p>
                  <p class="whitespace-pre-line">{{ order.dataPeserta?.alamatPengiriman || 'Alamat tidak dicantumkan' }}</p>
                </div>
              </div>
            </div>

            <!-- Info Paket & Ekspedisi -->
            <div class="border-t border-b border-gray-300 print:border-black py-3 mb-3 grid grid-cols-2 sm:grid-cols-3 print:grid-cols-3 gap-4 text-xs">
              <div>
                <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Zona Pengiriman</span>
                <span class="font-bold text-black uppercase">{{ formatZona(order.ongkir?.zona) }}</span>
              </div>
              <div>
                <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Status Pembayaran</span>
                <span class="font-bold text-green-700 print:text-black uppercase">{{ order.statusPembayaran === 'success' ? 'LUNAS (NON-COD)' : order.statusPembayaran }}</span>
              </div>
              <div v-if="order.noResi">
                <span class="text-gray-500 block uppercase tracking-wider text-[10px]">No. Resi Pengiriman</span>
                <span class="font-bold text-black font-mono">{{ order.noResi }}</span>
              </div>
            </div>

            <!-- Rincian Isi Paket -->
            <div class="mb-4">
              <p class="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">ISI PAKET:</p>
              <div class="bg-gray-50 print:bg-transparent rounded-lg p-2.5 border border-gray-200 print:border-black">
                <ul class="divide-y divide-gray-200 print:divide-black text-xs">
                  <li 
                    v-for="(k, kIdx) in (order.kitabDibeli || [])" 
                    :key="kIdx"
                    class="py-1 flex justify-between items-center font-medium"
                  >
                    <span class="text-black">{{ k.judul }}</span>
                    <span class="font-bold text-black ml-2">{{ k.qty || 1 }} Pcs</span>
                  </li>
                  <li v-if="!order.kitabDibeli || order.kitabDibeli.length === 0" class="py-1 text-gray-400 italic">
                    Paket Kitab / Modul Pembelajaran
                  </li>
                </ul>
              </div>
            </div>

            <!-- Footer Label / Catatan Kurir -->
            <div class="flex items-center justify-between text-[11px] text-gray-600 border-t border-gray-200 print:border-black pt-2">
              <div class="flex items-center gap-1.5 font-bold text-red-600 print:text-black">
                <span>⚠️ FRAGILE / DOKUMEN AGAMA</span>
                <span class="font-normal text-gray-500">| Harap Jangan Dilipat / Dibanting</span>
              </div>
              <div class="text-right text-[10px] text-gray-400">
                Dicetak: {{ currentDateFormatted }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  orders: any[];
}>();

defineEmits(['close']);

const printableOrders = computed(() => {
  if (!Array.isArray(props.orders)) return [];
  // Filter yang memiliki pengiriman fisik atau alamat
  return props.orders.filter(o => o.ongkir?.zona !== 'ambil_sendiri');
});

const formatZona = (zona?: string) => {
  if (!zona) return '-';
  if (zona === 'jogja') return 'D.I. Yogyakarta';
  if (zona === 'jawa') return 'Jawa (Luar DIY)';
  if (zona === 'luar_jawa') return 'Luar Pulau Jawa';
  if (zona === 'ambil_sendiri') return 'Ambil Sendiri di Kantor';
  return zona.replace('_', ' ');
};

const currentDateFormatted = computed(() => {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
});

const handlePrint = () => {
  window.print();
};
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .shipping-label, .shipping-label * {
    visibility: visible;
  }
  .shipping-label {
    position: relative;
    page-break-after: always;
    break-after: page;
  }
}
</style>
