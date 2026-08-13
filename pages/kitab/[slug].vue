<template>
  <div class="max-w-5xl mx-auto py-8 md:py-12 px-4 space-y-8">
    
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="animate-pulse space-y-8">
      <div class="h-10 bg-brand-cream/50 rounded-full w-40"></div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="md:col-span-4 lg:col-span-5 h-96 bg-brand-cream/50 rounded-[30px]"></div>
        <div class="md:col-span-8 lg:col-span-7 space-y-6">
          <div class="h-6 bg-brand-cream/50 rounded w-24"></div>
          <div class="h-12 bg-brand-cream/50 rounded w-3/4"></div>
          <div class="h-6 bg-brand-cream/50 rounded w-1/2 mb-10"></div>
          <div class="h-10 bg-brand-cream/50 rounded w-48"></div>
          <div class="h-32 bg-brand-cream/50 rounded w-full"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 p-10 md:p-14 rounded-[40px] text-center border border-red-100 max-w-2xl mx-auto shadow-sm">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h2 class="font-display text-3xl text-brand-brown mb-3">Kitab Tidak Ditemukan</h2>
      <p class="text-brand-muted mb-8 leading-relaxed text-sm md:text-base">Buku atau kitab yang Anda cari tidak tersedia atau mungkin telah dihapus.</p>
      
      <NuxtLink to="/kitab" class="bg-brand-orange text-white font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 inline-block">
        Kembali ke Daftar Kitab
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <template v-else-if="kitab">
      <!-- Back Navigation -->
      <div class="gsap-back">
        <NuxtLink to="/kitab" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-orange transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Daftar Kitab
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        <!-- Left: Image Area -->
        <div class="gsap-left-card md:col-span-4 lg:col-span-5">
          <div class="bg-white border border-brand-border/50 rounded-[30px] p-4 shadow-xl sticky top-28 md:top-32 relative overflow-hidden group">
            
            <div class="relative rounded-[25px] overflow-hidden w-full aspect-[3/4]">
              <div class="absolute inset-0 bg-gradient-to-t from-brand-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              
              <img v-if="kitab.gambarUrl" :src="kitab.gambarUrl" :alt="kitab.judul" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div v-else class="w-full h-full flex items-center justify-center bg-brand-brown">
                <span class="font-serif text-8xl text-brand-orange/30 select-none">كتاب</span>
              </div>
            </div>
            
            <!-- Floating Badge -->
            <div class="absolute top-8 right-8 shadow-lg z-10">
              <span v-if="kitab.status !== 'aktif'" class="bg-gray-100 text-gray-500 border border-gray-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                Tidak Tersedia
              </span>
            </div>
          </div>
        </div>
        
        <!-- Right: Info Area -->
        <div class="gsap-right-info md:col-span-8 lg:col-span-7 bg-white rounded-[30px] border border-brand-border/50 p-8 md:p-10 shadow-sm flex flex-col justify-between">
          
          <div>
            <!-- Kategori -->
            <div class="gsap-detail-header">
              <div class="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {{ kitab.kategori || 'Kitab' }}
              </div>
              
              <!-- Judul & Penulis -->
              <h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-brand-brown mb-4 leading-tight">{{ kitab.judul }}</h1>
              <p class="text-brand-muted text-sm md:text-base mb-10 flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-orange/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Ditulis oleh <span class="font-bold text-brand-brown">{{ kitab.penulis }}</span>
              </p>
            </div>
            
            <!-- Harga -->
            <div class="gsap-detail-price mb-10 pb-10 border-b border-brand-border/50">
              <p class="text-xs text-brand-muted uppercase tracking-widest font-bold mb-2">Harga</p>
              <div class="text-4xl md:text-5xl font-display text-brand-orange">
                Rp {{ kitab.harga?.toLocaleString('id-ID') }}
              </div>
            </div>
            
            <!-- Deskripsi -->
            <div class="gsap-detail-desc space-y-4 mb-12">
              <h2 class="font-display text-2xl text-brand-brown flex items-center gap-2">
                <svg class="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Deskripsi Kitab
              </h2>
              <div class="prose prose-brand max-w-none text-brand-muted leading-relaxed" v-html="kitab.deskripsi"></div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="gsap-detail-action pt-8 mt-auto flex flex-col sm:flex-row items-center gap-4">
            <template v-if="kitab.bisaStandalone && kitab.status === 'aktif'">
              <NuxtLink 
                :to="`/pendaftaran?kitabId=${kitab.id}`" 
                class="w-full flex-1 bg-brand-orange text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(198,132,54,0.4)] hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-3"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Beli Kitab Saja
              </NuxtLink>
            </template>
            <template v-else-if="!kitab.bisaStandalone">
              <div class="w-full flex-1 bg-brand-cream/50 text-brand-brown/50 px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm border border-brand-border text-center flex items-center justify-center gap-3 cursor-not-allowed">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Hanya Tersedia Via Program
              </div>
            </template>
          </div>

        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#imports';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { gsap } from 'gsap';

const route = useRoute();
const { $db } = useNuxtApp();
const db = $db as Firestore;

const kitab = ref<any>(null);
const isLoading = ref(true);
const error = ref(false);

const animateDetailContent = async () => {
  if (!import.meta.client) return;
  await nextTick();
  
  gsap.killTweensOf('.gsap-back, .gsap-left-card, .gsap-detail-header, .gsap-detail-price, .gsap-detail-desc, .gsap-detail-action');

  // Back navigation slide in
  gsap.fromTo(
    '.gsap-back',
    { opacity: 0, x: -12 },
    { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: 'power2.out', clearProps: 'transform' }
  );

  // Left cover image entrance
  gsap.fromTo(
    '.gsap-left-card',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.65, delay: 0.2, ease: 'power2.out', clearProps: 'transform' }
  );

  // Right side content staggered entrance
  const rightElements = document.querySelectorAll(
    '.gsap-detail-header, .gsap-detail-price, .gsap-detail-desc, .gsap-detail-action'
  );
  if (rightElements.length > 0) {
    gsap.fromTo(
      rightElements,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, delay: 0.25, stagger: 0.08, ease: 'power2.out', clearProps: 'transform' }
    );
  }
};

watch(isLoading, (newVal) => {
  if (!newVal && kitab.value) {
    animateDetailContent();
  }
});

onMounted(async () => {
  try {
    const routeSlug = route.params.slug as string;
    
    // Attempt to find by slug first
    const q = query(collection(db, 'kitabs'), where('slug', '==', routeSlug), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
      const docSnap = querySnapshot.docs[0]!;
      kitab.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      // Fallback to fetching by ID
      const docRef = doc(db, 'kitabs', routeSlug);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        error.value = true;
        return;
      }
      kitab.value = { id: docSnap.id, ...docSnap.data() };
    }
  } catch (e) {
    console.error('Failed to fetch kitab:', e);
    error.value = true;
  } finally {
    isLoading.value = false;
    animateDetailContent();
  }
});
</script>
