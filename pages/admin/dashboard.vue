<template>
  <div class="space-y-6">
    <h1 class="font-display text-2xl text-brand-brown">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Stats Cards -->
      <div class="bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <p class="text-xs text-brand-muted uppercase tracking-widest font-medium mb-1">Total Pendaftar</p>
        <p class="text-3xl font-display text-brand-orange">
          <span v-if="isLoading">...</span>
          <span v-else>{{ stats.total }}</span>
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <p class="text-xs text-brand-muted uppercase tracking-widest font-medium mb-1">Menunggu Pembayaran</p>
        <p class="text-3xl font-display text-amber-600">
          <span v-if="isLoading">...</span>
          <span v-else>{{ stats.pending }}</span>
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <p class="text-xs text-brand-muted uppercase tracking-widest font-medium mb-1">Kitab Perlu Dikirim</p>
        <p class="text-3xl font-display text-blue-600">
          <span v-if="isLoading">...</span>
          <span v-else>{{ stats.toShip }}</span>
        </p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <div class="p-4 border-b border-brand-border bg-gray-50 flex justify-between items-center">
        <h2 class="font-medium text-brand-brown">Pendaftaran Terbaru</h2>
        <NuxtLink to="/admin/pendaftaran" class="text-xs text-brand-orange hover:underline font-medium">Lihat Semua</NuxtLink>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <tbody class="divide-y divide-brand-border">
            <tr v-if="isLoading">
              <td class="p-8 text-center text-brand-muted">Memuat data...</td>
            </tr>
            <tr v-else-if="recent.length === 0">
              <td class="p-8 text-center text-brand-muted">Belum ada data pendaftaran.</td>
            </tr>
            <tr v-for="item in recent" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4">
                <p class="font-medium text-brand-brown">{{ item.dataPeserta?.namaLengkap || 'Tanpa Nama' }}</p>
                <p class="text-xs text-brand-muted">{{ item.id }}</p>
              </td>
              <td class="p-4 text-brand-orange">Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}</td>
              <td class="p-4">
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
