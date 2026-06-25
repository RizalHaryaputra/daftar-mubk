<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="bg-white p-8 rounded-xl border border-brand-border shadow-sm max-w-sm w-full">
      <div class="text-center mb-8">
        <h1 class="font-display text-2xl text-brand-brown">Admin MUBK</h1>
        <p class="text-xs text-brand-muted mt-1">Silakan login untuk mengelola sistem</p>
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">Email</label>
          <input type="email" v-model="email" required placeholder="admin@mubk.com" class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors" />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">Password</label>
          <input type="password" v-model="password" required placeholder="••••••••" class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors" />
        </div>

        <AppButton type="submit" variant="primary" class="w-full mt-2">
          Masuk
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: false // Halaman login tidak butuh layout sidebar
});

const router = useRouter();
const email = ref('');
const password = ref('');

const login = () => {
  // Simulasi sukses login
  alert('Simulasi: Berhasil Login');
  router.push('/admin/dashboard');
};
</script>
