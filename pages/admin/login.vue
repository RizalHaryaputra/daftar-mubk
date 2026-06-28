<template>
  <div class="min-h-screen flex items-center justify-center bg-brand-deeper p-4 relative overflow-hidden">
    <!-- Dekorasi background -->
    <div class="absolute -top-40 -right-40 text-brand-orange/5 pointer-events-none">
      <svg class="w-96 h-96" fill="currentColor" viewBox="0 0 100 100">
        <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
      </svg>
    </div>
    <div class="absolute -bottom-40 -left-40 text-brand-orange/5 pointer-events-none">
      <svg class="w-96 h-96" fill="currentColor" viewBox="0 0 100 100">
        <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
      </svg>
    </div>

    <!-- Kotak Login -->
    <div class="bg-brand-cream p-10 md:p-12 rounded-[40px] shadow-2xl max-w-md w-full relative z-10 border border-brand-orange/20">
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-orange/30">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h1 class="font-display text-3xl text-brand-brown">Admin Area</h1>
        <p class="text-sm text-brand-muted mt-2 font-medium">Masuk untuk mengelola sistem MUBK</p>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Email</label>
          <input type="email" v-model="email" required placeholder="admin@mubk.com" class="px-5 py-4 text-sm rounded-[20px] border-2 border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange transition-all w-full text-brand-brown font-medium" />
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Password</label>
          <input type="password" v-model="password" required placeholder="••••••••" class="px-5 py-4 text-sm rounded-[20px] border-2 border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange transition-all w-full text-brand-brown font-medium" />
        </div>

        <div v-if="errorMsg" class="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm border border-red-200 font-medium">
          {{ errorMsg }}
        </div>

        <button type="submit" class="w-full bg-brand-brown text-white font-display text-xl py-4 mt-4 rounded-full hover:bg-brand-orange transition-colors hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="isLoading">
          {{ isLoading ? 'Memproses...' : 'Masuk' }}
        </button>
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
