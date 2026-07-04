<template>
  <div>
    <NuxtLoadingIndicator color="#F97316" :height="4" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig, useHead } from '#imports';

const config = useRuntimeConfig();

useHead({
  script: [
    {
      src: config.public.midtransIsProduction
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js',
      'data-client-key': config.public.midtransClientKey as string,
      async: true
    }
  ]
});
</script>

<style>
/* Animasi Transisi Halaman Global */
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
