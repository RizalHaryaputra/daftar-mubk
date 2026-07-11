<template>
  <div class="bg-brand-cream font-sans selection:bg-brand-orange selection:text-white">

    <!-- HERO -->
    <div class="relative">
      <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-brand-deeper"></div>
      <section class="bg-brand-cream rounded-b-[40px] md:rounded-b-[80px] pt-12 pb-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div class="hidden md:block absolute top-16 left-16 text-brand-orange opacity-30">
          <svg class="w-20 h-20 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
          </svg>
        </div>
        <div class="max-w-2xl mx-auto z-10">
          <div class="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full px-4 py-1.5 mb-6">
            <div class="w-2 h-2 rounded-full bg-brand-orange"></div>
            <span class="text-brand-orange text-xs font-bold uppercase tracking-widest">Narahubung</span>
          </div>
          <h1 class="font-display text-5xl md:text-6xl text-brand-brown leading-tight tracking-tight mb-4">
            Hubungi <span class="italic font-light text-brand-orange">Kami</span>
          </h1>
          <p class="text-brand-muted text-base leading-relaxed">
            Punya pertanyaan soal program atau pembelian kitab? Kami siap membantu Anda.
          </p>
        </div>
      </section>
    </div>

    <!-- DARK SECTION -->
    <div class="bg-brand-deeper pb-24">

      <!-- Contact Cards -->
      <section class="px-6 py-16 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <!-- WhatsApp -->
          <a
            href="https://wa.me/6281392658080"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white/5 border border-white/10 hover:border-green-500/50 rounded-[28px] p-8 flex flex-col items-start transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
          >
            <div class="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-300">
              <svg class="w-7 h-7 text-green-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">WhatsApp</p>
            <h3 class="text-white font-display text-xl mb-1">+62 813-9265-8080</h3>
            <p class="text-white/50 text-sm mb-6">Narahubung YPIA Academy</p>
            <div class="mt-auto flex items-center gap-2 text-green-400 text-sm font-bold group-hover:gap-3 transition-all">
              <span>Chat Sekarang</span>
              <span>&rarr;</span>
            </div>
          </a>

          <!-- Email -->
          <div class="bg-white/5 border border-white/10 rounded-[28px] p-8 flex flex-col items-start">
            <div class="w-14 h-14 bg-brand-orange/10 border border-brand-orange/20 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Email</p>
            <h3 class="text-white font-display text-xl mb-1">mahadumar.ypia@gmail.com</h3>
            <p class="text-white/50 text-sm">Respon dalam 1×24 jam kerja</p>
          </div>

          <!-- Lokasi -->
          <div class="bg-white/5 border border-white/10 rounded-[28px] p-8 flex flex-col items-start">
            <div class="w-14 h-14 bg-brand-orange/10 border border-brand-orange/20 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Lokasi</p>
            <h3 class="text-white font-display text-xl mb-1">Ma'had 'Umar bin Khattab</h3>
            <p class="text-white/50 text-sm leading-relaxed">Jl. Pogung Rejo No.412, RT.14/RW.51, Pogung Kidul, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284</p>
          </div>
        </div>
      </section>

      <!-- CTA WA -->
      <section class="px-6 pb-8 max-w-5xl mx-auto">
        <div class="bg-brand-brown border border-white/10 rounded-[30px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div class="absolute top-0 right-0 text-white/5 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 10 10 2-10 2-2 10-2-10-10-2 10-2z"/></svg>
          </div>
          <div class="relative z-10">
            <p class="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">Butuh Bantuan Cepat?</p>
            <h3 class="font-display text-2xl md:text-3xl text-white mb-2">Hubungi kami langsung<br/>via WhatsApp</h3>
            <p class="text-white/60 text-sm">Tim kami siap membantu Anda memilih program yang tepat.</p>
          </div>
          <a
            href="https://wa.me/6281392658080?text=Halo,%20saya%20ingin%20bertanya%20tentang%20program%20MUBK"
            target="_blank"
            rel="noopener noreferrer"
            class="relative z-10 flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:-translate-y-1 transition-all shadow-xl shadow-green-500/20"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat via WhatsApp
          </a>
        </div>
      </section>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' });
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 16s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
