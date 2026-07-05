<template>
  <div class="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center font-sans selection:bg-brand-orange selection:text-white">
    <div class="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl max-w-lg w-full border border-black/5 relative overflow-hidden">
      <!-- Ornamen latar belakang -->
      <div class="absolute -top-12 -right-12 text-brand-orange opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 10 10 2-10 2-2 10-2-10-10-2 10-2z"/></svg>
      </div>

      <h1 class="font-display text-7xl md:text-8xl text-brand-orange mb-4 leading-none">
        {{ error?.statusCode }}
      </h1>
      <h2 class="font-bold text-xl md:text-2xl text-brand-deeper mb-6">
        {{ error?.statusCode === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
      </h2>
      <p class="text-brand-muted text-sm md:text-base mb-10 leading-relaxed">
        {{ error?.statusCode === 404 
          ? 'Maaf, halaman yang Anda tuju mungkin telah dihapus, namanya berubah, atau memang tidak pernah ada.' 
          : 'Maaf, sepertinya ada masalah pada sistem kami. Silakan coba beberapa saat lagi atau hubungi admin.' 
        }}
      </p>

      <button 
        @click="handleError" 
        class="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-orange text-white px-8 py-3.5 rounded-full font-medium hover:bg-orange-600 transition-all hover:-translate-y-1 shadow-lg shadow-brand-orange/20"
      >
        <span>&larr;</span> Kembali ke Beranda
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clearError } from '#app'

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
