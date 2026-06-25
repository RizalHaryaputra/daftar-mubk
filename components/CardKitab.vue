<template>
  <div class="bg-white border border-brand-border rounded-xl p-3 flex gap-3 items-start hover:shadow-sm transition-shadow">
    <!-- Cover -->
    <div class="w-9 h-12 bg-brand-brown rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
      <img v-if="kitab.gambarUrl" :src="kitab.gambarUrl" :alt="kitab.judul" class="w-full h-full object-cover" />
      <span v-else class="text-brand-orange text-[10px] font-serif">كتاب</span>
    </div>

    <!-- Info -->
    <div class="min-w-0 flex-1">
      <p class="text-xs font-medium text-brand-brown leading-snug mb-0.5 truncate" :title="kitab.judul">{{ kitab.judul }}</p>
      <p class="text-[10px] text-brand-muted mb-2 truncate" :title="kitab.penulis">{{ kitab.penulis }}</p>
      <div class="flex items-center justify-between">
        <p class="text-xs text-brand-orange font-medium">Rp {{ kitab.harga.toLocaleString('id-ID') }}</p>
        <NuxtLink v-if="kitab.bisaStandalone" :to="`/kitab/${kitab.id}`" class="text-[10px] text-brand-brown font-medium hover:underline">
          Lihat
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  kitab: {
    type: Object,
    required: true
  }
});
</script>
