<template>
  <div 
    @click="handleClick"
    class="group bg-white border border-brand-border rounded-[30px] overflow-hidden transition-all duration-300 flex flex-col h-full relative hover:shadow-2xl hover:shadow-brand-deeper/10 hover:-translate-y-2 cursor-pointer"
  >
    <!-- Gambar Cover (Portrait aspect ratio for books) -->
    <div class="relative w-full pt-[125%] bg-brand-deeper overflow-hidden">
      <img v-if="kitab.gambarUrl" :src="kitab.gambarUrl" :alt="kitab.judul" class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
      <div v-else class="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-brand-brown p-4 text-center">
        <span class="text-brand-orange/30 text-6xl font-serif mb-2">كتاب</span>
      </div>
      
      <!-- Gradient overlay bottom -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-deeper via-black/20 to-transparent opacity-80"></div>
    </div>

    <!-- Body -->
    <div class="p-5 md:p-6 flex-1 flex flex-col relative z-10 bg-white" style="margin-top: -20px; border-radius: 30px 30px 0 0;">
      <h3 class="font-display text-xl md:text-2xl text-brand-brown leading-tight mb-1 group-hover:text-brand-orange transition-colors">{{ kitab.judul }}</h3>
      <p class="text-xs text-brand-muted mb-4 font-bold uppercase tracking-widest">{{ kitab.penulis || 'Penulis Unknown' }}</p>
      
      <p class="text-sm text-brand-muted line-clamp-3 mb-6">
        {{ kitab.deskripsi || 'Kitab rujukan berbahasa Arab yang digunakan untuk materi kurikulum.' }}
      </p>

      <!-- Footer / Price -->
      <div class="flex items-center justify-between pt-5 border-t border-brand-border border-dashed mt-auto">
        <div>
          <p class="text-[10px] text-brand-muted uppercase tracking-widest mb-1">Harga</p>
          <p class="text-lg font-bold text-brand-orange">Rp {{ kitab.harga.toLocaleString('id-ID') }}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-brand-cream text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
          &rarr;
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#imports';

const props = defineProps({
  kitab: {
    type: Object,
    required: true
  }
});

const handleClick = () => {
  navigateTo(`/kitab/${props.kitab.id}`);
};
</script>
