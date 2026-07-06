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
  meta: [
    { name: 'google-site-verification', content: '4FVBr1EKug_oNIlZYTuM2BqdtldfUdJTb5HhHx1mGEY' }
  ],
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

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Daftar MUBK` : 'Daftar MUBK';
  },
  title: 'Beranda',
  description: 'Portal resmi Pendaftaran Program MUBK dan Pembelian Kitab Pembelajaran secara daring yang mudah dan aman.',
  ogTitle: 'Pendaftaran Program & Pembelian Kitab MUBK',
  ogDescription: 'Portal resmi Pendaftaran Program MUBK dan Pembelian Kitab Pembelajaran secara daring yang mudah dan aman.',
  ogImage: '/logo.webp',
  ogUrl: 'https://daftar.mahadumar.id',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Pendaftaran Program & Pembelian Kitab MUBK',
  twitterDescription: 'Portal resmi Pendaftaran Program MUBK dan Pembelian Kitab Pembelajaran secara daring yang mudah dan aman.',
  twitterImage: '/logo.webp',
});
</script>

<style>
/* Global Text Selection Color */
::selection {
  background-color: #EA580C; /* Tailwind orange-600 to match brand-orange */
  color: white;
}
::-moz-selection {
  background-color: #EA580C;
  color: white;
}

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
