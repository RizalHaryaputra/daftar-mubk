<template>
  <div class="space-y-8">
    <div>
      <NuxtLink to="/admin/program" class="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-orange transition-colors mb-4">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali ke Daftar Program
      </NuxtLink>
      <h1 class="font-display text-4xl text-brand-brown tracking-tight">Edit Program</h1>
      <p class="text-brand-muted mt-2">Perbarui data program belajar.</p>
    </div>

    <div v-if="isLoading" class="bg-white p-10 rounded-[30px] border border-brand-border/50 text-center shadow-sm">
      <div class="animate-pulse flex flex-col items-center gap-3">
        <div class="w-10 h-10 rounded-full border-2 border-brand-orange border-t-transparent animate-spin"></div>
        <span class="text-brand-muted font-medium">Memuat data program...</span>
      </div>
    </div>
    
    <FormProgram v-else :initial-data="programData" :is-saving="isSaving" @submit="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const route = useRoute();
const router = useRouter();

const programId = route.params.id as string;
const isLoading = ref(true);
const isSaving = ref(false);
const programData = ref<any>(null);

const fetchProgram = async () => {
  try {
    const docRef = doc(db, 'programs', programId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      programData.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      alert('Program tidak ditemukan');
      router.push('/admin/program');
    }
  } catch (error) {
    console.error('Error fetching program', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProgram();
});

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

    await updateDoc(doc(db, 'programs', programId), data);
    
    router.push('/admin/program');
  } catch (error) {
    console.error('Error updating program:', error);
    alert('Terjadi kesalahan saat menyimpan data.');
  } finally {
    isSaving.value = false;
  }
};
</script>
