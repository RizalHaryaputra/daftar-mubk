<template>
  <NuxtLink :to="`/program/${program.slug || program.id}`" class="group bg-white border border-brand-border rounded-[30px] overflow-hidden hover:shadow-2xl hover:shadow-brand-deeper/10 transition-all duration-300 flex flex-col h-full relative hover:-translate-y-2">
    <!-- Gambar Cover -->
    <div class="relative h-56 bg-brand-deeper overflow-hidden">
      <img v-if="program.gambarUrl" :src="program.gambarUrl" :alt="program.nama" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
      <div v-else class="w-full h-full flex items-center justify-center bg-brand-brown">
        <svg class="w-16 h-16 text-brand-orange/30" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
        </svg>
      </div>
      
      <!-- Gradient overlay bottom -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-deeper/80 via-transparent to-transparent opacity-80"></div>
      
      <!-- Badge Status -->
      <div class="absolute top-4 right-4 z-10">
        <span v-if="program.status === 'aktif'" class="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          Buka
        </span>
        <span v-else class="bg-white/90 text-brand-deeper text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          Tutup
        </span>
      </div>
      
      <!-- Level Tag overlay on image -->
      <div v-if="program.level" class="absolute bottom-4 left-4 z-10">
        <span class="text-brand-orange font-bold uppercase tracking-widest text-xs drop-shadow-md">{{ program.level }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 md:p-8 flex-1 flex flex-col">
      <h3 class="font-display text-2xl text-brand-brown leading-tight mb-3 group-hover:text-brand-orange transition-colors">{{ program.nama }}</h3>
      <p class="text-sm text-brand-muted mb-6 line-clamp-3">
        {{ program.deskripsi || 'Program intensif dengan ' + (Array.isArray(program.jadwal) ? program.jadwal.length + ' pilihan jadwal' : 'jadwal ' + program.jadwal) + '. Sangat cocok untuk Anda yang ingin belajar secara terstruktur.' }}
      </p>

      <!-- Footer / Price -->
      <div class="flex items-center justify-between pt-6 border-t border-brand-border border-dashed mt-auto">
        <div>
          <p class="text-[10px] text-brand-muted uppercase tracking-widest mb-1">Investasi</p>
          <p class="text-lg font-bold text-brand-brown">Rp {{ program.harga.toLocaleString('id-ID') }}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-brand-cream text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
          &rarr;
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  program: {
    type: Object,
    required: true
  }
});
</script>
