<template>
  <div class="min-h-screen bg-brand-cream flex flex-col md:flex-row relative">
    
    <!-- Mobile Header -->
    <div class="md:hidden bg-brand-deeper text-white flex items-center justify-between p-4 shadow-md z-30 sticky top-0">
      <span class="font-display text-brand-orange text-xl tracking-tight">Admin<span class="text-white italic">Area</span></span>
      <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 -mr-2 focus:outline-none">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar Overlay (Mobile) -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="w-64 bg-brand-deeper text-white flex flex-col shadow-2xl z-40 fixed md:sticky top-0 h-screen transition-transform duration-300 ease-in-out shrink-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <div class="p-8 border-b border-white/10 hidden md:block">
        <span class="font-display text-brand-orange text-2xl tracking-tight">Admin<span
            class="text-white italic">Area</span></span>
      </div>
      <div class="p-6 border-b border-white/10 md:hidden flex justify-between items-center">
        <span class="font-display text-brand-orange text-xl tracking-tight">Menu<span class="text-white italic">Admin</span></span>
        <button @click="isSidebarOpen = false" class="p-2 text-white/50 hover:text-white">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
        <NuxtLink to="/admin/dashboard"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium"
          :class="isActive('/admin/dashboard') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'text-white/70 hover:text-white hover:bg-white/5'">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/pendaftaran"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium"
          :class="isActive('/admin/pendaftaran') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'text-white/70 hover:text-white hover:bg-white/5'">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Pendaftaran
        </NuxtLink>
        <NuxtLink to="/admin/pembelian-kitab"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium"
          :class="isActive('/admin/pembelian-kitab') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'text-white/70 hover:text-white hover:bg-white/5'">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Pembelian Kitab
        </NuxtLink>
        <NuxtLink to="/admin/program"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium"
          :class="isActive('/admin/program') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'text-white/70 hover:text-white hover:bg-white/5'">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Program
        </NuxtLink>
        <NuxtLink to="/admin/kitab"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium"
          :class="isActive('/admin/kitab') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'text-white/70 hover:text-white hover:bg-white/5'">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Kitab
        </NuxtLink>
        <NuxtLink to="/admin/ongkir"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium"
          :class="isActive('/admin/ongkir') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'text-white/70 hover:text-white hover:bg-white/5'">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
          Ongkir
        </NuxtLink>
      </nav>
      <div class="p-6 border-t border-white/10">
        <button @click="handleLogout"
          class="w-full px-5 py-3 text-left text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-medium flex items-center justify-between">
          <span>Keluar</span>
          <svg class="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-8 md:p-12 overflow-auto md:h-screen min-h-screen">
      <div class="max-w-6xl mx-auto pb-10">
        <slot />
      </div>
    </main>
    <!-- Toast Notifications -->
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNuxtApp } from '#imports';
import { signOut, type Auth } from 'firebase/auth';

const isSidebarOpen = ref(false);
const route = useRoute();
const router = useRouter();
const { $auth } = useNuxtApp();
const auth = $auth as Auth;

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push('/admin/login');
  } catch (error) {
    console.error('Logout error', error);
  }
};
</script>
