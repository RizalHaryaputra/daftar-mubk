import type { RouteLocationNormalized } from 'vue-router';
import { defineNuxtRouteMiddleware } from '#imports';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // Simulasi cek login
  const isAuthenticated = false; // Ubah ini saat implementasi Firebase Auth asli

  // Pengecualian halaman login agar tidak redirect loop
  if (to.path === '/admin/login') {
    return;
  }

  // Gunakan state firebaseUser dari plugin
  const user = useState('firebaseUser');

  // Karena Firebase onAuthStateChanged async, ini mungkin terbaca null di load pertama (SSR).
  // Di client side, kalau null kita paksa ke login.
  if (import.meta.client && !user.value) {
    return navigateTo('/admin/login');
  }
});
