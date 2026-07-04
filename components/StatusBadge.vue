<template>
  <span :class="badgeClasses">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true // 'pending', 'success', 'expire', 'failed', 'dikirim'
  }
});

const label = computed(() => {
  switch (props.status) {
    case 'pending': return 'Menunggu';
    case 'success': return 'Lunas';
    case 'expire': return 'Kedaluwarsa';
    case 'failed': return 'Gagal';
    case 'dikirim': return 'Buku Dikirim';
    default: return props.status;
  }
});

const badgeClasses = computed(() => {
  const base = 'text-xs font-medium px-2.5 py-0.5 rounded-full border';
  switch (props.status) {
    case 'pending': return `${base} bg-amber-50 text-amber-700 border-amber-200`;
    case 'success': return `${base} bg-green-50 text-green-700 border-green-200`;
    case 'expire':
    case 'failed': return `${base} bg-red-50 text-red-600 border-red-200`;
    case 'dikirim': return `${base} bg-blue-50 text-blue-700 border-blue-200`;
    default: return `${base} bg-gray-50 text-gray-700 border-gray-200`;
  }
});
</script>
