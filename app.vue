<template>
  <div>
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
