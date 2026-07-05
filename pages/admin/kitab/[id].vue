<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <NuxtLink to="/admin/kitab" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-orange transition-colors mb-4">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali ke Daftar Kitab
      </NuxtLink>
      <h1 class="font-display text-4xl text-brand-brown tracking-tight">Edit Kitab</h1>
      <p class="text-brand-muted mt-2">Ubah informasi kitab di bawah ini.</p>
    </div>

    <div v-if="isLoading" class="bg-white p-10 rounded-[30px] border border-brand-border/50 text-center">
      <div class="w-10 h-10 rounded-full border-4 border-brand-cream border-t-brand-orange animate-spin mx-auto mb-4"></div>
      <p class="text-brand-muted animate-pulse">Memuat data kitab...</p>
    </div>
    
    <div v-else-if="!kitabData" class="bg-white p-10 rounded-[30px] border border-brand-border/50 text-center">
      <p class="text-red-500 font-medium">Kitab tidak ditemukan!</p>
    </div>

    <FormKitab v-else :initial-data="kitabData" :is-saving="isSaving" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});

const route = useRoute();
const router = useRouter();
const { $db } = useNuxtApp();
const db = $db as Firestore;

const id = route.params.id as string;

const isLoading = ref(true);
const isSaving = ref(false);
const kitabData = ref<any>(null);

onMounted(async () => {
  try {
    const docRef = doc(db, 'kitabs', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      kitabData.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error('Kitab tidak ditemukan!');
    }
  } catch (error) {
    console.error('Error fetching kitab:', error);
  } finally {
    isLoading.value = false;
  }
});

const handleSubmit = async (formData: any) => {
  isSaving.value = true;
  try {
    const dataToUpdate = {
      ...formData,
      slug: generateSlug(formData.judul),
      harga: Number(formData.harga),
      updatedAt: new Date()
    };
    
    await updateDoc(doc(db, 'kitabs', id), dataToUpdate);
    
    // Redirect back to list
    router.push('/admin/kitab');
  } catch (error) {
    console.error('Error updating kitab:', error);
    alert('Terjadi kesalahan saat menyimpan perubahan.');
  } finally {
    isSaving.value = false;
  }
};
</script>
