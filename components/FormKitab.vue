<template>
  <div class="bg-white p-8 md:p-10 rounded-[30px] border border-brand-border/50 shadow-sm">
    <form @submit.prevent="onSubmit" class="space-y-6">
      
      <!-- Judul & Status -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Judul Kitab <span class="text-brand-orange">*</span></label>
          <input v-model="form.judul" required class="input-field" placeholder="Contoh: Al-Ajurrumiyyah" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Status <span class="text-brand-orange">*</span></label>
          <select v-model="form.status" required class="input-field">
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
      </div>

      <!-- Penulis & Kategori -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Penulis <span class="text-brand-orange">*</span></label>
          <input v-model="form.penulis" required class="input-field" placeholder="Contoh: Ibnu Ajurrum" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Kategori</label>
          <input v-model="form.kategori" class="input-field" placeholder="Contoh: Nahwu, Sharaf, dll." />
        </div>
      </div>

      <!-- Deskripsi -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Deskripsi Singkat <span class="text-brand-orange">*</span></label>
        <textarea v-model="form.deskripsi" required rows="3" class="input-field resize-none" placeholder="Deskripsi tentang kitab ini..."></textarea>
      </div>

      <!-- Harga & Gambar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Harga Kitab (Rp) <span class="text-brand-orange">*</span></label>
            <input type="number" v-model="form.harga" required class="input-field" placeholder="0" />
          </div>

          <div class="p-6 border-2 border-brand-border/50 rounded-[20px] bg-brand-cream/10 mt-2">
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.bisaStandalone" class="w-5 h-5 mt-0.5 rounded text-brand-orange focus:ring-brand-orange border-brand-border" />
              <div>
                <span class="font-bold text-brand-brown block mb-1">Bisa Dibeli Terpisah (Standalone)</span>
                <span class="text-xs text-brand-muted leading-relaxed block">Jika dicentang, kitab ini dapat dibeli tanpa harus mendaftar ke program belajar tertentu.</span>
              </div>
            </label>
          </div>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Gambar Sampul Kitab (Opsional)</label>
          <ImageUpload v-model="form.gambarUrl" />
        </div>
      </div>

      <!-- Aksi -->
      <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-brand-border/50">
        <NuxtLink to="/admin/kitab" class="px-8 py-4 text-center rounded-full border-2 border-brand-border text-brand-brown font-bold tracking-widest uppercase hover:border-brand-orange hover:bg-brand-cream/30 transition-all text-sm">
          Batal
        </NuxtLink>
        <button type="submit" class="px-8 py-4 bg-brand-brown text-white rounded-full font-bold tracking-widest uppercase hover:bg-brand-orange transition-all hover:-translate-y-1 hover:shadow-xl text-sm disabled:opacity-50" :disabled="isSaving">
          {{ isSaving ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Kitab') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null
  },
  isSaving: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit']);

const isEditing = ref(false);

const defaultForm = () => ({
  judul: '', penulis: '', kategori: '', deskripsi: '',
  harga: 0, status: 'aktif', gambarUrl: '', bisaStandalone: true
});

const form = ref(defaultForm());

const populateForm = () => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    isEditing.value = true;
    const item = props.initialData;
    form.value = {
      judul: item.judul ?? '',
      penulis: item.penulis ?? '',
      kategori: item.kategori ?? '',
      deskripsi: item.deskripsi ?? '',
      harga: item.harga ?? 0,
      status: item.status ?? 'aktif',
      gambarUrl: item.gambarUrl ?? '',
      bisaStandalone: item.bisaStandalone ?? true
    };
  }
};

onMounted(() => {
  populateForm();
});

watch(() => props.initialData, () => {
  populateForm();
}, { deep: true });

const onSubmit = () => {
  emit('submit', { ...form.value });
};
</script>

<style scoped lang="postcss">
.input-field {
  @apply px-5 py-3.5 text-sm rounded-xl border-2 border-brand-border/50 bg-brand-cream/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all w-full text-brand-brown font-medium;
}
</style>
