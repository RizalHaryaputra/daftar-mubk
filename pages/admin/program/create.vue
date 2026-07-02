<template>
  <div class="space-y-8">
    <div>
      <NuxtLink to="/admin/program" class="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-orange transition-colors mb-4">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali ke Daftar Program
      </NuxtLink>
      <h1 class="font-display text-4xl text-brand-brown tracking-tight">Tambah Program Baru</h1>
      <p class="text-brand-muted mt-2">Buat program belajar baru untuk ditampilkan di halaman publik.</p>
    </div>

    <FormProgram :is-saving="isSaving" @submit="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';
import { useRouter } from 'vue-router';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const router = useRouter();

const isSaving = ref(false);

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    const kitabWajibIds = formData.kitabWajibIdsStr
      ? formData.kitabWajibIdsStr.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const data: any = {
      nama: formData.nama,
      deskripsi: formData.deskripsi,
      jadwal: formData.jadwal,
      durasi: formData.durasi,
      harga: Number(formData.harga),
      status: formData.status,
      gambarUrl: formData.gambarUrl || null,
      wajibBeliKitab: formData.wajibBeliKitab,
      kitabWajibIds,
      updatedAt: new Date()
    };

    if (formData.tanggalMulaiStr) data.tanggalMulai = Timestamp.fromDate(new Date(formData.tanggalMulaiStr));
    if (formData.deadlineDaftarStr) data.deadlineDaftar = Timestamp.fromDate(new Date(formData.deadlineDaftarStr));

    await addDoc(collection(db, 'programs'), { ...data, createdAt: new Date() });
    
    router.push('/admin/program');
  } catch (error) {
    console.error('Error saving program:', error);
    alert('Terjadi kesalahan saat menyimpan data.');
  } finally {
    isSaving.value = false;
  }
};
</script>
