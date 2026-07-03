<template>
  <div class="max-w-5xl mx-auto py-8 md:py-12 px-4 space-y-8">
    
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="animate-pulse space-y-8">
      <div class="h-10 bg-brand-cream/50 rounded-full w-32"></div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="md:col-span-4 h-96 bg-brand-cream/50 rounded-[30px]"></div>
        <div class="md:col-span-8 space-y-6">
          <div class="h-16 bg-brand-cream/50 rounded-2xl w-3/4"></div>
          <div class="h-8 bg-brand-cream/50 rounded-lg w-full"></div>
          <div class="h-32 bg-brand-cream/50 rounded-2xl w-full"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 p-10 md:p-14 rounded-[40px] text-center border border-red-100 max-w-2xl mx-auto shadow-sm">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h2 class="font-display text-3xl text-brand-brown mb-3">Program Tidak Ditemukan</h2>
      <p class="text-brand-muted mb-8 leading-relaxed text-sm md:text-base">Program yang Anda cari tidak tersedia atau mungkin telah dihapus.</p>
      
      <NuxtLink to="/program" class="bg-brand-orange text-white font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 inline-block">
        Kembali ke Daftar Program
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <template v-else-if="program">
      <!-- Back Navigation -->
      <div>
        <NuxtLink to="/program" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-orange transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Daftar Program
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <!-- Image Area (Left) -->
        <div class="md:col-span-4 lg:col-span-5">
          <div class="bg-white border border-brand-border/50 rounded-[30px] p-4 shadow-xl sticky top-24 relative overflow-hidden group">
            
            <div class="relative rounded-[25px] overflow-hidden w-full aspect-[4/5]">
              <div class="absolute inset-0 bg-gradient-to-t from-brand-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              
              <img v-if="program.gambarUrl" :src="program.gambarUrl" :alt="program.nama" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div v-else class="w-full h-full flex items-center justify-center bg-brand-brown">
                <span class="font-serif text-9xl text-brand-orange/30 select-none">ن</span>
              </div>
            </div>
            
            <!-- Floating Badge -->
            <div class="absolute top-8 right-8 shadow-lg">
              <span v-if="program.status === 'aktif'" class="bg-brand-orange text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-brand-orange/20">
                Terbuka
              </span>
              <span v-else class="bg-gray-100 text-gray-500 border border-gray-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                Ditutup
              </span>
            </div>
          </div>
        </div>
        
        <!-- Info Area (Right) -->
        <div class="md:col-span-8 lg:col-span-7 bg-white rounded-[30px] border border-brand-border/50 p-8 md:p-10 shadow-sm space-y-10">
          
          <!-- Header Info -->
          <div>
            <h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-brand-brown mb-6 leading-tight">{{ program.nama }}</h1>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 py-6 border-y border-brand-border/50">
              <div class="flex flex-col gap-1">
                <span class="text-xs text-brand-muted uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Jadwal
                </span>
                <span class="text-base font-medium text-brand-brown">{{ program.jadwal }}</span>
              </div>
              
              <div class="flex flex-col gap-1">
                <span class="text-xs text-brand-muted uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Durasi
                </span>
                <span class="text-base font-medium text-brand-brown">{{ program.durasi }}</span>
              </div>
              
              <div class="flex flex-col gap-1 col-span-2 sm:col-span-1">
                <span class="text-xs text-brand-muted uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Biaya
                </span>
                <span class="text-base font-bold text-brand-orange">Rp {{ program.harga?.toLocaleString('id-ID') }}</span>
              </div>
            </div>
          </div>
          
          <!-- Deadline Banner -->
          <div v-if="program.deadlineDaftar && program.status === 'aktif'" class="bg-brand-cream/50 border border-brand-orange/30 rounded-2xl p-5 flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p class="text-sm font-bold text-brand-brown">Batas Pendaftaran</p>
              <p class="text-sm text-brand-muted mt-0.5">Segera daftar sebelum <span class="font-bold text-brand-orange">{{ formatDate(program.deadlineDaftar) }}</span> untuk mengamankan kursi Anda.</p>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-4">
            <h2 class="font-display text-2xl text-brand-brown">Tentang Program</h2>
            <div class="prose prose-brand max-w-none text-brand-muted leading-relaxed">
              <p v-for="(paragraph, index) in program.deskripsi.split('\n')" :key="index" class="mb-4">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <!-- Kitab Wajib Section -->
          <div v-if="kitabWajib.length > 0" class="pt-6">
            <div class="flex items-center gap-3 mb-6">
              <h2 class="font-display text-2xl text-brand-brown">Kitab Referensi Utama</h2>
              <span class="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full">Wajib</span>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <NuxtLink v-for="k in kitabWajib" :key="k.id" :to="`/kitab/${k.id}`" class="group flex items-start gap-4 p-4 rounded-[20px] border border-brand-border/50 hover:border-brand-orange hover:shadow-lg transition-all bg-white">
                <div class="w-20 h-24 bg-brand-cream/30 rounded-xl overflow-hidden shrink-0 border border-brand-border/30">
                  <img v-if="k.gambarUrl" :src="k.gambarUrl" :alt="k.judul" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div v-else class="w-full h-full flex items-center justify-center text-brand-orange/30 font-serif text-3xl">ن</div>
                </div>
                <div>
                  <h3 class="font-bold text-brand-brown group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">{{ k.judul }}</h3>
                  <p class="text-xs text-brand-muted uppercase tracking-widest mt-1.5 mb-2">{{ k.penulis }}</p>
                  <p class="text-sm font-bold text-brand-brown">Rp {{ k.harga?.toLocaleString('id-ID') }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Bottom CTA -->
          <div class="bg-brand-brown rounded-[30px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 relative overflow-hidden shadow-2xl">
            <!-- Decorative SVG -->
            <div class="absolute -right-16 -top-16 text-white/5 pointer-events-none">
              <svg class="w-64 h-64" fill="currentColor" viewBox="0 0 100 100"><path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" /></svg>
            </div>
            
            <div class="relative z-10 text-center md:text-left">
              <h3 class="font-display text-2xl text-white mb-2">Siap untuk mulai belajar?</h3>
              <p class="text-white/70 text-sm md:text-base">Bergabunglah dengan program {{ program.nama }} sekarang.</p>
            </div>
            
            <NuxtLink 
              v-if="program.status === 'aktif'" 
              :to="`/pendaftaran?programId=${program.id}`"
              class="relative z-10 bg-brand-orange text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(198,132,54,0.4)] hover:-translate-y-1 transition-all shrink-0 w-full md:w-auto text-center"
            >
              Daftar Sekarang
            </NuxtLink>
            <div v-else class="relative z-10 bg-white/10 text-white/50 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm border border-white/10 cursor-not-allowed shrink-0 w-full md:w-auto text-center">
              Pendaftaran Ditutup
            </div>
          </div>

        </div>
      </div>
    </template>
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
