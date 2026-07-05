<template>
  <div class="sticky top-6 z-50 px-4 md:px-6 flex flex-col items-center w-full mb-8">
    <nav class="bg-brand-deeper text-white rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between w-full max-w-5xl shadow-2xl shadow-brand-deeper/30 border border-white/5 relative z-20">
      <!-- Kiri: Link -->
      <div class="hidden md:flex flex-1 justify-start gap-10">
        <NuxtLink to="/" exact-active-class="!text-brand-orange !font-bold" class="text-white/70 text-sm font-medium hover:text-brand-orange transition-colors">Beranda</NuxtLink>
        <NuxtLink to="/program" active-class="!text-brand-orange !font-bold" class="text-white/70 text-sm font-medium hover:text-brand-orange transition-colors">Program</NuxtLink>
      </div>

      <!-- Tengah: Logo -->
      <div class="flex-shrink-0 mx-2 md:mx-4">
        <NuxtLink to="/" class="flex items-center justify-center bg-white rounded-full p-1.5 w-10 h-10 md:w-12 md:h-12 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <img src="/logo.webp" alt="Logo MUBK" class="w-full h-full object-contain" />
        </NuxtLink>
      </div>

      <!-- Kanan: Link -->
      <div class="hidden md:flex flex-1 justify-end gap-10 items-center">
        <NuxtLink to="/kitab" active-class="!text-brand-orange !font-bold" class="text-white/70 text-sm font-medium hover:text-brand-orange transition-colors">Kitab</NuxtLink>
        <NuxtLink to="/pendaftaran" active-class="!text-brand-orange !font-bold" class="text-white/70 text-sm font-medium hover:text-brand-orange transition-colors">Pendaftaran</NuxtLink>
      </div>

      <!-- Tombol Menu Mobile -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-white/70 hover:text-brand-orange ml-auto flex-1 flex justify-end focus:outline-none">
        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </nav>

    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-4 right-4 mt-2 bg-brand-deeper text-white rounded-[30px] p-6 shadow-2xl border border-white/10 flex flex-col gap-4 z-10"
      >
        <NuxtLink to="/" @click="isMobileMenuOpen = false" exact-active-class="!text-brand-orange !font-bold" class="text-white/80 hover:text-brand-orange text-sm font-medium py-2 border-b border-white/5">Beranda</NuxtLink>
        <NuxtLink to="/program" @click="isMobileMenuOpen = false" active-class="!text-brand-orange !font-bold" class="text-white/80 hover:text-brand-orange text-sm font-medium py-2 border-b border-white/5">Program</NuxtLink>
        <NuxtLink to="/kitab" @click="isMobileMenuOpen = false" active-class="!text-brand-orange !font-bold" class="text-white/80 hover:text-brand-orange text-sm font-medium py-2 border-b border-white/5">Kitab</NuxtLink>
        <NuxtLink to="/pendaftaran" @click="isMobileMenuOpen = false" active-class="!text-brand-orange !font-bold" class="text-white/80 hover:text-brand-orange text-sm font-medium py-2">Pendaftaran</NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 12s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
