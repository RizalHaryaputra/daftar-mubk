<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Program Kami</h1>
      <p class="text-sm text-brand-muted">Pilih program bahasa Arab yang sesuai dengan level Anda.</p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="n in 3" :key="n" class="bg-white border border-brand-border rounded-xl h-48 animate-pulse"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
      Gagal memuat data program. Silakan coba lagi.
    </div>

    <!-- Data -->
    <div v-else-if="programs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardProgram v-for="program in programs" :key="program.id" :program="program" />
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-16 text-brand-muted">
      <p>Belum ada program yang tersedia saat ini.</p>
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
