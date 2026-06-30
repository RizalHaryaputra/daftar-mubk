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
    <div v-else-if="programs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
      <CardProgram v-for="program in programs" :key="program.id" :program="program" />
    </div>

    <!-- State Kosong -->
    <div v-else class="text-center py-20 bg-white/50 rounded-[40px] max-w-3xl mx-auto border border-brand-border border-dashed">
      <div class="text-brand-orange opacity-50 mb-4 flex justify-center">
        <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      </div>
      <p class="text-xl font-display text-brand-brown mb-2">Belum ada program</p>
      <p class="text-brand-muted">Program baru sedang dipersiapkan, silakan kembali lagi nanti.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#imports';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const { $db } = useNuxtApp();
const db = $db as Firestore;

const programs = ref<any[]>([]);
const isLoading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const q = query(
      collection(db, 'programs'),
      where('status', '==', 'aktif'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    programs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Failed to fetch programs:', e);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
