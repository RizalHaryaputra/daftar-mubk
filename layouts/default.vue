<template>
  <div class="bg-brand-cream min-h-screen font-sans flex flex-col">
    <AppNavbar />
    <main class="flex-grow w-full" :class="{ 'max-w-5xl mx-auto px-4 py-6 space-y-3': !isLandingPage }">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// Cek apakah halaman saat ini adalah beranda (landing page)
const isLandingPage = computed(() => route.path === '/')
</script>
