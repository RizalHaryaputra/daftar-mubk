<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Kelola Pembelian Kitab</h1>
        <p class="text-brand-muted mt-2">Daftar transaksi pembelian kitab tanpa pendaftaran program.</p>
      </div>
      <!-- Pendaftaran tidak punya tombol Tambah karena dibuat oleh user di frontend -->
    </div>

    <!-- Table & Filters Container -->
    <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm overflow-hidden relative">
      
      <!-- Toolbar: Pencarian & Filter -->
      <div class="p-6 border-b border-brand-border/50 bg-gray-50/50 flex flex-col gap-4">
        
        <!-- Baris Atas: Pencarian & Ekspor -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div class="relative w-full sm:w-80">
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari nama atau invoice..." 
              class="w-full pl-11 pr-4 py-2.5 rounded-full border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all text-brand-brown font-medium text-sm shadow-sm"
            />
          </div>
          
          <button @click="exportToExcel" class="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 text-white font-bold tracking-widest text-xs uppercase hover:bg-emerald-600 transition-colors shadow-sm">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Ekspor Excel
          </button>
        </div>

        <!-- Baris Bawah: Filter Data -->
        <div class="flex flex-wrap items-center gap-3 bg-brand-cream/30 p-3 rounded-xl border border-brand-border/50 shadow-sm">
          <div class="flex items-center gap-2 text-brand-muted pl-2 pr-1 w-full md:w-auto pb-2 md:pb-0 border-b md:border-b-0 border-brand-border/50 md:border-transparent mb-1 md:mb-0">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            <span class="text-xs font-bold uppercase tracking-widest">Filter Data</span>
          </div>
          
          <select v-if="availableBulan.length > 0" v-model="filterBulan" class="flex-1 min-w-[130px] px-4 py-2.5 rounded-lg border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-brand-brown font-medium cursor-pointer text-xs appearance-none">
            <option value="">Semua Bulan</option>
            <option v-for="b in availableBulan" :key="b" :value="b">{{ formatBulan(b) }}</option>
          </select>
          
          <select v-model="filterStatus" class="flex-1 min-w-[130px] px-4 py-2.5 rounded-lg border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-brand-brown font-medium cursor-pointer text-xs appearance-none">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="success">Lunas</option>
            <option value="expire">Kedaluwarsa</option>
            <option value="failed">Gagal</option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
        <div class="w-10 h-10 rounded-full border-4 border-brand-cream border-t-brand-orange animate-spin mb-4"></div>
        <span class="text-sm font-bold text-brand-brown tracking-widest uppercase animate-pulse">Memuat Data...</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50/50 border-b border-brand-border/50 text-brand-muted font-bold tracking-widest uppercase text-xs">
            <tr>
              <th class="p-4 whitespace-nowrap">Invoice & Waktu</th>
              <th class="p-4">Pembeli</th>
              <th class="p-4">Kitab</th>
              <th class="p-4 whitespace-nowrap">Total Bayar</th>
              <th class="p-4 whitespace-nowrap">Pembayaran</th>
              <th class="p-4 whitespace-nowrap">Pengiriman</th>
              <th class="p-4 text-right whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-border/50">
            <tr v-if="paginatedData.length === 0 && !isLoading">
              <td colspan="6" class="p-16 text-center text-brand-muted">
                Tidak ada pesanan kitab yang cocok dengan kriteria pencarian Anda.
              </td>
            </tr>
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-brand-cream/20 transition-colors">
              <td class="p-4 whitespace-nowrap">
                <p class="font-bold text-brand-brown text-sm uppercase">#{{ item.id }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ formatDate(item.createdAt) }}</p>
              </td>
              <td class="p-4 min-w-[150px]">
                <p class="font-bold text-brand-brown">{{ item.dataPeserta?.namaLengkap || '-' }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ item.dataPeserta?.noWa || '-' }}</p>
              </td>
              <td class="p-4 min-w-[200px]">
                <ul v-if="item.kitabDibeli && item.kitabDibeli.length > 0" class="flex flex-col gap-1.5">
                  <li v-for="(kitab, kIdx) in item.kitabDibeli" :key="kIdx" class="text-xs font-medium text-brand-brown leading-snug">
                    <span class="text-brand-orange font-bold mr-1">&bull;</span> 
                    {{ kitab.judul }} 
                    <span v-if="kitab.qty > 1" class="font-bold text-brand-muted whitespace-nowrap ml-1">({{ kitab.qty }}x)</span>
                  </li>
                </ul>
                <span v-else class="text-xs text-brand-muted italic">-</span>
              </td>
              <td class="p-4 font-bold text-brand-orange whitespace-nowrap">
                Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}
              </td>
              <td class="p-4 whitespace-nowrap">
                <StatusBadge :status="item.statusPembayaran" />
              </td>
              <td class="p-4 whitespace-nowrap">
                <template v-if="item.ongkir?.zona === 'ambil_sendiri'">
                  <span v-if="item.statusPengiriman === 'dikirim'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-blue-200 bg-blue-100 text-blue-700 uppercase tracking-wider">Sudah Diambil</span>
                  <span v-else class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-100 text-amber-700 uppercase tracking-wider">Belum Diambil</span>
                </template>
                <template v-else>
                  <span v-if="item.statusPengiriman === 'dikirim'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200 bg-green-100 text-green-700 uppercase tracking-wider">Dikirim</span>
                  <span v-else class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-100 text-amber-700 uppercase tracking-wider">Belum Dikirim</span>
                </template>
              </td>
              <td class="p-4 text-right space-x-2 whitespace-nowrap">
                <NuxtLink :to="`/admin/pembelian-kitab/${item.id}`" title="Detail" class="inline-flex items-center justify-center w-8 h-8 bg-brand-cream text-brand-orange hover:bg-brand-orange hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Controls -->
      <div v-if="totalPages > 1 && !isLoading && pendaftaranList.length > 0" class="p-6 border-t border-brand-border/50 bg-white flex justify-between items-center">
        <p class="text-sm text-brand-muted font-medium">Halaman <span class="text-brand-brown font-bold">{{ currentPage }}</span> dari <span class="text-brand-brown font-bold">{{ totalPages }}</span></p>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 rounded-full border-2 border-brand-border text-brand-brown font-bold text-xs tracking-wider uppercase hover:bg-brand-cream hover:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Sebelumnya
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 rounded-full border-2 border-brand-border text-brand-brown font-bold text-xs tracking-wider uppercase hover:bg-brand-cream hover:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';
import * as XLSX from 'xlsx';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;

const pendaftaranList = ref<any[]>([]);
const isLoading = ref(true);

// States for Filter & Pagination
const searchQuery = ref('');
const filterStatus = ref('');
const filterBulan = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchPendaftaran = async () => {
  isLoading.value = true;
  try {
    const q = query(collection(db, 'pendaftaran'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    pendaftaranList.value = snap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((doc: any) => doc.programId === null);
  } catch (error) {
    console.error("Error fetching pendaftaran", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPendaftaran);

const formatDate = (timestamp: any) => {
  if (!timestamp) return '-';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

const availableBulan = computed(() => {
  const bulans = new Set<string>();
  pendaftaranList.value.forEach(p => {
    if (p.createdAt) {
      const date = p.createdAt.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      bulans.add(`${year}-${month}`);
    }
  });
  return Array.from(bulans).sort().reverse();
});

const formatBulan = (val: string) => {
  if (!val) return '';
  const [year, month] = val.split('-');
  if (!year || !month) return val;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date);
};

// Computed properties for processing data
const filteredData = computed(() => {
  let result = pendaftaranList.value;
  
  if (searchQuery.value) {
    const lowerQuery = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.id?.toLowerCase().includes(lowerQuery) || 
      p.dataPeserta?.namaLengkap?.toLowerCase().includes(lowerQuery)
    );
  }

  if (filterStatus.value) {
    result = result.filter(p => p.statusPembayaran === filterStatus.value);
  }

  if (filterBulan.value) {
    result = result.filter(p => {
      if (!p.createdAt) return false;
      const date = p.createdAt.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}` === filterBulan.value;
    });
  }

  return result;
});

const exportToExcel = () => {
  if (filteredData.value.length === 0) {
    alert('Tidak ada data yang bisa diekspor sesuai filter saat ini.');
    return;
  }

  const dataToExport = filteredData.value.map(p => {
    // Format daftar kitab
    let daftarKitabText = '-';
    if (p.kitabDibeli && Array.isArray(p.kitabDibeli) && p.kitabDibeli.length > 0) {
      daftarKitabText = p.kitabDibeli.map((k: any) => `${k.judul} (${k.qty || 1}x)`).join(', ');
    }

    return {
      'Invoice': p.kodeInvoice || p.id,
      'Waktu Transaksi': p.createdAt ? formatDate(p.createdAt) : '-',
      'Nama Pembeli': p.dataPeserta?.namaLengkap || '-',
      'No. WhatsApp': p.dataPeserta?.noWa || '-',
      'Email': p.dataPeserta?.email || '-',
      'Alamat Pengiriman': p.dataPeserta?.alamatPengiriman || '-',
      'Daftar Kitab': daftarKitabText,
      'Total Kitab': p.rincianBiaya?.totalHargaKitab || 0,
      'Ongkos Kirim': p.rincianBiaya?.ongkir || 0,
      'Total Bayar': p.rincianBiaya?.total || 0,
      'Status Pembayaran': p.statusPembayaran?.toUpperCase() || '-',
      'Status Pengiriman': p.statusPengiriman?.replace('_', ' ').toUpperCase() || '-'
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pembelian Kitab");
  
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Data_Pembelian_Kitab_MUBK_${dateStr}.xlsx`);
};

// Reset page when filter changes
watch([searchQuery, filterStatus, filterBulan], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredData.value.length / itemsPerPage));
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
});
</script>
