<template>
  <div class="bg-brand-deeper w-full px-4 md:px-8 pb-6 md:pb-8 pt-8">
    <footer class="bg-brand-orange text-white rounded-[40px] max-w-7xl mx-auto px-8 md:px-12 py-12 md:py-16 flex flex-col shadow-2xl">
      
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">
        
        <!-- Brand & Description (Takes 2 columns on lg) -->
        <div class="lg:col-span-2 flex flex-col items-start md:pr-12">
          <div class="bg-white p-3 md:p-4 rounded-[20px] md:rounded-[24px] mb-6 inline-block shadow-xl">
            <img src="/logo.webp" alt="Logo MUBK" class="h-10 md:h-14 w-auto object-contain" />
          </div>
          <p class="text-white/90 text-sm md:text-base font-medium leading-relaxed">
            Pusat pembelajaran bahasa Arab intensif di Yogyakarta. 
            Membantu Anda merubah niat menjadi pemahaman nyata melalui kurikulum terstruktur dan bimbingan pengajar profesional.
          </p>
        </div>

        <!-- Column 1 -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-widest mb-6 opacity-80">Program Kami</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/program" class="text-sm opacity-90 hover:opacity-100 transition-opacity">Nahwu Dasar</NuxtLink></li>
            <li><NuxtLink to="/program" class="text-sm opacity-90 hover:opacity-100 transition-opacity">Sharaf Menengah</NuxtLink></li>
            <li><NuxtLink to="/program" class="text-sm opacity-90 hover:opacity-100 transition-opacity">Baca Kitab</NuxtLink></li>
            <li><NuxtLink to="/program" class="text-sm opacity-90 hover:opacity-100 transition-opacity">Semua Program &rarr;</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Column 2 -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-widest mb-6 opacity-80">Layanan</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/pendaftaran" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">Pendaftaran</NuxtLink></li>
            <li><NuxtLink to="/cek-status" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">Cek Status</NuxtLink></li>
            <li><NuxtLink to="/kitab" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">Toko Kitab</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Column 3 -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-widest mb-6 opacity-80">Bantuan</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">FAQ</a></li>
            <li><a href="#" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">Hubungi Kami</a></li>
            <li><a href="#" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">Panduan Belajar</a></li>
            <li><a href="#" class="text-sm font-thin opacity-90 hover:opacity-100 transition-opacity">Syarat & Ketentuan</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/20">
        <p class="text-sm font-semibold opacity-80">
          &copy; {{ new Date().getFullYear() }} Ma'had 'Umar bin Khattab. Seluruh Hak Cipta Dilindungi.
        </p>
        <div class="flex gap-3">
          <!-- Social Icons -->
          <a href="#" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-brand-orange transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-brand-orange transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-brand-orange transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
