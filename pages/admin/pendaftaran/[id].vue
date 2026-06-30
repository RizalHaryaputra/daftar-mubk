<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div>
      <NuxtLink to="/admin/pendaftaran" class="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-orange transition-colors mb-4">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali ke Daftar Pendaftaran
      </NuxtLink>
      <h1 class="font-display text-3xl text-brand-brown">Detail Pendaftaran</h1>
      <p class="text-brand-muted mt-2">Kelola informasi peserta, tagihan, dan status pengiriman untuk invoice <span class="font-bold text-brand-brown uppercase">#{{ id }}</span></p>
    </div>

    <div v-if="isLoading" class="bg-white p-10 rounded-[30px] border border-brand-border/50 text-center">
      <div class="w-10 h-10 rounded-full border-4 border-brand-cream border-t-brand-orange animate-spin mx-auto mb-4"></div>
      <p class="text-brand-muted animate-pulse">Memuat data pendaftaran...</p>
    </div>
    
    <div v-else-if="!item" class="bg-white p-10 rounded-[30px] border border-brand-border/50 text-center">
      <p class="text-red-500 font-medium">Data pendaftaran tidak ditemukan!</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Kolom Kiri: Data Peserta & Alamat -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Card Data Peserta -->
        <div class="bg-white rounded-[30px] border border-brand-border/50 p-8 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-brand-cream/30 rounded-bl-full -z-10"></div>
          <h2 class="font-display text-xl text-brand-brown mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Informasi Peserta
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Nama Lengkap</p>
              <p class="font-medium text-brand-brown text-lg">{{ item.dataPeserta?.namaLengkap || '-' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Jenis Kelamin</p>
              <p class="font-medium text-brand-brown capitalize">{{ item.dataPeserta?.jenisKelamin || '-' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Nomor WhatsApp</p>
              <p class="font-medium text-brand-brown">
                <a :href="`https://wa.me/${item.dataPeserta?.noWa?.replace(/^0/, '62')}`" target="_blank" class="text-brand-orange hover:underline flex items-center gap-1">
                  {{ item.dataPeserta?.noWa || '-' }}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </p>
            </div>
            <div>
              <p class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Email</p>
              <p class="font-medium text-brand-brown">{{ item.dataPeserta?.email || '-' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Program yang Diikuti</p>
              <p class="font-medium text-brand-brown">{{ item.dataProgram?.nama || 'Nama Program Tidak Tersedia' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Tanggal Daftar</p>
              <p class="font-medium text-brand-brown">{{ formatDate(item.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Card Alamat Pengiriman (Hanya jika beli kitab) -->
        <div v-if="item.beliKitab" class="bg-white rounded-[30px] border border-brand-border/50 p-8 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-brand-cream/30 rounded-bl-full -z-10"></div>
          <h2 class="font-display text-xl text-brand-brown mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Alamat Pengiriman Kitab
          </h2>
          <div class="bg-brand-cream/10 p-5 rounded-[20px] border border-brand-border/50">
            <p class="text-brand-brown font-medium leading-relaxed whitespace-pre-wrap">{{ item.dataPeserta?.alamatPengiriman || '-' }}</p>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Tagihan & Status -->
      <div class="space-y-6">
        
        <!-- Card Rincian Tagihan -->
        <div class="bg-brand-brown text-white rounded-[30px] p-8 shadow-xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10"></div>
          <h2 class="font-display text-xl mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
            Rincian Tagihan
          </h2>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between items-center text-white/80 text-sm">
              <span>Biaya Program</span>
              <span class="font-medium">Rp {{ (item.rincianBiaya?.program || 0).toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center text-white/80 text-sm">
              <span>Pembelian Kitab</span>
              <span class="font-medium">Rp {{ (item.rincianBiaya?.kitab || 0).toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center text-white/80 text-sm">
              <span>Ongkos Kirim</span>
              <span class="font-medium">Rp {{ (item.rincianBiaya?.ongkir || 0).toLocaleString('id-ID') }}</span>
            </div>
          </div>
          
          <div class="pt-4 border-t border-white/20 flex justify-between items-center">
            <span class="font-bold text-sm tracking-widest uppercase">Total Tagihan</span>
            <span class="font-bold text-2xl text-brand-orange">Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <!-- Card Manajemen Status -->
        <div class="bg-white rounded-[30px] border border-brand-border/50 p-8 shadow-sm">
          <h2 class="font-display text-xl text-brand-brown mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Manajemen Status
          </h2>

          <div class="space-y-6">
            <!-- Status Pembayaran -->
            <div>
              <label class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2 block">Status Pembayaran</label>
              <div class="relative">
                <select 
                  v-model="item.statusPembayaran" 
                  @change="updateStatus('statusPembayaran', item.statusPembayaran)"
                  class="w-full px-5 py-4 text-sm rounded-[20px] border-2 border-brand-border/50 bg-brand-cream/10 focus:outline-none focus:border-brand-orange transition-all text-brand-brown font-bold appearance-none cursor-pointer uppercase tracking-wider"
                >
                  <option value="pending">PENDING (Menunggu)</option>
                  <option value="success">SUCCESS (Lunas)</option>
                  <option value="expire">EXPIRE (Kedaluwarsa)</option>
                  <option value="failed">FAILED (Gagal)</option>
                </select>
                <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <!-- Status Pengiriman -->
            <div v-if="item.beliKitab">
              <label class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2 block">Status Pengiriman Kitab</label>
              <div class="relative">
                <select 
                  v-model="item.statusPengiriman" 
                  @change="updateStatus('statusPengiriman', item.statusPengiriman)"
                  class="w-full px-5 py-4 text-sm rounded-[20px] border-2 border-brand-border/50 bg-brand-cream/10 focus:outline-none focus:border-brand-orange transition-all text-brand-brown font-bold appearance-none cursor-pointer uppercase tracking-wider"
                >
                  <option value="belum_dikirim">BELUM DIKIRIM</option>
                  <option value="dikirim">SUDAH DIKIRIM</option>
                </select>
                <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            
            <div v-if="isUpdating" class="text-sm font-bold text-brand-orange animate-pulse flex items-center gap-2">
              <div class="w-4 h-4 rounded-full border-2 border-brand-orange border-t-transparent animate-spin"></div>
              Menyimpan perubahan...
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const route = useRoute();
const { $db } = useNuxtApp();
const db = $db as Firestore;

const id = route.params.id as string;
const isLoading = ref(true);
const isUpdating = ref(false);
const item = ref<any>(null);

onMounted(async () => {
  try {
    const docRef = doc(db, 'pendaftaran', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      item.value = { id: snap.id, ...snap.data() };
    }
  } catch (error) {
    console.error('Error fetching pendaftaran:', error);
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (timestamp: any) => {
  if (!timestamp) return '-';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(date);
};

const updateStatus = async (field: string, value: string) => {
  isUpdating.value = true;
  try {
    const docRef = doc(db, 'pendaftaran', item.value.id);
    await updateDoc(docRef, {
      [field]: value,
      updatedAt: new Date()
    });
    // Menampilkan toast atau indikator visual sementara (bisa juga pakai alert)
  } catch (error) {
    console.error('Failed to update status', error);
    alert('Gagal mengubah status');
  } finally {
    setTimeout(() => {
      isUpdating.value = false;
    }, 1000);
  }
};
</script>
