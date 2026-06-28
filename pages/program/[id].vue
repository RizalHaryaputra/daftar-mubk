<template>
  <div class="space-y-6">
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="bg-white border border-brand-border rounded-xl overflow-hidden animate-pulse">
      <div class="bg-gray-200 h-48"></div>
      <div class="p-6 space-y-3">
        <div class="h-4 bg-gray-200 rounded w-24"></div>
        <div class="h-8 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
      Program tidak ditemukan atau terjadi kesalahan.
      <NuxtLink to="/program" class="underline ml-1">Kembali ke daftar program</NuxtLink>
    </div>

    <!-- Data -->
    <div v-else-if="program" class="bg-white border border-brand-border rounded-xl overflow-hidden">
      <!-- Header visual -->
      <div class="bg-brand-brown h-48 relative flex items-center justify-center overflow-hidden">
        <img v-if="program.gambarUrl" :src="program.gambarUrl" :alt="program.nama" class="w-full h-full object-cover opacity-80" />
        <span v-else class="font-serif text-7xl text-brand-orange/25 select-none">ن</span>
        <span v-if="program.status === 'aktif'" class="absolute top-4 right-4 bg-brand-orange text-white text-xs font-medium px-3 py-1 rounded">
          Buka Pendaftaran
        </span>
        <span v-else class="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded">
          Pendaftaran Tutup
        </span>
      </div>

      <div class="p-6 md:p-8">
        <h1 class="font-display text-3xl text-brand-brown mb-4">{{ program.nama }}</h1>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-6 border-t border-brand-border">
          <div>
            <p class="text-xs text-brand-muted mb-1 uppercase tracking-widest">Jadwal</p>
            <p class="text-sm font-medium text-brand-brown">{{ program.jadwal }}</p>
          </div>
          <div>
            <p class="text-xs text-brand-muted mb-1 uppercase tracking-widest">Durasi</p>
            <p class="text-sm font-medium text-brand-brown">{{ program.durasi }}</p>
          </div>
          <div>
            <p class="text-xs text-brand-muted mb-1 uppercase tracking-widest">Biaya</p>
            <p class="text-sm font-medium text-brand-brown">Rp {{ program.harga?.toLocaleString('id-ID') }}</p>
          </div>
        </div>

        <!-- Deadline -->
        <div v-if="program.deadlineDaftar" class="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          <span class="font-medium">Deadline Pendaftaran:</span> {{ formatDate(program.deadlineDaftar) }}
        </div>

        <!-- Deskripsi -->
        <div class="space-y-2 mb-8">
          <h2 class="font-display text-xl text-brand-brown">Deskripsi Program</h2>
          <p class="text-sm text-brand-muted leading-relaxed">{{ program.deskripsi }}</p>
        </div>

        <!-- Kitab Wajib -->
        <div v-if="kitabWajib.length > 0" class="mt-8 pt-8 border-t border-brand-border">
          <h2 class="font-display text-xl text-brand-brown mb-4">Kitab Wajib</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardKitab v-for="k in kitabWajib" :key="k.id" :kitab="k" />
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-8 flex justify-end">
          <AppButton
            v-if="program.status === 'aktif'"
            variant="primary"
            @click="navigateTo(`/pendaftaran?programId=${program.id}`)"
          >
            Daftar Program Ini
          </AppButton>
          <p v-else class="text-sm text-brand-muted italic">Pendaftaran untuk program ini sedang ditutup.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#imports';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const route = useRoute();
const { $db } = useNuxtApp();
const db = $db as Firestore;

const program = ref<any>(null);
const kitabWajib = ref<any[]>([]);
const isLoading = ref(true);
const error = ref(false);

const formatDate = (ts: any) => {
  if (!ts) return '-';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date);
};

onMounted(async () => {
  try {
    const programId = route.params.id as string;
    const docRef = doc(db, 'programs', programId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      error.value = true;
      return;
    }

    program.value = { id: docSnap.id, ...docSnap.data() };

    // Fetch kitab wajib jika ada
    if (program.value.wajibBeliKitab && program.value.kitabWajibIds?.length > 0) {
      const kitabPromises = program.value.kitabWajibIds.map((kitabId: string) =>
        getDoc(doc(db, 'kitabs', kitabId))
      );
      const kitabSnaps = await Promise.all(kitabPromises);
      kitabWajib.value = kitabSnaps
        .filter(snap => snap.exists())
        .map(snap => ({ id: snap.id, ...snap.data() }));
    }
  } catch (e) {
    console.error('Failed to fetch program:', e);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
