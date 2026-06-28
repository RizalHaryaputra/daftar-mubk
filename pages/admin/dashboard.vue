<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Dashboard</h1>
        <p class="text-brand-muted mt-2">Ringkasan aktivitas sistem Ma'had Umar bin Khattab.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Stats Cards -->
      <div class="bg-white p-8 rounded-[30px] border border-brand-border/50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:border-brand-orange transition-all">
        <div class="absolute -right-6 -top-6 text-brand-orange/5 group-hover:text-brand-orange/10 transition-colors">
          <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
        </div>
        <p class="text-xs text-brand-muted uppercase tracking-widest font-bold mb-2 relative z-10">Total Pendaftar</p>
        <p class="text-5xl font-display text-brand-brown relative z-10">
          <span v-if="isLoading" class="animate-pulse opacity-50">...</span>
          <span v-else>{{ stats.total }}</span>
        </p>
      </div>
      
      <div class="bg-white p-8 rounded-[30px] border border-brand-border/50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:border-amber-500 transition-all">
        <div class="absolute -right-6 -top-6 text-amber-500/5 group-hover:text-amber-500/10 transition-colors">
          <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
        </div>
        <p class="text-xs text-brand-muted uppercase tracking-widest font-bold mb-2 relative z-10">Menunggu Pembayaran</p>
        <p class="text-5xl font-display text-amber-600 relative z-10">
          <span v-if="isLoading" class="animate-pulse opacity-50">...</span>
          <span v-else>{{ stats.pending }}</span>
        </p>
      </div>
      
      <div class="bg-white p-8 rounded-[30px] border border-brand-border/50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:border-brand-orange transition-all">
        <div class="absolute -right-6 -top-6 text-brand-orange/5 group-hover:text-brand-orange/10 transition-colors">
          <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path></svg>
        </div>
        <p class="text-xs text-brand-muted uppercase tracking-widest font-bold mb-2 relative z-10">Kitab Perlu Dikirim</p>
        <p class="text-5xl font-display text-brand-orange relative z-10">
          <span v-if="isLoading" class="animate-pulse opacity-50">...</span>
          <span v-else>{{ stats.toShip }}</span>
        </p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm overflow-hidden">
      <div class="p-6 md:p-8 border-b border-brand-border/50 flex justify-between items-center bg-gray-50/50">
        <h2 class="font-display text-xl text-brand-brown">Pendaftaran Terbaru</h2>
        <NuxtLink to="/admin/pendaftaran" class="text-xs bg-brand-cream text-brand-orange px-4 py-2 rounded-full hover:bg-brand-orange hover:text-white transition-colors font-bold tracking-wider uppercase">Lihat Semua</NuxtLink>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <tbody class="divide-y divide-brand-border/50">
            <tr v-if="isLoading">
              <td class="p-10 text-center text-brand-muted" colspan="3">
                <div class="animate-pulse flex flex-col items-center gap-2">
                  <div class="w-8 h-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin"></div>
                  <span>Memuat data...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="recent.length === 0">
              <td class="p-10 text-center text-brand-muted" colspan="3">Belum ada data pendaftaran.</td>
            </tr>
            <tr v-for="item in recent" :key="item.id" class="hover:bg-brand-cream/20 transition-colors">
              <td class="p-6">
                <p class="font-bold text-brand-brown text-base">{{ item.dataPeserta?.namaLengkap || 'Tanpa Nama' }}</p>
                <p class="text-xs text-brand-muted font-mono mt-1">{{ item.id }}</p>
              </td>
              <td class="p-6 text-brand-brown font-medium">Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}</td>
              <td class="p-6 text-right">
                <StatusBadge :status="item.statusPembayaran" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});

const { $db } = useNuxtApp();

const isLoading = ref(true);
const stats = ref({
  total: 0,
  pending: 0,
  toShip: 0
});
const recent = ref<any[]>([]);

const fetchDashboardData = async () => {
  try {
    // Note: In a real large-scale app, we should use aggregation queries (count()) 
    // to avoid downloading all documents. For simplicity here, we fetch all.
    const pendaftaranSnap = await getDocs(collection($db, 'pendaftaran'));
    
    let pendingCount = 0;
    let toShipCount = 0;
    
    pendaftaranSnap.forEach((doc) => {
      const data = doc.data();
      if (data.statusPembayaran === 'pending') pendingCount++;
      if (data.statusPembayaran === 'success' && data.statusPengiriman === 'belum_dikirim') toShipCount++;
    });

    stats.value = {
      total: pendaftaranSnap.size,
      pending: pendingCount,
      toShip: toShipCount
    };

    // Fetch top 5 recent
    const qRecent = query(collection($db, 'pendaftaran'), orderBy('createdAt', 'desc'), limit(5));
    const recentSnap = await getDocs(qRecent);
    recent.value = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>
