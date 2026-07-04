<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Kelola Program</h1>
        <p class="text-brand-muted mt-2">Daftar program belajar yang ditawarkan oleh Ma'had Umar bin Khattab.</p>
      </div>
      <NuxtLink to="/admin/program/create" class="bg-brand-orange text-white font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 text-sm flex items-center justify-center gap-2 shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Program
      </NuxtLink>
    </div>

    <!-- Tabel & Kontrol -->
    <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm overflow-hidden">
      
      <!-- Toolbar: Pencarian & Filter -->
      <div class="p-6 border-b border-brand-border/50 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div class="relative w-full sm:w-72">
          <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input v-model="searchQuery" class="w-full pl-11 pr-4 py-3 border-2 border-brand-border/50 rounded-full text-sm focus:outline-none focus:border-brand-orange transition-colors font-medium text-brand-brown" placeholder="Cari nama program..." />
        </div>
        <select v-model="statusFilter" class="w-full sm:w-auto px-6 py-3 border-2 border-brand-border/50 rounded-full text-sm focus:outline-none focus:border-brand-orange transition-colors font-medium text-brand-brown bg-white appearance-none cursor-pointer">
          <option value="semua">Semua Status</option>
          <option value="aktif">Aktif Saja</option>
          <option value="nonaktif">Nonaktif Saja</option>
        </select>
      </div>

      <div v-if="isLoading" class="p-10 text-center text-brand-muted">
        <div class="animate-pulse flex flex-col items-center gap-3">
          <div class="w-10 h-10 rounded-full border-2 border-brand-orange border-t-transparent animate-spin"></div>
          <span class="font-medium">Memuat data program...</span>
        </div>
      </div>
      
      <div v-else-if="programs.length === 0" class="p-16 text-center">
        <div class="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h3 class="font-display text-2xl text-brand-brown mb-2">Belum ada Program</h3>
        <p class="text-brand-muted">Silakan klik tombol "Tambah Program" di atas untuk membuat program pertama Anda.</p>
      </div>

      <div v-else-if="paginatedPrograms.length === 0" class="p-16 text-center text-brand-muted">
        <p>Tidak ada program yang cocok dengan kriteria pencarian Anda.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50/50 border-b border-brand-border/50 text-brand-muted font-bold tracking-widest uppercase text-xs">
            <tr>
              <th class="p-6">Nama Program</th>
              <th class="p-6">Jadwal</th>
              <th class="p-6">Harga</th>
              <th class="p-6">Status</th>
              <th class="p-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-border/50">
            <tr v-for="item in paginatedPrograms" :key="item.id" class="hover:bg-brand-cream/20 transition-colors">
              <td class="p-6">
                <p class="font-bold text-brand-brown text-base">{{ item.nama }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ item.durasi }}</p>
              </td>
              <td class="p-6 text-brand-muted">
                <template v-if="Array.isArray(item.jadwal)">
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span v-for="(j, idx) in item.jadwal" :key="idx" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-cream/40 border border-brand-border/50 text-xs text-brand-brown font-medium">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                      {{ j }}
                    </span>
                  </div>
                </template>
                <template v-else>{{ item.jadwal }}</template>
              </td>
              <td class="p-6 text-brand-brown font-medium">Rp {{ item.harga?.toLocaleString('id-ID') }}</td>
              <td class="p-6">
                <span :class="item.status === 'aktif' ? 'text-green-700 bg-green-100 border-green-200' : 'text-gray-500 bg-gray-100 border-gray-200'" class="text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider">
                  {{ item.status }}
                </span>
              </td>
              <td class="p-6 text-right space-x-2">
                <NuxtLink :to="`/admin/program/${item.id}`" title="Edit" class="inline-flex items-center justify-center w-8 h-8 bg-brand-cream text-brand-orange hover:bg-brand-orange hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </NuxtLink>
                <button @click="deleteProgram(item.id)" title="Hapus" class="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-full">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Controls -->
      <div v-if="totalPages > 1 && !isLoading && programs.length > 0" class="p-6 border-t border-brand-border/50 bg-white flex justify-between items-center">
        <p class="text-sm text-brand-muted font-medium">Halaman <span class="text-brand-brown font-bold">{{ currentPage }}</span> dari <span class="text-brand-brown font-bold">{{ totalPages }}</span></p>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 rounded-full border-2 border-brand-border text-brand-brown font-bold text-xs tracking-wider uppercase hover:bg-brand-cream hover:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Sebelumnnya
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 rounded-full border-2 border-brand-border text-brand-brown font-bold text-xs tracking-wider uppercase hover:bg-brand-cream hover:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <ModalConfirm
      :is-open="isConfirmOpen"
      title="Hapus Program?"
      message="Apakah Anda yakin ingin menghapus program ini? Semua data terkait program ini akan hilang dan tindakan ini tidak dapat dibatalkan."
      confirm-text="Ya, Hapus"
      variant="danger"
      @confirm="executeDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const programs = ref<any[]>([]);
const isLoading = ref(true);

// States for Filter & Pagination
const searchQuery = ref('');
const statusFilter = ref('semua');
const currentPage = ref(1);
const itemsPerPage = 10;

// States for Delete Confirmation
const isConfirmOpen = ref(false);
const itemToDelete = ref<string | null>(null);

const fetchPrograms = async () => {
  isLoading.value = true;
  try {
    const q = query(collection(db, 'programs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    programs.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching programs", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPrograms);

const deleteProgram = (id: string) => {
  itemToDelete.value = id;
  isConfirmOpen.value = true;
};

const cancelDelete = () => {
  isConfirmOpen.value = false;
  itemToDelete.value = null;
};

const executeDelete = async () => {
  if (!itemToDelete.value) return;
  
  try {
    await deleteDoc(doc(db, 'programs', itemToDelete.value));
    fetchPrograms(); // Refresh the list
  } catch (error) {
    console.error("Error deleting program", error);
    alert('Gagal menghapus program.');
  } finally {
    isConfirmOpen.value = false;
    itemToDelete.value = null;
  }
};

// Computed properties for processing data
const filteredPrograms = computed(() => {
  let result = programs.value;
  
  // Reset pagination if filter changes
  currentPage.value = 1;

  if (searchQuery.value) {
    const lowerQuery = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.nama?.toLowerCase().includes(lowerQuery) || 
      p.deskripsi?.toLowerCase().includes(lowerQuery)
    );
  }

  if (statusFilter.value !== 'semua') {
    result = result.filter(p => p.status === statusFilter.value);
  }

  return result;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredPrograms.value.length / itemsPerPage));
});

const paginatedPrograms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPrograms.value.slice(start, end);
});
</script>
