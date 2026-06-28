<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Program</h1>
      <AppButton variant="primary" @click="openModal()">+ Tambah Program</AppButton>
    </div>

    <!-- Tabel -->
    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-brand-muted animate-pulse">Memuat data...</div>
      <div v-else-if="programs.length === 0" class="p-8 text-center text-brand-muted">Belum ada data program. Tambahkan program pertama Anda!</div>
      <table v-else class="w-full text-left text-sm">
        <thead class="bg-gray-50 border-b border-brand-border text-brand-muted">
          <tr>
            <th class="p-4 font-medium">Nama Program</th>
            <th class="p-4 font-medium">Jadwal</th>
            <th class="p-4 font-medium">Harga</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border">
          <tr v-for="item in programs" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4">
              <p class="font-medium text-brand-brown">{{ item.nama }}</p>
              <p class="text-xs text-brand-muted">{{ item.durasi }}</p>
            </td>
            <td class="p-4 text-brand-muted text-xs">{{ item.jadwal }}</td>
            <td class="p-4 text-brand-orange font-medium">Rp {{ item.harga?.toLocaleString('id-ID') }}</td>
            <td class="p-4">
              <span :class="item.status === 'aktif' ? 'text-green-700 bg-green-100' : 'text-gray-500 bg-gray-100'" class="text-xs font-medium px-2 py-1 rounded-full">
                {{ item.status }}
              </span>
            </td>
            <td class="p-4 text-right space-x-3">
              <button @click="openModal(item)" class="text-sm text-brand-brown hover:text-brand-orange">Edit</button>
              <button @click="deleteProgram(item.id)" class="text-sm text-red-500 hover:text-red-700">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
      <div class="bg-white rounded-xl w-full max-w-2xl p-6 space-y-5 my-8">
        <div class="flex justify-between items-center">
          <h2 class="font-display text-xl text-brand-brown">{{ isEditing ? 'Edit' : 'Tambah' }} Program</h2>
          <button @click="closeModal" class="text-brand-muted hover:text-brand-brown text-lg">✕</button>
        </div>

        <form @submit.prevent="saveProgram" class="space-y-4">
          <!-- Nama -->
          <div class="flex flex-col gap-1.5">
            <label class="label">Nama Program <span class="text-brand-orange">*</span></label>
            <input v-model="form.nama" required class="input-field" placeholder="Nahwu Dasar Intensif" />
          </div>

          <!-- Deskripsi -->
          <div class="flex flex-col gap-1.5">
            <label class="label">Deskripsi <span class="text-brand-orange">*</span></label>
            <textarea v-model="form.deskripsi" required rows="3" class="input-field resize-none" placeholder="Deskripsi singkat program..."></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Jadwal -->
            <div class="flex flex-col gap-1.5">
              <label class="label">Jadwal <span class="text-brand-orange">*</span></label>
              <input v-model="form.jadwal" required class="input-field" placeholder="Senin & Rabu, 19.30-21.00 WIB" />
            </div>
            <!-- Durasi -->
            <div class="flex flex-col gap-1.5">
              <label class="label">Durasi <span class="text-brand-orange">*</span></label>
              <input v-model="form.durasi" required class="input-field" placeholder="3 bulan" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Harga -->
            <div class="flex flex-col gap-1.5">
              <label class="label">Harga (Rp) <span class="text-brand-orange">*</span></label>
              <input type="number" v-model="form.harga" required class="input-field" />
            </div>
            <!-- Status -->
            <div class="flex flex-col gap-1.5">
              <label class="label">Status <span class="text-brand-orange">*</span></label>
              <select v-model="form.status" required class="input-field">
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Tanggal Mulai -->
            <div class="flex flex-col gap-1.5">
              <label class="label">Tanggal Mulai</label>
              <input type="date" v-model="form.tanggalMulaiStr" class="input-field" />
            </div>
            <!-- Deadline Daftar -->
            <div class="flex flex-col gap-1.5">
              <label class="label">Deadline Pendaftaran</label>
              <input type="date" v-model="form.deadlineDaftarStr" class="input-field" />
            </div>
          </div>

          <!-- Gambar URL -->
          <div class="flex flex-col gap-1.5">
            <label class="label">URL Gambar (Cloudinary)</label>
            <input v-model="form.gambarUrl" class="input-field" placeholder="https://res.cloudinary.com/..." />
          </div>

          <!-- Wajib Beli Kitab -->
          <div class="p-4 border border-brand-border rounded-lg space-y-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="form.wajibBeliKitab" class="rounded text-brand-orange focus:ring-brand-orange" />
              <span class="text-sm font-medium text-brand-brown">Program ini mewajibkan pembelian kitab</span>
            </label>
            <div v-if="form.wajibBeliKitab" class="flex flex-col gap-1.5">
              <label class="label">ID Kitab Wajib (pisahkan dengan koma)</label>
              <input v-model="form.kitabWajibIdsStr" class="input-field" placeholder="kitabId1, kitabId2" />
              <p class="text-xs text-brand-muted">Masukkan ID dokumen kitab dari koleksi <code>kitabs</code>.</p>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-4 border-t border-brand-border">
            <AppButton type="button" variant="ghost" @click="closeModal">Batal</AppButton>
            <AppButton type="submit" variant="primary" :disabled="isSaving">
              {{ isSaving ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Program') }}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp, orderBy, query } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const programs = ref<any[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref('');

const defaultForm = () => ({
  nama: '', deskripsi: '', jadwal: '', durasi: '',
  harga: 0, status: 'aktif', gambarUrl: '',
  tanggalMulaiStr: '', deadlineDaftarStr: '',
  wajibBeliKitab: false, kitabWajibIdsStr: ''
});

const form = ref(defaultForm());

const fetchPrograms = async () => {
  isLoading.value = true;
  const q = query(collection(db, 'programs'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  programs.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  isLoading.value = false;
};

onMounted(fetchPrograms);

const openModal = (item?: any) => {
  if (item) {
    isEditing.value = true;
    currentId.value = item.id;
    form.value = {
      nama: item.nama ?? '',
      deskripsi: item.deskripsi ?? '',
      jadwal: item.jadwal ?? '',
      durasi: item.durasi ?? '',
      harga: item.harga ?? 0,
      status: item.status ?? 'aktif',
      gambarUrl: item.gambarUrl ?? '',
      tanggalMulaiStr: item.tanggalMulai?.toDate?.()?.toISOString().split('T')[0] ?? '',
      deadlineDaftarStr: item.deadlineDaftar?.toDate?.()?.toISOString().split('T')[0] ?? '',
      wajibBeliKitab: item.wajibBeliKitab ?? false,
      kitabWajibIdsStr: (item.kitabWajibIds ?? []).join(', ')
    };
  } else {
    isEditing.value = false;
    currentId.value = '';
    form.value = defaultForm();
  }
  isModalOpen.value = true;
};

const closeModal = () => { isModalOpen.value = false; };

const saveProgram = async () => {
  isSaving.value = true;
  try {
    const kitabWajibIds = form.value.kitabWajibIdsStr
      ? form.value.kitabWajibIdsStr.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const data: any = {
      nama: form.value.nama,
      deskripsi: form.value.deskripsi,
      jadwal: form.value.jadwal,
      durasi: form.value.durasi,
      harga: Number(form.value.harga),
      status: form.value.status,
      gambarUrl: form.value.gambarUrl || null,
      wajibBeliKitab: form.value.wajibBeliKitab,
      kitabWajibIds,
      updatedAt: new Date()
    };

    if (form.value.tanggalMulaiStr) data.tanggalMulai = Timestamp.fromDate(new Date(form.value.tanggalMulaiStr));
    if (form.value.deadlineDaftarStr) data.deadlineDaftar = Timestamp.fromDate(new Date(form.value.deadlineDaftarStr));

    if (isEditing.value) {
      await updateDoc(doc(db, 'programs', currentId.value), data);
    } else {
      await addDoc(collection(db, 'programs'), { ...data, createdAt: new Date() });
    }
    closeModal();
    fetchPrograms();
  } finally {
    isSaving.value = false;
  }
};

const deleteProgram = async (id: string) => {
  if (confirm('Yakin ingin menghapus program ini?')) {
    await deleteDoc(doc(db, 'programs', id));
    fetchPrograms();
  }
};
</script>

<style scoped>
.input-field { @apply px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange w-full transition-colors; }
.label { @apply text-sm font-medium text-brand-brown; }
</style>
