export default defineNuxtRouteMiddleware((to, from) => {
  // Simulasi cek login
  const isAuthenticated = false; // Ubah ini saat implementasi Firebase Auth asli

  // Pengecualian halaman login agar tidak redirect loop
  if (to.path === '/admin/login') {
    return;
  }

  if (!isAuthenticated) {
    // Arahkan ke halaman login
    // NOTE: Uncomment ketika logic authentication sudah diimplementasi
    // return navigateTo('/admin/login');
    console.log('[Middleware] Admin-auth bypass (Mock Mode)');
  }
});
