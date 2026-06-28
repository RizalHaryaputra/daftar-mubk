<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Kitab Pilihan</h1>
      <p class="text-sm text-brand-muted">Koleksi kitab rujukan yang digunakan di Ma'had 'Umar bin Khattab.</p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div v-for="n in 4" :key="n" class="bg-white border border-brand-border rounded-xl h-40 animate-pulse"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
      Gagal memuat data kitab. Silakan coba lagi.
    </div>

    <!-- Data -->
    <div v-else-if="kitabs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <CardKitab v-for="kitab in kitabs" :key="kitab.id" :kitab="kitab" />
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-16 text-brand-muted">
      <p>Belum ada kitab yang tersedia saat ini.</p>
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

const kitabs = ref<any[]>([]);
const isLoading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const q = query(
      collection(db, 'kitabs'),
      where('status', '==', 'aktif'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    kitabs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Failed to fetch kitabs:', e);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
