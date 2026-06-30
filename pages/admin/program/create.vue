<template>
  <div class="space-y-8">
    <div>
      <div class="flex items-center gap-2 text-brand-muted text-sm mb-2 font-medium">
        <NuxtLink to="/admin/program" class="hover:text-brand-orange transition-colors">Program</NuxtLink>
        <span>/</span>
        <span class="text-brand-brown">Tambah Baru</span>
      </div>
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
