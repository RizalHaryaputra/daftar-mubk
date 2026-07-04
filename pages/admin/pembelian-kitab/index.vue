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
      <div class="p-6 border-b border-brand-border/50 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div class="relative w-full sm:w-72">
          <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari nama atau invoice..." 
            class="w-full pl-11 pr-4 py-3 rounded-full border-2 border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange transition-colors text-brand-brown font-medium text-sm"
          />
        </div>
        
        <div class="flex gap-2 w-full sm:w-auto">
          <select v-model="filterStatus" class="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange text-brand-brown font-medium cursor-pointer text-sm appearance-none">
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
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50/50 border-b border-brand-border/50 text-brand-muted font-bold tracking-widest uppercase text-xs">
            <tr>
              <th class="p-6">Invoice & Waktu</th>
              <th class="p-6">Pembeli</th>
              <th class="p-6">Total Bayar</th>
              <th class="p-6">Pembayaran</th>
              <th class="p-6">Pengiriman</th>
              <th class="p-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-border/50">
            <tr v-if="paginatedData.length === 0 && !isLoading">
              <td colspan="6" class="p-16 text-center text-brand-muted">
                Tidak ada pesanan kitab yang cocok dengan kriteria pencarian Anda.
              </td>
            </tr>
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-brand-cream/20 transition-colors">
              <td class="p-6">
                <p class="font-bold text-brand-brown text-base uppercase">#{{ item.id }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ formatDate(item.createdAt) }}</p>
              </td>
              <td class="p-6">
                <p class="font-bold text-brand-brown">{{ item.dataPeserta?.namaLengkap || '-' }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ item.dataPeserta?.noWa || '-' }}</p>
              </td>
              <td class="p-6 font-bold text-brand-orange">
                Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}
              </td>
              <td class="p-6">
                <StatusBadge :status="item.statusPembayaran" />
              </td>
              <td class="p-6">
                <span v-if="item.statusPengiriman === 'dikirim'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200 bg-green-100 text-green-700 uppercase tracking-wider">Dikirim</span>
                <span v-else class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-100 text-amber-700 uppercase tracking-wider">Belum Dikirim</span>
              </td>
              <td class="p-6 text-right space-x-2">
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

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;

const pendaftaranList = ref<any[]>([]);
const isLoading = ref(true);

// States for Filter & Pagination
const searchQuery = ref('');
const filterStatus = ref('');
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

  return result;
});

// Reset page when filter changes
watch([searchQuery, filterStatus], () => {
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
