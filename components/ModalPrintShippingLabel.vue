<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-4xl bg-white rounded-[30px] shadow-2xl border border-brand-border/50 overflow-hidden z-10">
        
        <!-- Header -->
        <div class="p-6 border-b border-brand-border/50 flex items-center justify-between bg-gray-50/80">
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
              class="px-5 py-2.5 bg-brand-orange text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak / Simpan PDF
            </button>
            <button 
              @click="$emit('close')" 
              class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Preview & Printable Content Container -->
        <div class="p-6 md:p-8 max-h-[75vh] overflow-y-auto space-y-6 bg-brand-cream/10">
          <div v-if="printableOrders.length === 0" class="text-center py-12 text-brand-muted">
            <p>Tidak ada data pengiriman kitab yang valid untuk dicetak.</p>
          </div>

          <!-- Printable Area Root -->
          <div id="printable-shipping-area" class="space-y-6">
            <div 
              v-for="(order, idx) in printableOrders" 
              :key="order.id || idx" 
              class="shipping-label border-2 border-dashed border-gray-400 bg-white p-6 rounded-2xl shadow-sm"
            >
              <!-- Header Label -->
              <div class="label-header flex items-center justify-between border-b-2 border-black pb-4 mb-4">
                <div class="logo-box flex items-center gap-3">
                  <div class="logo-badge w-10 h-10 rounded-full bg-[#3E2723] text-white flex items-center justify-center font-bold text-lg">
                    M
                  </div>
                  <div>
                    <h4 class="brand-title font-extrabold text-sm text-black tracking-tight uppercase">MA'HAD 'UMAR BIN KHATTAB</h4>
                    <p class="brand-sub text-[10px] text-gray-600">Yogyakarta | Pengiriman Resmi Kitab & Buku Pembelajaran</p>
                  </div>
                </div>
                <div class="invoice-box text-right">
                  <p class="invoice-lbl text-[9px] font-bold uppercase tracking-widest text-gray-500">KODE INVOICE</p>
                  <p class="invoice-val text-sm font-extrabold text-black uppercase">#{{ order.kodeInvoice || order.id }}</p>
                </div>
              </div>

              <!-- Grid Pengirim & Penerima -->
              <div class="grid-parties grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <!-- Pengirim -->
                <div class="party-card sender-card p-3.5 bg-gray-50 rounded-xl border border-gray-300">
                  <p class="card-title text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1">PENGIRIM:</p>
                  <p class="person-name font-bold text-xs text-black">Ma'had Umar bin Khattab (MUBK)</p>
                  <p class="person-address text-[11px] text-gray-700 mt-1">Pogung Kidul, Sinduadi, Mlati, Sleman, D.I. Yogyakarta 55284</p>
                  <p class="person-phone text-xs font-bold text-black mt-2">WA: 0812-2575-8157</p>
                </div>

                <!-- Penerima -->
                <div class="party-card receiver-card p-3.5 bg-amber-50/40 rounded-xl border-2 border-amber-400">
                  <p class="card-title text-[10px] font-extrabold uppercase tracking-widest text-amber-700 mb-1">PENERIMA (TUJUAN):</p>
                  <p class="person-name font-extrabold text-sm text-black">{{ order.dataPeserta?.namaLengkap || 'Nama Penerima' }}</p>
                  <p class="person-phone text-xs font-extrabold text-black mt-0.5">{{ order.dataPeserta?.noWa || '-' }}</p>
                  <div class="mt-2 text-[11px] text-gray-800 leading-relaxed font-medium">
                    <p class="font-bold text-[9px] uppercase tracking-wider text-gray-500">Alamat Lengkap:</p>
                    <p class="person-address whitespace-pre-line mt-0.5">{{ order.dataPeserta?.alamatPengiriman || 'Alamat tidak dicantumkan' }}</p>
                  </div>
                </div>
              </div>

              <!-- Info Paket & Ekspedisi -->
              <div class="meta-row border-t border-b border-gray-300 py-2.5 mb-3 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span class="meta-lbl text-gray-500 block uppercase tracking-wider text-[9px] font-bold">Zona Pengiriman</span>
                  <span class="meta-val font-bold text-black uppercase text-[11px]">{{ formatZona(order.ongkir?.zona) }}</span>
                </div>
                <div>
                  <span class="meta-lbl text-gray-500 block uppercase tracking-wider text-[9px] font-bold">Status Pembayaran</span>
                  <span class="meta-val font-bold text-emerald-800 uppercase text-[11px]">{{ order.statusPembayaran === 'success' ? 'LUNAS (NON-COD)' : order.statusPembayaran }}</span>
                </div>
                <div v-if="order.noResi">
                  <span class="meta-lbl text-gray-500 block uppercase tracking-wider text-[9px] font-bold">No. Resi Pengiriman</span>
                  <span class="meta-val font-bold text-black font-mono text-[11px]">{{ order.noResi }}</span>
                </div>
              </div>

              <!-- Rincian Isi Paket -->
              <div class="items-box mb-3">
                <p class="items-title text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1">ISI PAKET:</p>
                <div class="items-list bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <ul class="divide-y divide-gray-200 text-xs">
                    <li 
                      v-for="(k, kIdx) in (order.kitabDibeli || [])" 
                      :key="kIdx"
                      class="item-row py-1 flex justify-between items-center font-medium"
                    >
                      <span class="item-name text-black font-semibold">{{ k.judul }}</span>
                      <span class="item-qty font-extrabold text-black ml-2">{{ k.qty || 1 }} Pcs</span>
                    </li>
                    <li v-if="!order.kitabDibeli || order.kitabDibeli.length === 0" class="item-row py-1 text-gray-400 italic">
                      Paket Kitab / Modul Pembelajaran
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Footer Label / Catatan Kurir -->
              <div class="footer-bar flex items-center justify-between text-[10px] text-gray-600 border-t border-gray-300 pt-2">
                <div class="flex items-center gap-1.5 font-bold text-red-600">
                  <span class="fragile-text font-extrabold">⚠️ FRAGILE / DOKUMEN AGAMA</span>
                  <span class="font-normal text-gray-500">| Harap Jangan Dilipat / Dibanting</span>
                </div>
                <div class="text-right text-[9px] text-gray-400">
                  Dicetak: {{ currentDateFormatted }}
                </div>
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
  const printArea = document.getElementById('printable-shipping-area');
  if (!printArea) {
    window.print();
    return;
  }

  // Buat iframe terisolasi khusus dokumen print agar layout dashboard tidak bocor ke cetakan
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <title>Label Pengiriman - Ma'had Umar bin Khattab</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            background: #ffffff;
            color: #111111;
            padding: 0;
          }
          .shipping-label {
            border: 2px dashed #222222;
            border-radius: 12px;
            padding: 18px 22px;
            margin-bottom: 24px;
            page-break-inside: avoid;
            break-inside: avoid;
            background: #ffffff;
          }
          .shipping-label:last-child {
            margin-bottom: 0;
          }
          .label-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #111111;
            padding-bottom: 10px;
            margin-bottom: 14px;
          }
          .logo-box {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .logo-badge {
            width: 36px;
            height: 36px;
            background: #3E2723;
            color: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 15px;
          }
          .brand-title {
            font-weight: 800;
            font-size: 13px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #111111;
          }
          .brand-sub {
            font-size: 9.5px;
            color: #444444;
            margin-top: 1px;
          }
          .invoice-box {
            text-align: right;
          }
          .invoice-lbl {
            font-size: 8.5px;
            font-weight: 700;
            color: #555555;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .invoice-val {
            font-size: 13px;
            font-weight: 800;
            color: #111111;
            margin-top: 1px;
          }
          .grid-parties {
            display: grid;
            grid-template-columns: 1fr 1.35fr;
            gap: 14px;
            margin-bottom: 12px;
          }
          .party-card {
            border-radius: 8px;
            padding: 10px 12px;
          }
          .sender-card {
            border: 1px solid #cccccc;
            background: #f8f9fa;
          }
          .receiver-card {
            border: 2px solid #111111;
            background: #ffffff;
          }
          .card-title {
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 3px;
          }
          .sender-card .card-title { color: #555555; }
          .receiver-card .card-title { color: #d97706; }
          .person-name {
            font-size: 13px;
            font-weight: 800;
            color: #111111;
          }
          .person-phone {
            font-size: 11.5px;
            font-weight: 700;
            color: #111111;
            margin-top: 1px;
          }
          .person-address {
            font-size: 10.5px;
            color: #222222;
            margin-top: 4px;
            line-height: 1.4;
            white-space: pre-line;
          }
          .meta-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            padding: 6px 0;
            margin-bottom: 10px;
            font-size: 10.5px;
          }
          .meta-lbl {
            font-size: 8.5px;
            font-weight: 700;
            color: #555555;
            text-transform: uppercase;
            display: block;
          }
          .meta-val {
            font-weight: 800;
            color: #111111;
            text-transform: uppercase;
          }
          .items-box {
            margin-bottom: 10px;
          }
          .items-title {
            font-size: 9px;
            font-weight: 800;
            color: #555555;
            text-transform: uppercase;
            margin-bottom: 3px;
          }
          .items-list {
            border: 1px solid #cccccc;
            border-radius: 6px;
            padding: 6px 10px;
            list-style: none;
            background: #fafafa;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10.5px;
            padding: 2.5px 0;
            border-bottom: 1px dashed #e0e0e0;
          }
          .item-row:last-child {
            border-bottom: none;
          }
          .item-name { font-weight: 600; color: #111111; }
          .item-qty { font-weight: 800; color: #111111; }
          .footer-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #cccccc;
            padding-top: 6px;
            font-size: 9.5px;
            color: #555555;
          }
          .fragile-text {
            font-weight: 800;
            color: #dc2626;
          }
        </style>
      </head>
      <body>
        ${printArea.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  // Trigger print di iframe
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  }, 350);
};
</script>
