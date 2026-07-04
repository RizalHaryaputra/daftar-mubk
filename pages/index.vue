<template>
  <div class="bg-brand-cream font-sans selection:bg-brand-orange selection:text-white">
    
    <!-- 1. HERO SECTION (Light, with dark background behind the rounded bottom) -->
    <div class="bg-brand-deeper">
      <section class="bg-brand-cream rounded-b-[40px] md:rounded-b-[80px] pt-8 pb-32 px-6 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
      <!-- Ornamen aksen (mirip sinar matahari di desain, kita pakai oranye) -->
      <div class="absolute top-12 left-12 md:top-24 md:left-24 text-brand-orange opacity-40">
        <svg class="w-16 h-16 md:w-24 md:h-24 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
        </svg>
      </div>

      <div class="max-w-4xl mx-auto z-10">
        <h1 class="font-display text-4xl md:text-6xl lg:text-7xl text-brand-brown leading-tight tracking-tight mb-6">
          Belajar Bahasa Arab<br>
          <span class="italic font-light">Bersama</span> <span class="font-semibold text-brand-orange">Ahlinya</span>
        </h1>
        <p class="text-brand-muted max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-10">
          Program intensif terstruktur, dari pemula hingga mahir, menggunakan pendekatan modern dan kitab-kitab pilihan para ulama.
        </p>
        
        <div class="relative inline-block">
          <img src="https://images.unsplash.com/photo-1717540614323-153cb6b593c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGtpdGFifGVufDB8fDB8fHww" alt="Belajar Bahasa Arab" class="w-full max-w-[600px] h-[300px] md:h-[400px] object-cover rounded-[30px] md:rounded-[40px] shadow-xl border-4 border-white" />
          
          <!-- Floating button ala Creatix -->
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white p-2 rounded-full shadow-lg border border-brand-border">
            <NuxtLink to="/pendaftaran" class="bg-brand-orange text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors whitespace-nowrap">
              Daftar Sekarang
            </NuxtLink>
            <NuxtLink to="/program" class="bg-brand-cream text-brand-brown px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-50 transition-colors whitespace-nowrap">
              Lihat Program
            </NuxtLink>
          </div>
        </div>
      </div>
      </section>
    </div>

    <!-- MAIN DARK CONTENT -->
    <div class="bg-brand-deeper pb-20">
      <!-- 2. STATS SECTION (Dark) -->
      <section class="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div class="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-14 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left divide-x-0 md:divide-x divide-white/10 relative z-10">
            <div class="px-4">
              <p class="font-display text-4xl md:text-5xl text-brand-orange mb-2">12<span class="text-white">+</span></p>
              <p class="text-white/60 text-sm font-medium uppercase tracking-wider">Program Pilihan</p>
            </div>
            <div class="px-4">
              <p class="font-display text-4xl md:text-5xl text-brand-orange mb-2">8<span class="text-white">+</span></p>
              <p class="text-white/60 text-sm font-medium uppercase tracking-wider">Tahun Pengalaman</p>
            </div>
            <div class="px-4">
              <p class="font-display text-4xl md:text-5xl text-brand-orange mb-2">500<span class="text-white">+</span></p>
              <p class="text-white/60 text-sm font-medium uppercase tracking-wider">Alumni Sukses</p>
            </div>
            <div class="px-4">
              <p class="font-display text-4xl md:text-5xl text-brand-orange mb-2">24<span class="text-white">/7</span></p>
              <p class="text-white/60 text-sm font-medium uppercase tracking-wider">Akses & Bimbingan</p>
            </div>
          </div>
        </div>
      </section>

    <!-- 3. ABOUT / METHODOLOGY SECTION -->
    <section class="px-6 py-12 max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/2">
          <h2 class="font-display text-3xl md:text-5xl text-white leading-tight mb-6">
            Merubah Niat Menjadi <br><span class="text-brand-orange">Pemahaman Nyata</span>
          </h2>
          <!-- Star/Cross icon -->
          <div class="text-brand-orange mb-6">
             <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 10 10 2-10 2-2 10-2-10-10-2 10-2z"/></svg>
          </div>
          <div class="bg-brand-orange text-brand-deeper inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest rounded mb-6">
            Lembaga Bahasa Arab
          </div>
        </div>
        <div class="md:w-1/2 space-y-6">
          <p class="text-white/70 text-sm md:text-base leading-relaxed border-l-2 border-brand-orange/30 pl-4">
            Kami mungkin bukan yang terbesar, namun dedikasi kami tidak terbatas. Dengan pendekatan yang terstruktur dan interaktif, kami mengubah konsep bahasa Arab yang rumit menjadi pemahaman yang melekat dan mudah diaplikasikan.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1623314359092-c8c528fab644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0YWJ8ZW58MHx8MHx8fDA%3D" class="rounded-2xl h-48 object-cover w-full filter brightness-75 hover:brightness-100 transition-all duration-500" />
            <img src="https://images.unsplash.com/photo-1623314305825-44e6d2b49e2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpdGFifGVufDB8fDB8fHww" class="rounded-2xl h-48 object-cover w-full filter brightness-75 hover:brightness-100 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4. SERVICES / PROGRAM UNGGULAN -->
    <section class="px-6 py-20 max-w-6xl mx-auto border-t border-white/10 mt-12">
      <div class="flex flex-col md:flex-row justify-between items-start gap-12">
        <div class="md:w-5/12 w-full">
          <div class="flex items-center gap-4 mb-6">
            <h2 class="font-display text-3xl text-white">Program</h2>
            <span class="bg-brand-orange text-brand-deeper font-bold italic px-4 py-1 rounded-full border-2 border-brand-orange">Unggulan</span>
          </div>
          <p class="text-white/60 text-sm mb-10 leading-relaxed">
            Kami menawarkan berbagai program mulai dari tingkat dasar hingga mahir, disesuaikan dengan kebutuhan Anda untuk menguasai tata bahasa dan percakapan.
          </p>

          <!-- Interactive List -->
          <div class="space-y-4">
            <div v-if="isLoading" class="animate-pulse space-y-4">
              <div v-for="n in 3" :key="n" class="h-[68px] bg-white/5 rounded-xl border border-white/10"></div>
            </div>
            <div v-else-if="programs.length === 0" class="text-white/50 text-sm py-4">Belum ada program unggulan.</div>
            <template v-else>
              <div 
                v-for="(prog, idx) in programs" 
                :key="prog.id"
                @mouseenter="hoveredProgram = prog"
                class="group flex items-center justify-between p-5 rounded-xl border transition-all cursor-pointer"
                :class="hoveredProgram?.id === prog.id ? 'border-brand-orange bg-white/5' : 'border-white/10 hover:border-white/30'"
              >
                <div class="flex items-center gap-4">
                  <span class="text-white/40 font-mono text-sm">0{{ idx + 1 }}</span>
                  <span class="text-white font-medium group-hover:text-brand-orange transition-colors">{{ prog.nama }}</span>
                </div>
                <span class="text-white/40 group-hover:text-brand-orange transition-transform group-hover:translate-x-2">&rarr;</span>
              </div>
            </template>
          </div>

          <div class="mt-10">
            <NuxtLink to="/program" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange text-brand-deeper font-bold uppercase tracking-wider text-sm hover:bg-white hover:-translate-y-1 transition-all shadow-lg shadow-brand-orange/20">
              Lihat Semua Program
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </NuxtLink>
          </div>
        </div>

        <div class="md:w-6/12 relative hidden md:block">
          <!-- Dynamic Image Panel -->
          <div v-if="isLoading" class="aspect-[4/5] rounded-[30px] overflow-hidden relative bg-white/5 animate-pulse border border-white/10"></div>
          <div v-else-if="hoveredProgram" class="aspect-[4/5] rounded-[30px] overflow-hidden relative shadow-2xl shadow-black/50">
            <img :src="hoveredProgram.gambarUrl || 'https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?w=800&q=80'" class="w-full h-full object-cover transition-opacity duration-300" :key="hoveredProgram.id" />
            <div class="absolute inset-0 bg-gradient-to-t from-brand-deeper via-brand-deeper/50 to-transparent opacity-90"></div>
            
            <div class="absolute bottom-8 left-8 right-8">
              <p class="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">{{ hoveredProgram.level || 'Umum' }}</p>
              <h3 class="font-display text-2xl text-white mb-2">{{ hoveredProgram.nama }}</h3>
              <p class="text-white/70 text-sm line-clamp-2 mb-4">{{ Array.isArray(hoveredProgram.jadwal) ? (hoveredProgram.jadwal.length + ' Pilihan Jadwal') : hoveredProgram.jadwal }} · Rp {{ (hoveredProgram.harga || 0).toLocaleString('id-ID') }}</p>
              
              <NuxtLink :to="`/program/${hoveredProgram.id}`" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-deeper hover:bg-brand-orange hover:text-white transition-colors">
                <span class="rotate-45 block transform -translate-y-px">&uarr;</span>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Decorative Text Ring -->
          <div class="absolute -top-12 -right-12 w-32 h-32 border border-brand-orange/30 rounded-full flex items-center justify-center animate-spin-slow opacity-50 pointer-events-none">
            <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible">
              <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
              <text class="text-[9px] uppercase tracking-[3px] fill-brand-orange font-bold">
                <textPath href="#curve">BELAJAR BERSAMA AHLINYA · BAHASA ARAB ·</textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- CARA DAFTAR -->
    <section class="px-6 py-12 max-w-6xl mx-auto">
      <div class="bg-brand-brown border border-white/10 rounded-[30px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <h2 class="font-display text-2xl text-white mb-8 text-center md:text-left">Alur Pendaftaran</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div class="text-center md:text-left">
            <div class="w-12 h-12 rounded-full bg-brand-orange text-brand-deeper font-bold text-xl flex items-center justify-center mb-4 mx-auto md:mx-0">1</div>
            <h4 class="text-white font-medium mb-2">Pilih Program</h4>
            <p class="text-white/60 text-sm leading-relaxed">Pilih program yang sesuai dengan tingkat kemampuan Anda.</p>
          </div>
          <div class="text-center md:text-left">
            <div class="w-12 h-12 rounded-full bg-white/5 text-white font-bold text-xl flex items-center justify-center mb-4 mx-auto md:mx-0 border border-white/10 hover:border-brand-orange transition-colors">2</div>
            <h4 class="text-white font-medium mb-2">Isi Formulir</h4>
            <p class="text-white/60 text-sm leading-relaxed">Lengkapi biodata diri dan pilih kitab pengiriman.</p>
          </div>
          <div class="text-center md:text-left">
            <div class="w-12 h-12 rounded-full bg-white/5 text-white font-bold text-xl flex items-center justify-center mb-4 mx-auto md:mx-0 border border-white/10 hover:border-brand-orange transition-colors">3</div>
            <h4 class="text-white font-medium mb-2">Pembayaran</h4>
            <p class="text-white/60 text-sm leading-relaxed">Selesaikan pembayaran secara online dengan aman.</p>
          </div>
          <div class="text-center md:text-left">
            <div class="w-12 h-12 rounded-full bg-white/5 text-white font-bold text-xl flex items-center justify-center mb-4 mx-auto md:mx-0 border border-white/10 hover:border-brand-orange transition-colors">4</div>
            <h4 class="text-white font-medium mb-2">Mulai Belajar</h4>
            <p class="text-white/60 text-sm leading-relaxed">Tunggu konfirmasi admin dan bergabung di kelas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. SCROLLING MARQUEE -->
    <div class="w-full bg-brand-orange py-4 my-12 overflow-hidden whitespace-nowrap shadow-lg">
      <div class="marquee-container inline-block">
        <div class="flex items-center gap-8 text-brand-deeper font-display text-xl md:text-2xl uppercase tracking-widest font-bold">
          <!-- Blok Asli -->
          <span>Nahwu Dasar</span> <span class="text-white text-sm">✦</span>
          <span>Sharaf Menengah</span> <span class="text-white text-sm">✦</span>
          <span>Baca Kitab Lanjutan</span> <span class="text-white text-sm">✦</span>
          <span>Muhadatsah</span> <span class="text-white text-sm">✦</span>
          <!-- Blok Duplikat 1 -->
          <span>Nahwu Dasar</span> <span class="text-white text-sm">✦</span>
          <span>Sharaf Menengah</span> <span class="text-white text-sm">✦</span>
          <span>Baca Kitab Lanjutan</span> <span class="text-white text-sm">✦</span>
          <span>Muhadatsah</span> <span class="text-white text-sm">✦</span>
          <!-- Blok Duplikat 2 -->
          <span>Nahwu Dasar</span> <span class="text-white text-sm">✦</span>
          <span>Sharaf Menengah</span> <span class="text-white text-sm">✦</span>
          <span>Baca Kitab Lanjutan</span> <span class="text-white text-sm">✦</span>
          <span>Muhadatsah</span> <span class="text-white text-sm">✦</span>
          <!-- Blok Duplikat 3 -->
          <span>Nahwu Dasar</span> <span class="text-white text-sm">✦</span>
          <span>Sharaf Menengah</span> <span class="text-white text-sm">✦</span>
          <span>Baca Kitab Lanjutan</span> <span class="text-white text-sm">✦</span>
          <span>Muhadatsah</span> <span class="text-white text-sm">✦</span>
        </div>
      </div>
    </div>

    <!-- 6. KITAB PILIHAN -->
    <section class="px-6 py-12 max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-display text-3xl text-white">Kitab <span class="bg-white/10 px-4 py-1 rounded-full text-brand-orange italic border border-white/10">Pilihan</span></h2>
        <NuxtLink to="/kitab" class="text-white/50 hover:text-white transition-colors text-sm bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10">Lihat Semua</NuxtLink>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="n in 4" :key="n" class="bg-white/5 rounded-[24px] h-[260px] animate-pulse border border-white/10"></div>
      </div>
      <div v-else-if="kitabs.length === 0" class="text-white/50 text-center py-10">Belum ada kitab pilihan.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink :to="`/kitab/${kitab.id}`" v-for="kitab in kitabs" :key="kitab.id" class="bg-white rounded-[24px] p-6 text-center border-4 border-transparent hover:border-brand-orange/20 flex flex-col items-center group relative hover:-translate-y-2 transition-all duration-300 shadow-xl">
          <div class="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mb-5 text-brand-orange border-2 border-brand-orange/20 relative group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange rounded-full border-2 border-white"></div>
          </div>
          <h4 class="text-brand-brown font-semibold mb-1 text-sm md:text-base">{{ kitab.judul }}</h4>
          <p class="text-brand-muted text-xs md:text-sm mb-4">{{ kitab.penulis || 'Penulis Unknown' }}</p>
          <div class="mt-auto pt-4 border-t border-brand-border w-full flex items-center justify-between">
            <p class="text-brand-orange font-bold text-sm">Rp {{ (kitab.harga || 0).toLocaleString('id-ID') }}</p>
            <div class="w-6 h-6 rounded-full bg-brand-cream text-brand-orange flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              &rarr;
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- 7. FOOTER / CTA -->
    <section class="px-6 py-24 mt-12 relative overflow-hidden">
      <!-- Ornamen -->
      <div class="absolute top-0 right-0 text-brand-orange/5 translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 10 10 2-10 2-2 10-2-10-10-2 10-2z"/></svg>
      </div>

      <div class="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <h2 class="font-display text-4xl md:text-6xl text-white leading-tight">
          Siap memulai <br><span class="text-brand-orange italic">perjalanan</span> bahasa Arab Anda?
        </h2>
        <p class="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Pendaftaran gelombang ini segera ditutup. Jadilah bagian dari alumni kami yang telah merasakan mudahnya memahami literatur Arab.
        </p>
        <div class="pt-6">
          <NuxtLink to="/pendaftaran" class="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-medium hover:bg-orange-600 transition-all hover:scale-105 shadow-xl shadow-brand-orange/20">
            Daftar Sekarang <span class="text-xl leading-none">&rarr;</span>
          </NuxtLink>
        </div>
        </div>
      </section>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#imports';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

definePageMeta({
  layout: 'landing'
});

const { $db } = useNuxtApp();
const db = $db as Firestore;

const programs = ref<any[]>([]);
const hoveredProgram = ref<any>(null);
const kitabs = ref<any[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    // Ambil program aktif, lalu urutkan di client untuk menghindari error Composite Index Firestore
    const qPrograms = query(
      collection(db, 'programs'),
      where('status', '==', 'aktif')
    );
    const snapPrograms = await getDocs(qPrograms);
    let allPrograms = snapPrograms.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    allPrograms.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    programs.value = allPrograms.slice(0, 4);
    
    if (programs.value.length > 0) {
      hoveredProgram.value = programs.value[0];
    }

    // Ambil kitab aktif, urutkan di client
    const qKitabs = query(
      collection(db, 'kitabs'),
      where('status', '==', 'aktif')
    );
    const snapKitabs = await getDocs(qKitabs);
    let allKitabs = snapKitabs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    allKitabs.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    kitabs.value = allKitabs.slice(0, 4);
  } catch (error) {
    console.error('Error fetching data for landing page:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Animasi lambat memutar */
.animate-spin-slow {
  animation: spin 16s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Animasi Marquee / Running Text */
.marquee-container {
  animation: marquee 25s linear infinite;
  display: inline-block;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Translate -50% assumes exactly 2 identical halves to loop. Since we have 4 blocks, -50% means it translates through 2 blocks. We can adjust this to -25% or just let it scroll smoothly depending on width. With 4 identical blocks, -25% is one block, -50% is two blocks. Let's use -50% for a smooth continuous loop if the container is wide enough. */
    transform: translateX(-50%);
  }
}
</style>
