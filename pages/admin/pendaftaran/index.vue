<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Kelola Pendaftaran</h1>
        <p class="text-brand-muted mt-2">Daftar transaksi pendaftaran program dari para calon santri.</p>
      </div>
    </div>

    <!-- Table & Filters Container -->
    <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm overflow-hidden relative">
      
      <!-- Toolbar: Pencarian & Filter -->
      <div class="p-6 border-b border-brand-border/50 bg-gray-50/50 flex flex-col gap-4">
        
        <!-- Baris Atas: Pencarian, Ekspor, & Cetak Label -->
        <div class="flex flex-col lg:flex-row justify-between gap-4 items-stretch lg:items-center">
          <div class="relative w-full lg:w-80">
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari nama atau invoice..." 
              class="w-full pl-11 pr-4 py-2.5 rounded-full border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all text-brand-brown font-medium text-sm shadow-sm"
            />
          </div>
          
          <div class="flex flex-wrap items-center gap-2.5">
            <!-- Dropdown Ekspor -->
            <div class="relative inline-block text-left">
              <button 
                @click="isExportDropdownOpen = !isExportDropdownOpen" 
                type="button"
                class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold tracking-wider text-xs uppercase hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span>Ekspor Data</span>
                <svg class="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              <div 
                v-if="isExportDropdownOpen" 
                @click="isExportDropdownOpen = false"
                class="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-brand-border/50 py-2 z-20"
              >
                <button 
                  @click="exportToExcel" 
                  class="w-full text-left px-4 py-2.5 text-xs text-brand-brown font-semibold hover:bg-brand-cream/40 flex items-center gap-2.5 transition-colors"
                >
                  <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">XLS</span>
                  <div>
                    <p class="font-bold">Ekspor Excel (.xlsx)</p>
                    <p class="text-[10px] text-brand-muted">Format lengkap semua kolom</p>
                  </div>
                </button>
                <button 
                  @click="exportToCsv" 
                  class="w-full text-left px-4 py-2.5 text-xs text-brand-brown font-semibold hover:bg-brand-cream/40 flex items-center gap-2.5 transition-colors border-t border-brand-border/30"
                >
                  <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">CSV</span>
                  <div>
                    <p class="font-bold">Ekspor CSV (.csv)</p>
                    <p class="text-[10px] text-brand-muted">Format teks terpisah koma</p>
                  </div>
                </button>
              </div>
            </div>

            <!-- Tombol Cetak Label Pengiriman -->
            <button 
              @click="openPrintShippingLabels" 
              class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-orange text-white font-bold tracking-wider text-xs uppercase hover:bg-orange-600 transition-colors shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>{{ selectedIds.length > 0 ? `Cetak (${selectedIds.length}) Label` : 'Cetak Label Pengiriman' }}</span>
            </button>
          </div>
        </div>

        <!-- Baris Bawah: Filter Data -->
        <div class="flex flex-wrap items-center gap-3 bg-brand-cream/30 p-3 rounded-xl border border-brand-border/50 shadow-sm">
          <div class="flex items-center gap-2 text-brand-muted pl-2 pr-1 w-full md:w-auto pb-2 md:pb-0 border-b md:border-b-0 border-brand-border/50 md:border-transparent mb-1 md:mb-0">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            <span class="text-xs font-bold uppercase tracking-widest">Filter Data</span>
          </div>
          
          <select v-if="availablePrograms.length > 0" v-model="filterProgram" class="flex-1 min-w-[140px] px-4 py-2.5 rounded-lg border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-brand-brown font-medium cursor-pointer text-xs appearance-none">
            <option value="">Semua Program</option>
            <option v-for="p in availablePrograms" :key="p.id" :value="p.id">{{ p.nama }}</option>
          </select>
          
          <select v-if="availableBulan.length > 0" v-model="filterBulan" class="flex-1 min-w-[130px] px-4 py-2.5 rounded-lg border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-brand-brown font-medium cursor-pointer text-xs appearance-none">
            <option value="">Semua Bulan</option>
            <option v-for="b in availableBulan" :key="b" :value="b">{{ formatBulan(b) }}</option>
          </select>

          <select v-if="availablePeriodes.length > 0" v-model="filterPeriode" class="flex-1 min-w-[130px] px-4 py-2.5 rounded-lg border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-brand-brown font-medium cursor-pointer text-xs appearance-none">
            <option value="">Semua Periode</option>
            <option v-for="p in availablePeriodes" :key="p" :value="p">{{ p }}</option>
          </select>
          
          <select v-model="filterStatus" class="flex-1 min-w-[130px] px-4 py-2.5 rounded-lg border border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-brand-brown font-medium cursor-pointer text-xs appearance-none">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="success">Lunas</option>
            <option value="expire">Kedaluwarsa</option>
            <option value="failed">Gagal</option>
          </select>
        </div>

        <!-- Banner Seleksi Baris -->
        <div v-if="selectedIds.length > 0" class="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl text-xs text-brand-brown">
          <span class="font-bold">
            <span class="text-brand-orange font-extrabold">{{ selectedIds.length }}</span> data terpilih untuk dicetak atau dikelola
          </span>
          <button @click="selectedIds = []" class="text-brand-muted hover:text-red-500 font-bold uppercase tracking-wider text-[11px]">
            Batal Pilih
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50/50 border-b border-brand-border/50 text-brand-muted font-bold tracking-widest uppercase text-xs">
            <tr>
              <th class="p-4 w-10 text-center">
                <input 
                  type="checkbox" 
                  :checked="isAllSelected" 
                  @change="toggleSelectAll" 
                  class="rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer"
                />
              </th>
              <th class="p-4 whitespace-nowrap">Invoice & Waktu</th>
              <th class="p-4">Peserta</th>
              <th class="p-4">Program</th>
              <th class="p-4 whitespace-nowrap">Total Biaya</th>
              <th class="p-4 whitespace-nowrap">Pembayaran</th>
              <th class="p-4 whitespace-nowrap">Pengiriman</th>
              <th class="p-4 text-right whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="isLoading" class="divide-y divide-brand-border/50">
            <tr v-for="n in 5" :key="n" class="animate-pulse">
              <td class="p-4 text-center"><div class="h-4 w-4 bg-brand-cream/80 rounded mx-auto"></div></td>
              <td class="p-4"><div class="h-4 bg-brand-cream/80 rounded w-28 mb-1.5"></div><div class="h-3 bg-brand-cream/40 rounded w-20"></div></td>
              <td class="p-4"><div class="h-4 bg-brand-cream/80 rounded w-36 mb-1.5"></div><div class="h-3 bg-brand-cream/40 rounded w-28"></div></td>
              <td class="p-4"><div class="h-4 bg-brand-cream/80 rounded w-40 mb-1.5"></div><div class="h-3 bg-brand-cream/40 rounded w-24"></div></td>
              <td class="p-4"><div class="h-4 bg-brand-cream/80 rounded w-24"></div></td>
              <td class="p-4"><div class="h-6 bg-brand-cream/80 rounded-full w-20"></div></td>
              <td class="p-4"><div class="h-6 bg-brand-cream/80 rounded-full w-24"></div></td>
              <td class="p-4 text-right"><div class="h-8 bg-brand-cream/80 rounded-lg w-16 ml-auto"></div></td>
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-brand-border/50">
            <tr v-if="paginatedData.length === 0">
              <td colspan="8" class="p-16 text-center text-brand-muted">
                Tidak ada pendaftaran yang cocok dengan kriteria pencarian Anda.
              </td>
            </tr>
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-brand-cream/20 transition-colors" :class="{ 'bg-amber-50/40': selectedIds.includes(item.id) }">
              <td class="p-4 text-center">
                <input 
                  type="checkbox" 
                  :value="item.id" 
                  v-model="selectedIds" 
                  class="rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer"
                />
              </td>
              <td class="p-4 whitespace-nowrap">
                <p class="font-bold text-brand-brown text-sm uppercase">#{{ item.kodeInvoice || item.id }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ formatDate(item.createdAt) }}</p>
              </td>
              <td class="p-4 min-w-[150px]">
                <p class="font-bold text-brand-brown">{{ item.dataPeserta?.namaLengkap || '-' }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ item.dataPeserta?.noWa || '-' }}</p>
              </td>
              <td class="p-4 min-w-[150px]">
                <p class="font-bold text-brand-brown mb-1">{{ item.programNama || item.dataProgram?.nama || '-' }}</p>
                <span v-if="item.enrichedPeriode" class="bg-brand-deeper text-brand-cream text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest whitespace-nowrap">{{ item.enrichedPeriode }}</span>
              </td>
              <td class="p-4 font-bold text-brand-orange whitespace-nowrap">
                Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}
              </td>
              <td class="p-4 whitespace-nowrap">
                <StatusBadge :status="item.statusPembayaran" />
              </td>
              <td class="p-4 whitespace-nowrap">
                <span v-if="item.statusPengiriman === '-'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-200 bg-gray-100 text-gray-500 uppercase tracking-wider">Tidak Beli Kitab</span>
                <template v-else-if="item.ongkir?.zona === 'ambil_sendiri'">
                  <span v-if="item.statusPengiriman === 'dikirim'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-blue-200 bg-blue-100 text-blue-700 uppercase tracking-wider">Sudah Diambil</span>
                  <span v-else class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-100 text-amber-700 uppercase tracking-wider">Belum Diambil</span>
                </template>
                <template v-else>
                  <span v-if="item.statusPengiriman === 'dikirim'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200 bg-green-100 text-green-700 uppercase tracking-wider">Dikirim</span>
                  <span v-else class="text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-100 text-amber-700 uppercase tracking-wider">Belum Dikirim</span>
                </template>
              </td>
              <td class="p-4 text-right space-x-2 whitespace-nowrap">
                <NuxtLink :to="`/admin/pendaftaran/${item.id}`" title="Detail" class="inline-flex items-center justify-center w-8 h-8 bg-brand-cream text-brand-orange hover:bg-brand-orange hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </NuxtLink>
                <button @click="confirmDelete(item.id)" title="Hapus" class="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
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
    
    <!-- Delete Confirmation Modal -->
    <ModalConfirm 
      :is-open="isDeleteModalOpen"
      title="Hapus Data Pendaftaran?"
      message="Apakah Anda yakin ingin menghapus data pendaftaran ini? Data yang dihapus tidak dapat dikembalikan."
      confirm-text="Ya, Hapus"
      variant="danger"
      @confirm="executeDelete"
      @cancel="isDeleteModalOpen = false"
    />

    <!-- Shipping Label Print Modal -->
    <ModalPrintShippingLabel 
      :is-open="isPrintLabelModalOpen" 
      :orders="ordersToPrint" 
      @close="isPrintLabelModalOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from '~/composables/useToast';
import { collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';
import * as XLSX from 'xlsx';

const { showToast } = useToast();
definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;

const pendaftaranList = ref<any[]>([]);
const isLoading = ref(true);

// States for Filter & Pagination
const searchQuery = ref('');
const filterStatus = ref('');
const filterPeriode = ref('');
const filterProgram = ref('');
const filterBulan = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// States for Multi Selection & Printing
const selectedIds = ref<string[]>([]);
const isExportDropdownOpen = ref(false);
const isPrintLabelModalOpen = ref(false);
const ordersToPrint = ref<any[]>([]);

// Delete states
const isDeleteModalOpen = ref(false);
const itemToDelete = ref<string | null>(null);

const fetchPendaftaran = async () => {
  isLoading.value = true;
  try {
    const q = query(collection(db, 'pendaftaran'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    
    // Filter out kitab-only purchases
    const rawList = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter((d: any) => d.programId !== null);

    // Fetch programs for period enrichment
    const progSnap = await getDocs(collection(db, 'programs'));
    const programMap = new Map<string, any>();
    progSnap.docs.forEach(d => {
      programMap.set(d.id, d.data());
    });

    pendaftaranList.value = rawList.map((p: any) => {
      const prog = programMap.get(p.programId);
      return {
        ...p,
        enrichedPeriode: prog?.periode || ''
      };
    });
  } catch (error) {
    console.error('Error fetching pendaftaran:', error);
    showToast('Gagal memuat data pendaftaran.', 'error');
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPendaftaran);

const confirmDelete = (id: string) => {
  itemToDelete.value = id;
  isDeleteModalOpen.value = true;
};

const executeDelete = async () => {
  if (!itemToDelete.value) return;
  try {
    await deleteDoc(doc(db, 'pendaftaran', itemToDelete.value));
    pendaftaranList.value = pendaftaranList.value.filter(item => item.id !== itemToDelete.value);
    selectedIds.value = selectedIds.value.filter(id => id !== itemToDelete.value);
    showToast('Data pendaftaran berhasil dihapus.', 'success');
  } catch (error) {
    console.error('Error deleting pendaftaran:', error);
    showToast('Gagal menghapus data pendaftaran.', 'error');
  } finally {
    isDeleteModalOpen.value = false;
    itemToDelete.value = null;
  }
};

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
      p.kodeInvoice?.toLowerCase().includes(lowerQuery) ||
      p.dataPeserta?.namaLengkap?.toLowerCase().includes(lowerQuery) ||
      p.dataPeserta?.noWa?.includes(lowerQuery)
    );
  }

  if (filterStatus.value) {
    result = result.filter(p => p.statusPembayaran === filterStatus.value);
  }

  if (filterPeriode.value) {
    result = result.filter(p => p.enrichedPeriode === filterPeriode.value);
  }

  if (filterProgram.value) {
    result = result.filter(p => p.programId === filterProgram.value);
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

const isAllSelected = computed(() => {
  if (paginatedData.value.length === 0) return false;
  return paginatedData.value.every(item => selectedIds.value.includes(item.id));
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const pageIds = new Set(paginatedData.value.map(i => i.id));
    selectedIds.value = selectedIds.value.filter(id => !pageIds.has(id));
  } else {
    const newIds = new Set([...selectedIds.value, ...paginatedData.value.map(i => i.id)]);
    selectedIds.value = Array.from(newIds);
  }
};

const availablePeriodes = computed(() => {
  const periodes = new Set<string>();
  pendaftaranList.value.forEach(p => {
    if (p.enrichedPeriode) periodes.add(p.enrichedPeriode);
  });
  return Array.from(periodes).sort();
});

const availablePrograms = computed(() => {
  const progs = new Map<string, string>();
  pendaftaranList.value.forEach(p => {
    const nama = p.programNama || p.dataProgram?.nama;
    if (nama && p.programId) progs.set(p.programId, nama);
  });
  return Array.from(progs.entries()).map(([id, nama]) => ({ id, nama })).sort((a, b) => a.nama.localeCompare(b.nama));
});

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

// ===== FITUR EKSPOR DATA =====
const prepareExportData = () => {
  return filteredData.value.map((p, idx) => ({
    'No': idx + 1,
    'Kode Invoice': p.kodeInvoice || p.id,
    'Waktu Daftar': p.createdAt ? formatDate(p.createdAt) : '-',
    'Nama Lengkap': p.dataPeserta?.namaLengkap || '-',
    'No. WhatsApp': p.dataPeserta?.noWa || '-',
    'Email': p.dataPeserta?.email || '-',
    'Jenis Kelamin': p.dataPeserta?.jenisKelamin || '-',
    'Tempat Lahir': p.dataPeserta?.tempatLahir || '-',
    'Tanggal Lahir': p.dataPeserta?.tanggalLahir || '-',
    'Domisili': p.dataPeserta?.domisili || '-',
    'Pekerjaan': p.dataPeserta?.pekerjaan || '-',
    'Program': p.programNama || p.dataProgram?.nama || '-',
    'Periode': p.enrichedPeriode || '-',
    'Pilihan Jadwal': p.jadwalPilihan || '-',
    'Mode Belajar': p.modeBelajar || '-',
    'Paket Program': p.rincianBiaya?.namaPaket || 'Reguler',
    'Biaya Program (Rp)': p.rincianBiaya?.biayaProgram || 0,
    'Daftar Kitab': (p.kitabDibeli || []).map((k: any) => `${k.judul} (${k.qty || 1}x)`).join(', ') || '-',
    'Total Kitab (Rp)': p.rincianBiaya?.totalHargaKitab || 0,
    'Zona Ongkir': p.ongkir?.zona ? p.ongkir.zona.replace('_', ' ').toUpperCase() : '-',
    'Ongkos Kirim (Rp)': p.rincianBiaya?.ongkir || 0,
    'Donasi (Rp)': p.rincianBiaya?.donasi || 0,
    'Grand Total (Rp)': p.rincianBiaya?.total || 0,
    'Status Pembayaran': p.statusPembayaran?.toUpperCase() || '-',
    'Status Pengiriman': p.statusPengiriman ? p.statusPengiriman.replace('_', ' ').toUpperCase() : '-',
    'No. Resi': p.noResi || '-',
    'Alamat Pengiriman': p.dataPeserta?.alamatPengiriman || '-'
  }));
};

const exportToExcel = () => {
  if (filteredData.value.length === 0) {
    showToast('Tidak ada data yang bisa diekspor sesuai filter saat ini.', 'error');
    return;
  }
  const data = prepareExportData();
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftaran");
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Rekap_Pendaftaran_MUBK_${dateStr}.xlsx`);
  showToast('File Excel pendaftaran berhasil diunduh.', 'success');
};

const exportToCsv = () => {
  if (filteredData.value.length === 0) {
    showToast('Tidak ada data yang bisa diekspor sesuai filter saat ini.', 'error');
    return;
  }
  const data = prepareExportData();
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftaran");
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Rekap_Pendaftaran_MUBK_${dateStr}.csv`, { bookType: 'csv' });
  showToast('File CSV pendaftaran berhasil diunduh.', 'success');
};

// ===== FITUR CETAK LABEL PENGIRIMAN =====
const openPrintShippingLabels = () => {
  let targetOrders: any[] = [];

  if (selectedIds.value.length > 0) {
    targetOrders = pendaftaranList.value.filter(p => selectedIds.value.includes(p.id));
  } else {
    // Ambil data dari filter yang ada pengiriman fisiknya
    targetOrders = filteredData.value.filter(p => p.kitabDibeli?.length > 0 && p.ongkir?.zona !== 'ambil_sendiri');
  }

  if (targetOrders.length === 0) {
    showToast('Tidak ada data paket pengiriman kitab yang dipilih/ditemukan.', 'error');
    return;
  }

  ordersToPrint.value = targetOrders;
  isPrintLabelModalOpen.value = true;
};

// Reset page when filter changes
watch([searchQuery, filterStatus, filterPeriode, filterProgram, filterBulan], () => {
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
