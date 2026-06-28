<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Ongkir Zona</h1>
      <AppButton variant="primary" @click="saveOngkir" :disabled="isLoading || isSaving">
        {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </AppButton>
    </div>

    <div v-if="successMsg" class="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 text-sm">
      {{ successMsg }}
    </div>

    <div v-if="isLoading" class="bg-white border border-brand-border rounded-xl p-6 animate-pulse space-y-4">
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>

    <div v-else class="bg-white rounded-xl border border-brand-border p-6 max-w-lg space-y-4">
      <p class="text-sm text-brand-muted">Nominal ongkos kirim flat global yang berlaku untuk semua pembelian kitab.</p>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-brand-brown">DI Yogyakarta (Rp)</label>
        <input type="number" v-model="form.jogja" class="input-field" />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-brand-brown">Jawa Luar DIY (Rp)</label>
        <input type="number" v-model="form.jawa" class="input-field" />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-brand-brown">Luar Jawa (Rp)</label>
        <input type="number" v-model="form.luarJawa" class="input-field" />
      </div>

      <p v-if="lastUpdated" class="text-xs text-brand-muted pt-2">Terakhir diperbarui: {{ lastUpdated }}</p>
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

<style scoped>
.input-field { @apply px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange w-full transition-colors; }
</style>
