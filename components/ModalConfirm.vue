<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm transition-opacity" @click="$emit('cancel')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl border border-brand-border/20 transform transition-all text-center z-10 animate-in fade-in zoom-in duration-200">
        <div :class="`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${iconBgClass}`">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="variant === 'danger'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 class="font-display text-2xl text-brand-brown mb-2">{{ title }}</h3>
        <p class="text-brand-muted text-sm mb-8 leading-relaxed px-2">{{ message }}</p>
        
        <div class="flex flex-col-reverse sm:flex-row gap-3 justify-center">
          <button @click="$emit('cancel')" class="px-6 py-3 rounded-full border-2 border-brand-border text-brand-brown font-bold text-xs tracking-wider uppercase hover:bg-brand-cream hover:border-brand-orange transition-colors w-full sm:w-auto">
            {{ cancelText }}
          </button>
          <button @click="$emit('confirm')" :class="`px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all hover:-translate-y-1 w-full sm:w-auto text-white shadow-lg ${confirmButtonClass}`">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Konfirmasi'
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Ya, Lanjutkan'
  },
  cancelText: {
    type: String,
    default: 'Batal'
  },
  variant: {
    type: String,
    default: 'danger', // 'danger' or 'primary'
    validator: (value: string) => ['danger', 'primary'].includes(value)
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const iconBgClass = computed(() => {
  return props.variant === 'danger' ? 'bg-red-50 text-red-500' : 'bg-brand-orange/10 text-brand-orange';
});

const confirmButtonClass = computed(() => {
  if (props.variant === 'danger') {
    return 'bg-red-500 hover:bg-red-600 hover:shadow-red-500/30';
  }
  return 'bg-brand-orange hover:bg-orange-600 hover:shadow-brand-orange/30';
});

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = '';
  }
});
</script>
