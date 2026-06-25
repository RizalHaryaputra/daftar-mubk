<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-2xl text-brand-brown">Kelola Kitab</h1>
      <AppButton variant="primary" @click="openModal()">Tambah Kitab</AppButton>
    </div>

    <div class="bg-white rounded-xl border border-brand-border overflow-hidden">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50 border-b border-brand-border text-brand-muted">
          <tr>
            <th class="p-4 font-medium">Judul Kitab</th>
            <th class="p-4 font-medium">Penulis</th>
            <th class="p-4 font-medium">Harga</th>
            <th class="p-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border">
          <tr v-for="item in kitabs" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4 text-brand-brown font-medium">{{ item.judul }}</td>
            <td class="p-4 text-brand-muted">{{ item.penulis }}</td>
            <td class="p-4 text-brand-orange">Rp {{ item.harga.toLocaleString('id-ID') }}</td>
            <td class="p-4 text-right space-x-2">
              <button @click="openModal(item)" class="text-brand-brown hover:text-brand-orange">Edit</button>
              <button @click="deleteKitab(item.id)" class="text-red-500 hover:text-red-700">Hapus</button>
            </td>
          </tr>
          <tr v-if="kitabs.length === 0">
            <td colspan="4" class="p-8 text-center text-brand-muted">Belum ada data kitab.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">
        <h2 class="font-display text-xl text-brand-brown">{{ isEditing ? 'Edit' : 'Tambah' }} Kitab</h2>
        
        <form @submit.prevent="saveKitab" class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Judul Kitab</label>
            <input v-model="form.judul" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Penulis</label>
            <input v-model="form.penulis" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Deskripsi</label>
            <textarea v-model="form.deskripsi" rows="3" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none resize-none"></textarea>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Harga (Rp)</label>
            <input type="number" v-model="form.harga" required class="px-4 py-2 text-sm border rounded-lg focus:border-brand-orange focus:outline-none" />
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
const kitabs = ref<any[]>([]);

const isModalOpen = ref(false);
const isEditing = ref(false);
const currentId = ref('');
const form = ref({
  judul: '',
  penulis: '',
  deskripsi: '',
  harga: 0
});

const fetchKitab = async () => {
  const querySnapshot = await getDocs(collection($db, 'kitab'));
  kitabs.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

onMounted(() => {
  fetchKitab();
});

const openModal = (item?: any) => {
  if (item) {
    isEditing.value = true;
    currentId.value = item.id;
    form.value = { ...item };
  } else {
    isEditing.value = false;
    currentId.value = '';
    form.value = { judul: '', penulis: '', deskripsi: '', harga: 0 };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveKitab = async () => {
  if (isEditing.value) {
    const docRef = doc($db, 'kitab', currentId.value);
    await updateDoc(docRef, form.value);
  } else {
    await addDoc(collection($db, 'kitab'), form.value);
  }
  closeModal();
  fetchKitab();
};

const deleteKitab = async (id: string) => {
  if (confirm('Yakin ingin menghapus kitab ini?')) {
    await deleteDoc(doc($db, 'kitab', id));
    fetchKitab();
  }
};
</script>
