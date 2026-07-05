<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <NuxtLink to="/admin/kitab" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-orange transition-colors mb-4">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali ke Daftar Kitab
      </NuxtLink>
      <h1 class="font-display text-4xl text-brand-brown tracking-tight">Tambah Kitab Baru</h1>
      <p class="text-brand-muted mt-2">Lengkapi form di bawah ini untuk menambahkan kitab baru ke sistem.</p>
    </div>

    <FormKitab :is-saving="isSaving" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';
import { useToast } from '~/composables/useToast';

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});

const router = useRouter();
const { $db } = useNuxtApp();
const db = $db as Firestore;
const { showToast } = useToast();

const isSaving = ref(false);

const handleSubmit = async (formData: any) => {
  isSaving.value = true;
  try {
    const dataToSave = {
      ...formData,
      slug: generateSlug(formData.judul),
      harga: Number(formData.harga),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await addDoc(collection(db, 'kitabs'), dataToSave);
    
    // Redirect back to list
    showToast('Kitab berhasil ditambahkan!', 'success');
    router.push('/admin/kitab');
  } catch (error) {
    console.error('Error adding kitab', error);
    showToast('Gagal menambahkan kitab.', 'error');
  } finally {
    isSaving.value = false;
  }
};
</script>
