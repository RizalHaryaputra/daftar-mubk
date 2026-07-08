<template>
  <div class="space-y-8">
    <div>
      <NuxtLink to="/admin/program" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-orange transition-colors mb-4">
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
import { useToast } from '~/composables/useToast';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const router = useRouter();
const { showToast } = useToast();

const isSaving = ref(false);

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    const kitabWajibIds = formData.kitabWajibIdsStr
      ? formData.kitabWajibIdsStr.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const baseText = formData.periode ? `${formData.nama} ${formData.periode}` : formData.nama;
    const slug = generateSlug(baseText);

    const data: any = {
      nama: formData.nama,
      slug: slug,
      deskripsi: formData.deskripsi,
      deskripsiSingkat: formData.deskripsiSingkat,
      jadwal: formData.jadwal,
      durasi: formData.durasi,
      harga: Number(formData.harga),
      paketHarga: formData.paketHarga,
      periode: formData.periode || '',
      status: formData.status,
      gambarUrl: formData.gambarUrl || null,
      linkGrupWa: formData.linkGrupWa || null,
      linkGrupWaLaki: formData.linkGrupWaLaki || null,
      linkGrupWaPerempuan: formData.linkGrupWaPerempuan || null,
      wajibBeliKitab: formData.wajibBeliKitab,
      kitabWajibIds,
      targetGender: formData.targetGender,
      modeBelajar: formData.modeBelajar,
      updatedAt: new Date()
    };

    if (formData.tanggalMulaiStr) data.tanggalMulai = Timestamp.fromDate(new Date(formData.tanggalMulaiStr));
    if (formData.tanggalAkhirStr) data.tanggalAkhir = Timestamp.fromDate(new Date(formData.tanggalAkhirStr));
    if (formData.deadlineDaftarStr) data.deadlineDaftar = Timestamp.fromDate(new Date(formData.deadlineDaftarStr));

    await addDoc(collection(db, 'programs'), { ...data, createdAt: new Date() });
    
    showToast('Program berhasil ditambahkan!', 'success');
    router.push('/admin/program');
  } catch (error) {
    console.error('Error adding program', error);
    showToast('Gagal menambahkan program. Silakan coba lagi.', 'error');
  } finally {
    isSaving.value = false;
  }
};
</script>
