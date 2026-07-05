<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Kelola Kitab</h1>
        <p class="text-brand-muted mt-2">Daftar buku dan kitab rujukan yang ditawarkan oleh Ma'had Umar bin Khattab.</p>
      </div>
      <NuxtLink to="/admin/kitab/create" class="bg-brand-orange text-white font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 text-sm flex items-center justify-center gap-2 shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Kitab
      </NuxtLink>
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
            placeholder="Cari judul atau penulis kitab..." 
            class="w-full pl-11 pr-4 py-3 rounded-full border-2 border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange transition-colors text-brand-brown font-medium text-sm"
          />
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select v-model="filterStatus" class="w-full sm:w-auto px-6 py-3 border-2 border-brand-border/50 rounded-full text-sm focus:outline-none focus:border-brand-orange transition-colors font-medium text-brand-brown bg-white appearance-none cursor-pointer">
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
          <select v-model="filterStandalone" class="w-full sm:w-auto px-6 py-3 border-2 border-brand-border/50 rounded-full text-sm focus:outline-none focus:border-brand-orange transition-colors font-medium text-brand-brown bg-white appearance-none cursor-pointer">
            <option value="">Semua Tipe</option>
            <option value="true">Standalone</option>
            <option value="false">Tidak Standalone</option>
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
              <th class="p-6">Judul Kitab</th>
              <th class="p-6">Penulis</th>
              <th class="p-6">Harga</th>
              <th class="p-6">Status</th>
              <th class="p-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-border/50">
            <tr v-if="paginatedData.length === 0 && !isLoading">
              <td colspan="5" class="p-16 text-center text-brand-muted">
                Tidak ada kitab yang cocok dengan kriteria pencarian Anda.
              </td>
            </tr>
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-brand-cream/20 transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-16 rounded-lg overflow-hidden bg-brand-cream/30 border border-brand-border/30 flex-shrink-0 flex items-center justify-center">
                    <img v-if="item.gambarUrl" :src="item.gambarUrl" alt="Cover" class="w-full h-full object-cover" />
                    <svg v-else class="w-6 h-6 text-brand-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <div>
                    <p class="font-bold text-brand-brown text-base">{{ item.judul }}</p>
                    <p class="text-xs text-brand-muted mt-1 uppercase tracking-wider">{{ item.kategori || 'Tanpa Kategori' }}</p>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <span class="text-brand-muted">{{ item.penulis }}</span>
              </td>
              <td class="p-6 font-medium text-brand-brown">
                Rp {{ item.harga?.toLocaleString('id-ID') }}
              </td>
              <td class="p-6">
                <div class="flex flex-col gap-2 items-start">
                  <span :class="item.status === 'aktif' ? 'text-green-700 bg-green-100 border-green-200' : 'text-gray-500 bg-gray-100 border-gray-200'" class="text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider">
                    {{ item.status }}
                  </span>
                  <span v-if="item.bisaStandalone" class="text-[10px] font-bold uppercase tracking-wider bg-brand-orange text-white px-3 py-1.5 rounded-full">
                    Standalone
                  </span>
                </div>
              </td>
              <td class="p-6 text-right space-x-2">
                <NuxtLink :to="`/admin/kitab/${item.id}`" title="Edit" class="inline-flex items-center justify-center w-8 h-8 bg-brand-cream text-brand-orange hover:bg-brand-orange hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </NuxtLink>
                <button @click="confirmDelete(item)" title="Hapus" class="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1 && !isLoading && kitabs.length > 0" class="p-6 border-t border-brand-border/50 bg-white flex justify-between items-center">
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
      title="Hapus Kitab?"
      :message="`Apakah Anda yakin ingin menghapus kitab '${itemToDelete?.judul}'? Data ini tidak dapat dikembalikan.`"
      confirm-text="Ya, Hapus"
      variant="danger"
      @confirm="executeDelete"
      @cancel="isDeleteModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';
import { useToast } from '~/composables/useToast';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const { showToast } = useToast();

const kitabs = ref<any[]>([]);
const isLoading = ref(true);

const searchQuery = ref('');
const filterStatus = ref('');
const filterStandalone = ref('');

const currentPage = ref(1);
const itemsPerPage = 7;

const isDeleteModalOpen = ref(false);
const itemToDelete = ref<any>(null);

const fetchKitabs = async () => {
  isLoading.value = true;
  try {
    const q = query(collection(db, 'kitabs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    kitabs.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching kitabs:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchKitabs);

// Filtering & Search Logic
const filteredData = computed(() => {
  return kitabs.value.filter(item => {
    const matchSearch = item.judul?.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                        item.penulis?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = filterStatus.value ? item.status === filterStatus.value : true;
    
    // Standalone filter logic
    let matchStandalone = true;
    if (filterStandalone.value === 'true') matchStandalone = item.bisaStandalone === true;
    if (filterStandalone.value === 'false') matchStandalone = item.bisaStandalone === false;

    return matchSearch && matchStatus && matchStandalone;
  });
});

// Reset page when filter changes
watch([searchQuery, filterStatus, filterStandalone], () => {
  currentPage.value = 1;
});

// Pagination Logic
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
});

// Delete Logic
const confirmDelete = (item: any) => {
  itemToDelete.value = item;
  isDeleteModalOpen.value = true;
};

const executeDelete = async () => {
  if (!itemToDelete.value) return;
  
  try {
    await deleteDoc(doc(db, 'kitabs', itemToDelete.value.id));
    fetchKitabs();
    showToast('Kitab berhasil dihapus!', 'success');
  } catch (error) {
    console.error('Error deleting kitab:', error);
    showToast('Gagal menghapus kitab.', 'error');
  } finally {
    isDeleteModalOpen.value = false;
    itemToDelete.value = null;
  }
};
</script>
