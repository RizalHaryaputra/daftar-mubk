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

    <div v-if="isLoading" class="bg-white rounded-[30px] border border-brand-border/50 p-10 animate-pulse space-y-8 max-w-2xl">
      <div class="h-10 bg-brand-cream/50 rounded-xl w-full"></div>
      <div class="h-10 bg-brand-cream/50 rounded-xl w-full"></div>
      <div class="h-10 bg-brand-cream/50 rounded-xl w-full"></div>
    </div>

    <div v-else class="bg-white rounded-[30px] border border-brand-border/50 p-8 md:p-10 max-w-2xl shadow-sm">
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
