<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, outline, ghost, small
  }
});

const buttonClasses = computed(() => {
  const base = 'font-medium transition-all active:scale-[0.98] rounded-lg inline-flex items-center justify-center';
  
  switch (props.variant) {
    case 'primary':
      return `${base} bg-brand-orange text-white text-sm px-5 py-2.5 hover:bg-orange-600`;
    case 'secondary':
      return `${base} bg-brand-brown text-white text-sm px-5 py-2.5 hover:bg-brand-deeper`;
    case 'outline':
      return `${base} border border-white/20 text-white text-sm px-5 py-2.5 hover:bg-white/5`;
    case 'ghost':
      return 'text-brand-orange text-sm font-medium hover:underline inline-flex items-center';
    case 'small':
      return 'bg-brand-brown text-white text-[10px] font-medium px-3 py-1.5 rounded-md hover:bg-brand-deeper transition-colors inline-flex items-center justify-center';
    default:
      return `${base} bg-brand-orange text-white text-sm px-5 py-2.5 hover:bg-orange-600`;
  }
});
</script>
