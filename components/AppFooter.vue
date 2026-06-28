<template>
  <footer class="bg-brand-deeper rounded-2xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
    <span class="font-display text-brand-orange text-sm">Ma'had 'Umar bin Khattab</span>
    <div class="flex gap-5">
      <NuxtLink to="/program" class="text-white/40 text-xs hover:text-white/70 transition-colors">Program</NuxtLink>
      <NuxtLink to="/kitab" class="text-white/40 text-xs hover:text-white/70 transition-colors">Kitab</NuxtLink>
      <NuxtLink to="/" class="text-white/40 text-xs hover:text-white/70 transition-colors">Kontak</NuxtLink>
      <NuxtLink to="/cek-status" class="text-white/40 text-xs hover:text-white/70 transition-colors">Cek Status</NuxtLink>
    </div>
    <span class="text-white/20 text-xs">&copy; {{ new Date().getFullYear() }} MUBK Yogyakarta</span>
  </footer>
</template>
