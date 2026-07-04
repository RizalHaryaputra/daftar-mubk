<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl text-brand-brown tracking-tight">Dashboard</h1>
        <p class="text-brand-muted mt-2">Ringkasan aktivitas dan metrik pendaftaran Ma'had Umar bin Khattab.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Pendaftar -->
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
      
      <!-- Menunggu Pembayaran -->
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
      
      <!-- Kitab Perlu Dikirim -->
      <div class="bg-brand-brown text-white p-8 rounded-[30px] border border-brand-brown shadow-lg relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all">
        <div class="absolute -right-6 -top-6 text-white/5 group-hover:text-white/10 transition-colors">
          <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path></svg>
        </div>
        <p class="text-xs text-white/70 uppercase tracking-widest font-bold mb-2 relative z-10">Kitab Perlu Dikirim</p>
        <p class="text-5xl font-display text-brand-orange relative z-10">
          <span v-if="isLoading" class="animate-pulse opacity-50">...</span>
          <span v-else>{{ stats.toShip }}</span>
        </p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Line Chart: Tren Pendaftaran -->
      <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm p-8 lg:col-span-2">
        <h2 class="font-display text-xl text-brand-brown mb-6 flex items-center gap-2">
          <svg class="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          Tren Pendaftaran (30 Hari Terakhir)
        </h2>
        <div class="h-[300px] w-full flex items-center justify-center bg-gray-50/50 rounded-2xl relative">
          <div v-if="isLoading" class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin mb-2"></div>
            <span class="text-xs font-bold text-brand-muted uppercase tracking-widest animate-pulse">Menghitung data...</span>
          </div>
          <ClientOnly v-else>
            <Line :data="lineChartData" :options="lineChartOptions" />
          </ClientOnly>
        </div>
      </div>

      <!-- Doughnut Chart: Distribusi Program -->
      <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm p-8">
        <h2 class="font-display text-xl text-brand-brown mb-6 flex items-center gap-2">
          <svg class="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
          Distribusi Program
        </h2>
        <div class="h-[300px] w-full flex items-center justify-center bg-gray-50/50 rounded-2xl relative">
          <div v-if="isLoading" class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin mb-2"></div>
            <span class="text-xs font-bold text-brand-muted uppercase tracking-widest animate-pulse">Menghitung data...</span>
          </div>
          <div v-else-if="doughnutChartData.datasets[0].data.length === 0" class="text-brand-muted text-sm text-center">
            Belum ada data pendaftar.
          </div>
          <ClientOnly v-else>
            <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
          </ClientOnly>
        </div>
      </div>

    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-[30px] border border-brand-border/50 shadow-sm overflow-hidden">
      <div class="p-6 md:p-8 border-b border-brand-border/50 flex justify-between items-center bg-gray-50/50">
        <h2 class="font-display text-xl text-brand-brown">Pendaftaran Terbaru</h2>
        <NuxtLink to="/admin/pendaftaran" class="text-xs bg-brand-cream text-brand-orange px-5 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-colors font-bold tracking-wider uppercase">Lihat Semua</NuxtLink>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50/50 border-b border-brand-border/50 text-brand-muted font-bold tracking-widest uppercase text-xs">
            <tr>
              <th class="p-6">Invoice</th>
              <th class="p-6">Peserta</th>
              <th class="p-6">Total Biaya</th>
              <th class="p-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-border/50">
            <tr v-if="isLoading">
              <td class="p-16 text-center text-brand-muted" colspan="4">
                <div class="animate-pulse flex flex-col items-center gap-2">
                  <div class="w-8 h-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin"></div>
                  <span class="font-bold tracking-widest uppercase text-xs">Memuat data...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="recent.length === 0">
              <td class="p-16 text-center text-brand-muted" colspan="4">Belum ada transaksi masuk.</td>
            </tr>
            <tr v-for="item in recent" :key="item.id" class="hover:bg-brand-cream/20 transition-colors">
              <td class="p-6">
                <p class="text-sm font-bold text-brand-brown uppercase">#{{ item.id }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ formatDate(item.createdAt) }}</p>
              </td>
              <td class="p-6">
                <p class="font-bold text-brand-brown text-base">{{ item.dataPeserta?.namaLengkap || 'Tanpa Nama' }}</p>
                <p class="text-xs text-brand-muted mt-1">{{ item.programNama || item.dataProgram?.nama || 'Program tidak diketahui' }}</p>
              </td>
              <td class="p-6 font-bold text-brand-orange">Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}</td>
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
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

// Import Chart.js components
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;

const isLoading = ref(true);
const stats = ref({ total: 0, pending: 0, toShip: 0 });
const recent = ref<any[]>([]);

// Chart States
const lineChartData = ref<any>({
  labels: [],
  datasets: [{
    label: 'Pendaftaran',
    data: [],
    borderColor: '#c68436', // brand-orange
    backgroundColor: 'rgba(198, 132, 54, 0.1)',
    tension: 0.4,
    fill: true,
  }]
});

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0 }
    }
  }
};

const doughnutChartData = ref<any>({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: ['#c68436', '#493626', '#e0b279', '#8c5a24', '#f5ebd9'],
    borderWidth: 0
  }]
});

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { boxWidth: 12, padding: 20, font: { family: "'Inter', sans-serif" } }
    }
  }
};


const fetchDashboardData = async () => {
  try {
    const pendaftaranSnap = await getDocs(collection(db, 'pendaftaran'));
    
    let pendingCount = 0;
    let toShipCount = 0;
    
    // Arrays for processing charts
    const dateCounts: Record<string, number> = {};
    const programCounts: Record<string, number> = {};
    
    // Get last 30 days dates
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().substring(0, 10); // YYYY-MM-DD
      dateCounts[dateStr] = 0;
    }

    pendaftaranSnap.forEach((doc) => {
      const data = doc.data();
      
      // Filter out standalone book purchases (Pembelian Kitab)
      if (data.programId === null) return;
      
      // Basic Stats
      if (data.statusPembayaran === 'pending') pendingCount++;
      if (data.statusPembayaran === 'success' && data.statusPengiriman === 'belum_dikirim') toShipCount++;
      
      // Date Processing (Line Chart)
      if (data.createdAt) {
        const d = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
        const dateStr = d.toISOString().substring(0, 10);
        if (dateCounts[dateStr] !== undefined) {
          dateCounts[dateStr]++;
        }
      }
      
      // Program Processing (Doughnut Chart)
      const pName = data.programNama || data.dataProgram?.nama;
      if (pName) {
        programCounts[pName] = (programCounts[pName] || 0) + 1;
      }
    });

    stats.value = {
      total: pendaftaranSnap.docs.filter(d => d.data().programId !== null).length,
      pending: pendingCount,
      toShip: toShipCount
    };

    // Construct Line Chart Data
    lineChartData.value = {
      labels: Object.keys(dateCounts).map(d => {
        const [, month, day] = d.split('-');
        return `${day}/${month}`;
      }),
      datasets: [{
        label: 'Pendaftaran',
        data: Object.values(dateCounts),
        borderColor: '#c68436',
        backgroundColor: 'rgba(198, 132, 54, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    };

    // Construct Doughnut Chart Data
    doughnutChartData.value = {
      labels: Object.keys(programCounts),
      datasets: [{
        data: Object.values(programCounts),
        backgroundColor: ['#c68436', '#493626', '#e0b279', '#8c5a24', '#f5ebd9', '#333333'],
        borderWidth: 0
      }]
    };

    // Fetch top 5 recent (filtered from already loaded data)
    const allProgramRegs = pendaftaranSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((doc: any) => doc.programId !== null);
      
    allProgramRegs.sort((a: any, b: any) => {
      const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
      const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });
    
    recent.value = allProgramRegs.slice(0, 5);

  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});

const formatDate = (timestamp: any) => {
  if (!timestamp) return '-';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};
</script>
