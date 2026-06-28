<template>
  <nav class="sticky top-0 z-50 bg-brand-brown px-6 py-3 flex items-center justify-between">
    <NuxtLink to="/" class="font-display text-brand-orange text-base">Ma'had 'Umar bin Khattab</NuxtLink>
    <div class="hidden md:flex gap-6">
      <NuxtLink to="/program" class="text-white/70 text-sm hover:text-white transition-colors">Program</NuxtLink>
      <NuxtLink to="/kitab" class="text-white/70 text-sm hover:text-white transition-colors">Kitab</NuxtLink>
      <NuxtLink to="/" class="text-white/70 text-sm hover:text-white transition-colors">Tentang</NuxtLink>
    </div>
    <NuxtLink to="/pendaftaran" class="bg-brand-orange text-white text-xs font-medium px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
      Daftar Sekarang
    </NuxtLink>
  </nav>
</template>
