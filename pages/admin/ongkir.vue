<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Kelola Ongkir Zona</h1>
        <p class="text-brand-muted mt-2">Atur nominal ongkos kirim flat global yang berlaku untuk pembelian kitab.</p>
      </div>
      <button 
        @click="saveOngkir" 
        :disabled="isLoading || isSaving"
        class="bg-brand-orange text-white font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 text-sm flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        <svg v-if="isSaving" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
        {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="successMsg" class="bg-green-50/80 backdrop-blur-sm text-green-700 p-5 rounded-[20px] border-2 border-green-200 text-sm font-medium flex items-center gap-3 animate-fade-in">
      <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      {{ successMsg }}
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <!-- Left side: Form -->
      <div v-if="isLoading" class="lg:col-span-2 bg-white rounded-[30px] border border-brand-border/50 p-10 animate-pulse space-y-8">
        <div class="h-10 bg-brand-cream/50 rounded-xl w-full"></div>
        <div class="h-10 bg-brand-cream/50 rounded-xl w-full"></div>
        <div class="h-10 bg-brand-cream/50 rounded-xl w-full"></div>
      </div>

      <div v-else class="lg:col-span-2 bg-white rounded-[30px] border border-brand-border/50 p-8 md:p-10 shadow-sm relative overflow-hidden">
        <form @submit.prevent="saveOngkir" class="space-y-6">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">DI Yogyakarta (Rp) <span class="text-brand-orange">*</span></label>
            <input type="number" required v-model="form.jogja" class="input-field" placeholder="0" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Jawa Luar DIY (Rp) <span class="text-brand-orange">*</span></label>
            <input type="number" required v-model="form.jawa" class="input-field" placeholder="0" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Luar Jawa (Rp) <span class="text-brand-orange">*</span></label>
            <input type="number" required v-model="form.luarJawa" class="input-field" placeholder="0" />
          </div>
        </form>

        <div v-if="lastUpdated" class="mt-8 pt-6 border-t border-brand-border/50 flex items-center gap-2 text-xs font-medium text-brand-muted">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Terakhir diperbarui: {{ lastUpdated }}
        </div>
      </div>

      <!-- Right side: Info Panel -->
      <div class="lg:col-span-1 bg-brand-brown rounded-[30px] border border-brand-orange/20 p-8 relative overflow-hidden h-full shadow-lg">
        <!-- Decor -->
        <div class="absolute -top-10 -right-10 text-brand-orange/20 pointer-events-none">
          <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 100 100">
             <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
          </svg>
        </div>
        
        <div class="w-12 h-12 bg-brand-deeper rounded-full flex items-center justify-center mb-6 shadow-sm text-brand-orange border border-brand-orange/30">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        
        <h3 class="font-display text-2xl text-white mb-4">Informasi <span class="text-brand-orange italic">Zona</span></h3>
        
        <ul class="space-y-5 text-sm text-white/80 font-medium">
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 shrink-0 rounded-full bg-brand-deeper flex items-center justify-center text-brand-orange text-xs font-bold border border-brand-orange/30">1</span>
            <span class="pt-0.5">Ongkir ini bersifat <strong>flat global</strong>. Pembeli cukup membayar nominal ini berapapun jumlah kitab yang dipesan.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 shrink-0 rounded-full bg-brand-deeper flex items-center justify-center text-brand-orange text-xs font-bold border border-brand-orange/30">2</span>
            <span class="pt-0.5">Saat pendaftar atau pembeli mengisi form, ongkir akan otomatis dijumlahkan dengan total tagihan.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 shrink-0 rounded-full bg-brand-deeper flex items-center justify-center text-brand-orange text-xs font-bold border border-brand-orange/30">3</span>
            <span class="pt-0.5">Sistem membagi ongkir rata-rata ekspedisi (Pos/JNE/J&T) ke dalam 3 zona geografis untuk memudahkan administrasi.</span>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;

// Gunakan field sesuai PRD: jogja, jawa, luarJawa (camelCase)
const form = ref({ jogja: 15000, jawa: 25000, luarJawa: 45000 });
const isLoading = ref(true);
const isSaving = ref(false);
const successMsg = ref('');
const lastUpdated = ref('');

onMounted(async () => {
  try {
    const snap = await getDoc(doc(db, 'settings', 'ongkir'));
    if (snap.exists()) {
      const data = snap.data();
      form.value = { jogja: data.jogja, jawa: data.jawa, luarJawa: data.luarJawa };
      if (data.updatedAt) {
        const d = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt);
        lastUpdated.value = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(d);
      }
    }
  } finally {
    isLoading.value = false;
  }
});

const saveOngkir = async () => {
  isSaving.value = true;
  successMsg.value = '';
  try {
    await setDoc(doc(db, 'settings', 'ongkir'), {
      jogja: Number(form.value.jogja),
      jawa: Number(form.value.jawa),
      luarJawa: Number(form.value.luarJawa),
      updatedAt: new Date()
    });
    successMsg.value = 'Pengaturan ongkir berhasil disimpan!';
    lastUpdated.value = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
    setTimeout(() => { successMsg.value = ''; }, 3000);
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped lang="postcss">
.input-field {
  @apply px-5 py-4 text-sm rounded-[20px] border-2 border-brand-border/50 bg-white focus:outline-none focus:border-brand-orange transition-all w-full text-brand-brown font-medium;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>
