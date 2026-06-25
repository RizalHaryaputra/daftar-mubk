<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Ongkir Zona</h1>
      <AppButton variant="primary" @click="saveOngkir" :disabled="isLoading">
        {{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </AppButton>
    </div>

    <div v-if="successMsg" class="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
      {{ successMsg }}
    </div>

    <div class="bg-white rounded-xl border border-brand-border p-6 max-w-lg">
      <form class="space-y-4" @submit.prevent="saveOngkir">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">DI Yogyakarta (Rp)</label>
          <input type="number" v-model="form.jogja" required class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange" />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">Jawa Luar DIY (Rp)</label>
          <input type="number" v-model="form.jawa" required class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange" />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-brand-brown">Luar Jawa (Rp)</label>
          <input type="number" v-model="form.luar_jawa" required class="px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});

const { $db } = useNuxtApp();

const form = ref({
  jogja: 15000,
  jawa: 25000,
  luar_jawa: 45000
});

const isLoading = ref(false);
const successMsg = ref('');

const fetchOngkir = async () => {
  const docRef = doc($db, 'settings', 'ongkir');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    form.value = docSnap.data() as any;
  }
};

onMounted(() => {
  fetchOngkir();
});

const saveOngkir = async () => {
  isLoading.value = true;
  successMsg.value = '';
  try {
    const docRef = doc($db, 'settings', 'ongkir');
    await setDoc(docRef, form.value);
    successMsg.value = 'Data ongkir berhasil disimpan!';
    setTimeout(() => { successMsg.value = '' }, 3000);
  } catch (error) {
    console.error('Failed to save ongkir', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
