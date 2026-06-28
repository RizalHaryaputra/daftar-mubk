<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Kitab</h1>
      <AppButton variant="primary" @click="openModal()">+ Tambah Kitab</AppButton>
    </div>

    <!-- Tabel -->
    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-brand-muted animate-pulse">Memuat data...</div>
      <div v-else-if="kitabs.length === 0" class="p-8 text-center text-brand-muted">Belum ada data kitab.</div>
      <table v-else class="w-full text-left text-sm">
        <thead class="bg-gray-50 border-b border-brand-border text-brand-muted">
          <tr>
            <th class="p-4 font-medium">Judul Kitab</th>
            <th class="p-4 font-medium">Penulis</th>
            <th class="p-4 font-medium">Harga</th>
            <th class="p-4 font-medium">Standalone</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border">
          <tr v-for="item in kitabs" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4">
              <p class="font-medium text-brand-brown">{{ item.judul }}</p>
              <p class="text-xs text-brand-muted">{{ item.kategori }}</p>
            </td>
            <td class="p-4 text-brand-muted">{{ item.penulis }}</td>
            <td class="p-4 text-brand-orange font-medium">Rp {{ item.harga?.toLocaleString('id-ID') }}</td>
            <td class="p-4">
              <span :class="item.bisaStandalone ? 'text-blue-700 bg-blue-100' : 'text-gray-500 bg-gray-100'" class="text-xs font-medium px-2 py-1 rounded-full">
                {{ item.bisaStandalone ? 'Ya' : 'Tidak' }}
              </span>
            </td>
            <td class="p-4">
              <span :class="item.status === 'aktif' ? 'text-green-700 bg-green-100' : 'text-gray-500 bg-gray-100'" class="text-xs font-medium px-2 py-1 rounded-full">
                {{ item.status }}
              </span>
            </td>
            <td class="p-4 text-right space-x-3">
              <button @click="openModal(item)" class="text-sm text-brand-brown hover:text-brand-orange">Edit</button>
              <button @click="deleteKitab(item.id)" class="text-sm text-red-500 hover:text-red-700">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
      <div class="bg-white rounded-xl w-full max-w-xl p-6 space-y-5 my-8">
        <div class="flex justify-between items-center">
          <h2 class="font-display text-xl text-brand-brown">{{ isEditing ? 'Edit' : 'Tambah' }} Kitab</h2>
          <button @click="closeModal" class="text-brand-muted hover:text-brand-brown text-lg">✕</button>
        </div>

        <form @submit.prevent="saveKitab" class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="label">Judul Kitab <span class="text-brand-orange">*</span></label>
            <input v-model="form.judul" required class="input-field" placeholder="Al-Ajurrumiyyah" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="label">Penulis <span class="text-brand-orange">*</span></label>
              <input v-model="form.penulis" required class="input-field" placeholder="Ibnu Ajurrum" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="label">Kategori</label>
              <input v-model="form.kategori" class="input-field" placeholder="Nahwu, Sharaf, dll." />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="label">Deskripsi <span class="text-brand-orange">*</span></label>
            <textarea v-model="form.deskripsi" required rows="3" class="input-field resize-none" placeholder="Deskripsi singkat kitab..."></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="label">Harga (Rp) <span class="text-brand-orange">*</span></label>
              <input type="number" v-model="form.harga" required class="input-field" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="label">Status <span class="text-brand-orange">*</span></label>
              <select v-model="form.status" required class="input-field">
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="label">URL Gambar (Cloudinary)</label>
            <input v-model="form.gambarUrl" class="input-field" placeholder="https://res.cloudinary.com/..." />
          </div>

          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.bisaStandalone" class="rounded text-brand-orange focus:ring-brand-orange" />
            <span class="text-sm font-medium text-brand-brown">Bisa dibeli tanpa daftar program (standalone)</span>
          </label>

          <div class="flex justify-end gap-2 pt-4 border-t border-brand-border">
            <AppButton type="button" variant="ghost" @click="closeModal">Batal</AppButton>
            <AppButton type="submit" variant="primary" :disabled="isSaving">
              {{ isSaving ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Kitab') }}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] });

const { $db } = useNuxtApp();
const db = $db as Firestore;
const kitabs = ref<any[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref('');

const defaultForm = () => ({
  judul: '', penulis: '', kategori: '', deskripsi: '',
  harga: 0, status: 'aktif', gambarUrl: '', bisaStandalone: true
});
const form = ref(defaultForm());

const fetchKitabs = async () => {
  isLoading.value = true;
  const q = query(collection(db, 'kitabs'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  kitabs.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  isLoading.value = false;
};

onMounted(fetchKitabs);

const openModal = (item?: any) => {
  if (item) {
    isEditing.value = true;
    currentId.value = item.id;
    form.value = {
      judul: item.judul ?? '', penulis: item.penulis ?? '',
      kategori: item.kategori ?? '', deskripsi: item.deskripsi ?? '',
      harga: item.harga ?? 0, status: item.status ?? 'aktif',
      gambarUrl: item.gambarUrl ?? '', bisaStandalone: item.bisaStandalone ?? true
    };
  } else {
    isEditing.value = false;
    currentId.value = '';
    form.value = defaultForm();
  }
  isModalOpen.value = true;
};

const closeModal = () => { isModalOpen.value = false; };

const saveKitab = async () => {
  isSaving.value = true;
  try {
    const data = {
      judul: form.value.judul, penulis: form.value.penulis,
      kategori: form.value.kategori, deskripsi: form.value.deskripsi,
      harga: Number(form.value.harga), status: form.value.status,
      gambarUrl: form.value.gambarUrl || null, bisaStandalone: form.value.bisaStandalone,
      updatedAt: new Date()
    };
    if (isEditing.value) {
      await updateDoc(doc(db, 'kitabs', currentId.value), data);
    } else {
      await addDoc(collection(db, 'kitabs'), { ...data, createdAt: new Date() });
    }
    closeModal();
    fetchKitabs();
  } finally {
    isSaving.value = false;
  }
};

const deleteKitab = async (id: string) => {
  if (confirm('Yakin ingin menghapus kitab ini?')) {
    await deleteDoc(doc(db, 'kitabs', id));
    fetchKitabs();
  }
};
</script>

<style scoped>
.input-field { @apply px-4 py-2 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange w-full transition-colors; }
.label { @apply text-sm font-medium text-brand-brown; }
</style>
