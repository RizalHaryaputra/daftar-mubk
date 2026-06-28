<template>
  <div class="space-y-6">
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="bg-white border border-brand-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 animate-pulse">
      <div class="w-full md:w-64 h-80 bg-gray-200 rounded-xl flex-shrink-0"></div>
      <div class="flex-1 space-y-4">
        <div class="h-8 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        <div class="h-8 bg-gray-200 rounded w-1/4 mt-4"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
      Kitab tidak ditemukan atau terjadi kesalahan.
      <NuxtLink to="/kitab" class="underline ml-1">Kembali ke daftar kitab</NuxtLink>
    </div>

    <!-- Data -->
    <div v-else-if="kitab" class="bg-white border border-brand-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
      <!-- Cover -->
      <div class="w-full md:w-64 h-80 bg-brand-brown rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
        <img v-if="kitab.gambarUrl" :src="kitab.gambarUrl" :alt="kitab.judul" class="w-full h-full object-cover opacity-80" />
        <span v-else class="font-serif text-6xl text-brand-orange/25 select-none">كتاب</span>
        <span v-if="kitab.status !== 'aktif'" class="absolute top-3 right-3 bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded">
          Tidak Tersedia
        </span>
      </div>

      <!-- Info -->
      <div class="flex-1">
        <p class="text-brand-orange text-xs font-medium uppercase tracking-widest mb-1">{{ kitab.kategori }}</p>
        <h1 class="font-display text-3xl text-brand-brown mb-2">{{ kitab.judul }}</h1>
        <p class="text-sm text-brand-muted mb-6">Oleh: {{ kitab.penulis }}</p>

        <p class="font-sans text-2xl font-medium text-brand-orange mb-6">
          Rp {{ kitab.harga?.toLocaleString('id-ID') }}
        </p>

        <div class="space-y-2 mb-8">
          <h2 class="font-display text-xl text-brand-brown">Deskripsi</h2>
          <p class="text-sm text-brand-muted leading-relaxed">{{ kitab.deskripsi }}</p>
        </div>

        <div class="flex gap-4">
          <!-- Beli standalone hanya jika bisaStandalone true -->
          <AppButton
            v-if="kitab.bisaStandalone && kitab.status === 'aktif'"
            variant="primary"
            @click="navigateTo(`/pendaftaran?kitabId=${kitab.id}`)"
          >
            Beli Kitab Saja
          </AppButton>
          <AppButton variant="outline" class="!text-brand-brown !border-brand-border hover:!bg-gray-50" @click="navigateTo('/kitab')">
            Kembali
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#imports';
import { doc, getDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const route = useRoute();
const { $db } = useNuxtApp();
const db = $db as Firestore;

const kitab = ref<any>(null);
const isLoading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const kitabId = route.params.id as string;
    const docRef = doc(db, 'kitabs', kitabId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      error.value = true;
      return;
    }
    kitab.value = { id: docSnap.id, ...docSnap.data() };
  } catch (e) {
    console.error('Failed to fetch kitab:', e);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
