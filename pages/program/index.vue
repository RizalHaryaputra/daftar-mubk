<template>
  <div class="space-y-12 pb-20 pt-8">
    <!-- Header Area -->
    <div class="text-center max-w-2xl mx-auto px-4">
      <h1 class="font-display text-4xl md:text-5xl text-brand-brown mb-4 font-bold tracking-tight">
        Program <span class="text-brand-orange italic">Pilihan</span>
      </h1>
      <p class="text-brand-muted md:text-lg leading-relaxed">
        Pilih program bahasa Arab yang paling sesuai dengan tingkat kemampuan dan tujuan Anda. 
        Mulai dari dasar hingga pembacaan literatur klasik.
      </p>
    </div>

    <!-- Search Bar -->
    <div class="max-w-md mx-auto px-4">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-orange">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="currentPage = 1"
          placeholder="Cari program bahasa Arab..." 
          class="w-full pl-12 pr-4 py-3 rounded-full border border-brand-border/50 bg-white/50 focus:bg-white focus:outline-none focus:border-brand-orange transition-all text-brand-brown shadow-sm"
        />
      </div>
    </div>

    <!-- State Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
      <div v-for="n in 6" :key="n" class="bg-white/50 border border-brand-border/50 rounded-[30px] h-[400px] animate-pulse"></div>
    </div>

    <!-- State Error -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100 max-w-md mx-auto">
      <p class="font-medium">Ups, gagal memuat data program.</p>
      <p class="text-sm mt-1 opacity-80">Silakan periksa koneksi Anda dan coba muat ulang halaman.</p>
    </div>

    <!-- State Data -->
    <div v-else-if="filteredPrograms.length > 0" class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardProgram v-for="program in paginatedPrograms" :key="program.id" :program="program" />
      </div>

      <!-- Pagination UI -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-12">
        <button 
          @click="currentPage > 1 && currentPage--" 
          :disabled="currentPage === 1"
          class="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border/50 text-brand-brown hover:bg-brand-cream hover:border-brand-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all"
          :class="currentPage === page ? 'bg-brand-orange text-white shadow-lg' : 'text-brand-muted hover:bg-brand-cream'"
        >
          {{ page }}
        </button>

        <button 
          @click="currentPage < totalPages && currentPage++" 
          :disabled="currentPage === totalPages"
          class="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border/50 text-brand-brown hover:bg-brand-cream hover:border-brand-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <!-- State Kosong / Tidak Ditemukan -->
    <div v-else class="text-center py-20 bg-white/50 rounded-[40px] max-w-3xl mx-auto border border-brand-border border-dashed">
      <div class="text-brand-orange opacity-50 mb-4 flex justify-center">
        <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      <p class="text-xl font-display text-brand-brown mb-2">{{ searchQuery ? 'Program tidak ditemukan' : 'Belum ada program' }}</p>
      <p class="text-brand-muted">{{ searchQuery ? `Tidak ada program yang cocok dengan pencarian "${searchQuery}"` : 'Program baru sedang dipersiapkan, silakan kembali lagi nanti.' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useNuxtApp } from '#imports';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const { $db } = useNuxtApp();
const db = $db as Firestore;

const programs = ref<any[]>([]);
const isLoading = ref(true);
const error = ref(false);
const searchQuery = ref('');

const filteredPrograms = computed(() => {
  if (!searchQuery.value.trim()) return programs.value;
  const q = searchQuery.value.toLowerCase();
  return programs.value.filter(p => 
    p.nama?.toLowerCase().includes(q) || 
    p.level?.toLowerCase().includes(q) ||
    p.deskripsiSingkat?.toLowerCase().includes(q)
  );
});

// Pagination Logic
const currentPage = ref(1);
const itemsPerPage = ref(6);

const totalPages = computed(() => {
  return Math.ceil(filteredPrograms.value.length / itemsPerPage.value);
});

const paginatedPrograms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPrograms.value.slice(start, end);
});

onMounted(async () => {
  try {
    const q = query(
      collection(db, 'programs'),
      where('status', '==', 'aktif')
    );
    const snapshot = await getDocs(q);
    let allPrograms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    allPrograms.sort((a: any, b: any) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    programs.value = allPrograms;
  } catch (e) {
    console.error('Failed to fetch programs:', e);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
