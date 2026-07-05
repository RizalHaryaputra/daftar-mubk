<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-y-10 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-10 opacity-0"
  >
    <div
      v-if="toastState.isVisible"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl min-w-[300px] border"
      :class="{
        'bg-green-50 text-green-800 border-green-200': toastState.type === 'success',
        'bg-red-50 text-red-800 border-red-200': toastState.type === 'error',
        'bg-blue-50 text-blue-800 border-blue-200': toastState.type === 'info'
      }"
    >
      <!-- Success Icon -->
      <svg v-if="toastState.type === 'success'" class="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <!-- Error Icon -->
      <svg v-if="toastState.type === 'error'" class="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <!-- Info Icon -->
      <svg v-if="toastState.type === 'info'" class="w-6 h-6 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>

      <div class="flex-1 font-medium text-sm">{{ toastState.message }}</div>

      <button @click="hideToast" class="p-1 -mr-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none">
        <svg class="w-5 h-5 opacity-70 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const { toastState, hideToast } = useToast();
</script>
