<template>
  <div class="min-h-screen bg-brand-cream/30 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-brand-deeper text-white flex flex-col shadow-2xl z-20">
      <div class="p-8 border-b border-white/10">
        <span class="font-display text-brand-orange text-2xl tracking-tight">Admin<span class="text-white italic">Area</span></span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-3">
        <NuxtLink to="/admin/dashboard" class="block px-5 py-3 rounded-2xl hover:bg-white/5 transition-all text-sm text-white/70 hover:text-white font-medium" active-class="bg-brand-orange text-white shadow-lg shadow-brand-orange/30">Dashboard</NuxtLink>
        <NuxtLink to="/admin/pendaftaran" class="block px-5 py-3 rounded-2xl hover:bg-white/5 transition-all text-sm text-white/70 hover:text-white font-medium" active-class="bg-brand-orange text-white shadow-lg shadow-brand-orange/30">Pendaftaran</NuxtLink>
        <NuxtLink to="/admin/program" class="block px-5 py-3 rounded-2xl hover:bg-white/5 transition-all text-sm text-white/70 hover:text-white font-medium" active-class="bg-brand-orange text-white shadow-lg shadow-brand-orange/30">Program</NuxtLink>
        <NuxtLink to="/admin/kitab" class="block px-5 py-3 rounded-2xl hover:bg-white/5 transition-all text-sm text-white/70 hover:text-white font-medium" active-class="bg-brand-orange text-white shadow-lg shadow-brand-orange/30">Kitab</NuxtLink>
        <NuxtLink to="/admin/ongkir" class="block px-5 py-3 rounded-2xl hover:bg-white/5 transition-all text-sm text-white/70 hover:text-white font-medium" active-class="bg-brand-orange text-white shadow-lg shadow-brand-orange/30">Ongkir</NuxtLink>
      </nav>
      <div class="p-6 border-t border-white/10">
        <button class="w-full px-5 py-3 text-left text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-medium flex items-center justify-between">
          <span>Keluar</span>
          <svg class="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 md:p-12 overflow-auto h-screen">
      <div class="max-w-6xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
