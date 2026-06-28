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

        <div v-if="errorMsg" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
          {{ errorMsg }}
        </div>

        <AppButton type="submit" variant="primary" class="w-full mt-2" :disabled="isLoading">
          {{ isLoading ? 'Memproses...' : 'Masuk' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#imports';
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';

definePageMeta({
  layout: false // Halaman login tidak butuh layout sidebar
});

const router = useRouter();
const { $auth } = useNuxtApp();
const auth = $auth as Auth;
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const login = async () => {
  errorMsg.value = '';
  isLoading.value = true;
  try {
    // Authenticate with Firebase Client SDK
    await signInWithEmailAndPassword(auth, email.value, password.value);
    
    // Redirect on success
    router.push('/admin/dashboard');
  } catch (error: any) {
    console.error('Login error:', error);
    errorMsg.value = 'Email atau password salah. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>
