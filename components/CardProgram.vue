<template>
  <div class="bg-white border border-brand-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow flex flex-col h-full">
    <!-- Area visual atas -->
    <div class="bg-brand-brown h-28 relative flex items-center justify-center overflow-hidden">
      <span v-if="!program.gambarUrl" class="font-serif text-5xl text-brand-orange/25 select-none z-0">ن</span>
      <img v-else :src="program.gambarUrl" :alt="program.nama" class="w-full h-full object-cover z-0 opacity-80" />
      
      <!-- Badge status -->
      <span v-if="program.status === 'aktif'" class="absolute top-2.5 right-2.5 z-10 bg-brand-orange text-white text-[10px] font-medium px-2 py-0.5 rounded">
        Buka
      </span>
      <span v-else class="absolute top-2.5 right-2.5 z-10 bg-gray-100 text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded">
        Tutup
      </span>
    </div>

    <!-- Body -->
    <div class="p-4 flex-1 flex flex-col">
      <p v-if="program.level" class="text-brand-orange text-[10px] font-medium uppercase tracking-wide mb-1">{{ program.level }}</p>
      <h3 class="text-sm font-medium text-brand-brown leading-snug mb-1">{{ program.nama }}</h3>
      <p class="text-xs text-brand-muted mb-3 flex-1">{{ program.jadwal }}</p>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-brand-border mt-auto">
        <div>
          <p class="text-sm font-medium text-brand-brown">Rp {{ program.harga.toLocaleString('id-ID') }}</p>
          <p class="text-[10px] text-brand-muted">per program</p>
        </div>
        <NuxtLink :to="`/program/${program.id}`" class="bg-brand-brown text-white text-[10px] font-medium px-3 py-1.5 rounded-md hover:bg-brand-deeper transition-colors">
          Detail
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  program: {
    type: Object,
    required: true
  }
});
</script>
