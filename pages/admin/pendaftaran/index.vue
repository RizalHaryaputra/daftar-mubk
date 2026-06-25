<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Pendaftaran</h1>
    </div>

    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 border-b border-brand-border text-brand-muted">
            <tr>
              <th class="p-4 font-medium">Invoice & Waktu</th>
              <th class="p-4 font-medium">Peserta</th>
              <th class="p-4 font-medium">Total</th>
              <th class="p-4 font-medium">Pembayaran</th>
              <th class="p-4 font-medium">Pengiriman</th>
              <th class="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-border">
            <tr v-for="item in pendaftaranList" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4">
                <p class="font-medium text-brand-brown">{{ item.id }}</p>
                <p class="text-xs text-brand-muted">{{ formatDate(item.createdAt) }}</p>
              </td>
              <td class="p-4">
                <p class="font-medium text-brand-brown">{{ item.dataPeserta?.namaLengkap || '-' }}</p>
                <p class="text-xs text-brand-muted">{{ item.dataPeserta?.noWa || '-' }}</p>
              </td>
              <td class="p-4 text-brand-orange">Rp {{ (item.rincianBiaya?.total || 0).toLocaleString('id-ID') }}</td>
              <td class="p-4">
                <StatusBadge :status="item.statusPembayaran" />
              </td>
              <td class="p-4">
                <span v-if="item.statusPengiriman === '-'" class="text-xs text-brand-muted">Tidak pesan kitab</span>
                <span v-else-if="item.statusPengiriman === 'dikirim'" class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Dikirim</span>
                <span v-else class="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Belum dikirim</span>
              </td>
              <td class="p-4 text-right">
                <button @click="openDetail(item)" class="text-brand-brown hover:text-brand-orange text-sm">Lihat Detail</button>
              </td>
            </tr>
            <tr v-if="pendaftaranList.length === 0">
              <td colspan="6" class="p-8 text-center text-brand-muted">Belum ada data pendaftaran.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Detail -->
    <div v-if="isModalOpen && selectedItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-display text-xl text-brand-brown">Detail Pendaftaran</h2>
          <button @click="closeDetail" class="text-brand-muted hover:text-brand-brown">Tutup</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <p class="text-xs text-brand-muted mb-1">Kode Invoice</p>
              <p class="font-medium">{{ selectedItem.id }}</p>
            </div>
            <div>
              <p class="text-xs text-brand-muted mb-1">Data Peserta</p>
              <p class="font-medium">{{ selectedItem.dataPeserta?.namaLengkap }}</p>
              <p class="text-sm">{{ selectedItem.dataPeserta?.email }}</p>
              <p class="text-sm">{{ selectedItem.dataPeserta?.noWa }}</p>
              <p class="text-sm capitalize">{{ selectedItem.dataPeserta?.jenisKelamin }}</p>
            </div>
            <div v-if="selectedItem.beliKitab">
              <p class="text-xs text-brand-muted mb-1">Alamat Pengiriman</p>
              <p class="text-sm whitespace-pre-wrap">{{ selectedItem.dataPeserta?.alamatPengiriman }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg border border-brand-border">
              <p class="text-sm font-medium mb-2 border-b border-brand-border pb-2">Rincian Biaya</p>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-brand-muted">Program</span>
                <span>Rp {{ (selectedItem.rincianBiaya?.program || 0).toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-brand-muted">Kitab</span>
                <span>Rp {{ (selectedItem.rincianBiaya?.kitab || 0).toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-brand-muted">Ongkir</span>
                <span>Rp {{ (selectedItem.rincianBiaya?.ongkir || 0).toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between font-medium pt-2 border-t border-brand-border text-brand-orange">
                <span>Total</span>
                <span>Rp {{ (selectedItem.rincianBiaya?.total || 0).toLocaleString('id-ID') }}</span>
              </div>
            </div>

            <!-- Update Status Actions -->
            <div class="space-y-3 pt-4 border-t border-brand-border">
              <div class="flex items-center justify-between">
                <span class="text-sm text-brand-muted">Ubah Status Pembayaran</span>
                <select v-model="selectedItem.statusPembayaran" @change="updateStatus('statusPembayaran', selectedItem.statusPembayaran)" class="text-sm border rounded p-1">
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="expire">Expire</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div v-if="selectedItem.beliKitab" class="flex items-center justify-between">
                <span class="text-sm text-brand-muted">Ubah Status Pengiriman</span>
                <select v-model="selectedItem.statusPengiriman" @change="updateStatus('statusPengiriman', selectedItem.statusPengiriman)" class="text-sm border rounded p-1">
                  <option value="belum_dikirim">Belum Dikirim</option>
                  <option value="dikirim">Dikirim</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});

const { $db } = useNuxtApp();
const pendaftaranList = ref<any[]>([]);
const isModalOpen = ref(false);
const selectedItem = ref<any>(null);

const fetchPendaftaran = async () => {
  const q = query(collection($db, 'pendaftaran'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  pendaftaranList.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

onMounted(() => {
  fetchPendaftaran();
});

const formatDate = (timestamp: any) => {
  if (!timestamp) return '-';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

const openDetail = (item: any) => {
  selectedItem.value = JSON.parse(JSON.stringify(item)); // clone
  isModalOpen.value = true;
};

const closeDetail = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
  fetchPendaftaran(); // refresh
};

const updateStatus = async (field: string, value: string) => {
  try {
    const docRef = doc($db, 'pendaftaran', selectedItem.value.id);
    await updateDoc(docRef, {
      [field]: value,
      updatedAt: new Date()
    });
    alert(`Status berhasil diubah menjadi ${value}`);
  } catch (error) {
    console.error('Failed to update status', error);
    alert('Gagal mengubah status');
  }
};
</script>
