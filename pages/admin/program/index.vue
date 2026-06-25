<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Program</h1>
      <AppButton variant="primary" @click="openModal()">Tambah Program</AppButton>
    </div>

    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50 border-b border-brand-border text-brand-muted">
          <tr>
            <th class="p-4 font-medium">Nama Program</th>
            <th class="p-4 font-medium">Tipe</th>
            <th class="p-4 font-medium">Harga</th>
            <th class="p-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border">
          <tr v-for="item in programs" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4 text-brand-brown font-medium">{{ item.nama }}</td>
            <td class="p-4 text-brand-muted capitalize">{{ item.tipe }}</td>
            <td class="p-4 text-brand-orange">Rp {{ item.harga.toLocaleString('id-ID') }}</td>
            <td class="p-4 text-right space-x-2">
              <button @click="openModal(item)" class="text-brand-brown hover:text-brand-orange">Edit</button>
              <button @click="deleteProgram(item.id)" class="text-red-500 hover:text-red-700">Hapus</button>
            </td>
          </tr>
          <tr v-if="programs.length === 0">
            <td colspan="4" class="p-8 text-center text-brand-muted">Belum ada data program.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">
        <h2 class="font-display text-xl text-brand-brown">{{ isEditing ? 'Edit' : 'Tambah' }} Program</h2>
        
        <form @submit.prevent="saveProgram" class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Nama Program</label>
            <input v-model="form.nama" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Deskripsi</label>
            <textarea v-model="form.deskripsi" rows="3" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none resize-none"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Tipe</label>
              <select v-model="form.tipe" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none">
                <option value="reguler">Reguler</option>
                <option value="intensif">Intensif</option>
              </select>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Harga (Rp)</label>
              <input type="number" v-model="form.harga" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none" />
            </div>
          </div>
          
          <div class="flex justify-end gap-2 pt-4">
            <AppButton type="button" variant="ghost" @click="closeModal">Batal</AppButton>
            <AppButton type="submit" variant="primary">{{ isEditing ? 'Simpan Perubahan' : 'Tambah Data' }}</AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
});

const { $db } = useNuxtApp();
const programs = ref<any[]>([]);

const isModalOpen = ref(false);
const isEditing = ref(false);
const currentId = ref('');
const form = ref({
  nama: '',
  deskripsi: '',
  tipe: 'reguler',
  harga: 0
});

const fetchPrograms = async () => {
  const querySnapshot = await getDocs(collection($db, 'program'));
  programs.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

onMounted(() => {
  fetchPrograms();
});

const openModal = (item?: any) => {
  if (item) {
    isEditing.value = true;
    currentId.value = item.id;
    form.value = { ...item };
  } else {
    isEditing.value = false;
    currentId.value = '';
    form.value = { nama: '', deskripsi: '', tipe: 'reguler', harga: 0 };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveProgram = async () => {
  if (isEditing.value) {
    const docRef = doc($db, 'program', currentId.value);
    await updateDoc(docRef, form.value);
  } else {
    await addDoc(collection($db, 'program'), form.value);
  }
  closeModal();
  fetchPrograms();
};

const deleteProgram = async (id: string) => {
  if (confirm('Yakin ingin menghapus program ini?')) {
    await deleteDoc(doc($db, 'program', id));
    fetchPrograms();
  }
};
</script>
