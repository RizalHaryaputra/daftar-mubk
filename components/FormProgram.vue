<template>
  <div class="bg-white p-8 md:p-10 rounded-[30px] border border-brand-border/50 shadow-sm">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Nama & Status -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Nama Program <span class="text-brand-orange">*</span></label>
          <input v-model="form.nama" required class="input-field" placeholder="Contoh: Nahwu Dasar Intensif" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Status <span class="text-brand-orange">*</span></label>
          <select v-model="form.status" required class="input-field">
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
      </div>

      <!-- Deskripsi -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Deskripsi Singkat<span class="text-brand-orange">*</span></label>
        <textarea v-model="form.deskripsiSingkat" required rows="2" class="input-field resize-none" placeholder="Deskripsi pendek untuk ditampilkan di kartu..."></textarea>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Deskripsi Lengkap <span class="text-brand-orange">*</span></label>
        <ClientOnly>
          <Editor
            v-model="form.deskripsi"
            :api-key="useRuntimeConfig().public.tinymceApiKey"
            :init="{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Plus Jakarta Sans,Arial,sans-serif; font-size:14px; color: #43302b; }'
            }"
          />
        </ClientOnly>
      </div>

      <!-- Durasi, Harga, Periode -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Periode <span class="text-brand-orange">*</span></label>
          <input v-model="form.periode" required class="input-field" placeholder="Contoh: Gel. 1 / Batch 2" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Durasi Program <span class="text-brand-orange">*</span></label>
          <input v-model="form.durasi" required class="input-field" placeholder="Contoh: 3 bulan (12 pekan)" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Harga Pendaftaran (Rp) <span class="text-brand-orange">*</span></label>
          <input type="number" v-model="form.harga" required class="input-field" placeholder="0" />
        </div>
      </div>

      <!-- Opsi Jadwal Belajar (Full Width Box) -->
      <div class="p-6 border-2 border-brand-border/50 rounded-[20px] space-y-5 bg-brand-cream/10">
        <div class="flex items-center justify-between border-b border-brand-border/30 pb-4">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Opsi Jadwal Belajar <span class="text-brand-orange">*</span></label>
          <button type="button" @click="form.jadwal.push('')" class="text-brand-orange hover:text-orange-700 focus:outline-none flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest transition-colors bg-white px-4 py-2 rounded-full border-2 border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/5 shadow-sm">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
            Tambah Jadwal
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="(j, index) in form.jadwal" :key="index" class="flex items-center gap-3">
            <div class="w-10 h-12 flex items-center justify-center bg-white rounded-xl border-2 border-brand-border/50 text-brand-muted font-bold text-sm shrink-0 shadow-sm">
              {{ index + 1 }}
            </div>
            <input v-model="form.jadwal[index]" required class="input-field flex-1" placeholder="Contoh: Senin & Rabu, 19.30-21.00 WIB" />
            
            <button type="button" v-if="form.jadwal.length > 1" @click="form.jadwal.splice(index, 1)" class="w-12 h-12 flex-shrink-0 flex items-center justify-center text-brand-muted bg-white border-2 border-brand-border/50 hover:border-red-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all focus:outline-none hover:shadow-md" title="Hapus opsi">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Tanggal & Gambar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-6">
          <!-- Tanggal Mulai -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Tanggal Mulai Belajar</label>
            <input type="date" v-model="form.tanggalMulaiStr" class="input-field" />
          </div>

          <!-- Tanggal Akhir -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Tanggal Belajar Berakhir</label>
            <input type="date" v-model="form.tanggalAkhirStr" :min="form.tanggalMulaiStr" class="input-field" />
          </div>

          <!-- Batas Daftar -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Batas Akhir Pendaftaran</label>
            <input type="date" v-model="form.deadlineDaftarStr" :max="form.tanggalMulaiStr" class="input-field" />
          </div>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Gambar Program (Opsional)</label>
          <ImageUpload v-model="form.gambarUrl" />
        </div>
      </div>

      <!-- Wajib Beli Kitab -->
      <div class="p-6 border-2 border-brand-border/50 rounded-[20px] space-y-4 bg-brand-cream/10">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" v-model="form.wajibBeliKitab" class="w-5 h-5 rounded text-brand-orange focus:ring-brand-orange border-brand-border" />
          <span class="font-bold text-brand-brown">Program ini mewajibkan pembelian kitab</span>
        </label>
        
        <div v-if="form.wajibBeliKitab" class="flex flex-col gap-2 pt-2 relative">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Pilih Kitab Wajib</label>
          
          <div v-if="isLoadingKitabs" class="text-sm text-brand-muted animate-pulse">Memuat daftar kitab...</div>
          <div v-else-if="kitabsList.length === 0" class="text-sm text-brand-muted">Belum ada kitab di database.</div>
          <div v-else class="relative">
            <!-- Dropdown Toggle Button -->
            <button 
              type="button" 
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full flex items-center justify-between px-5 py-4 text-sm rounded-[20px] border-2 border-brand-border/50 bg-white hover:border-brand-orange focus:outline-none transition-all text-brand-brown font-medium"
            >
              <span>
                {{ selectedKitabIds.length === 0 ? 'Pilih Kitab...' : `${selectedKitabIds.length} Kitab Dipilih` }}
              </span>
              <svg class="w-5 h-5 text-brand-muted transition-transform" :class="{ 'rotate-180': isDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="isDropdownOpen"
              class="absolute z-10 w-full mt-2 bg-white border-2 border-brand-border/50 rounded-[20px] shadow-xl overflow-hidden max-h-60 overflow-y-auto"
            >
              <label 
                v-for="kitab in kitabsList" 
                :key="kitab.id"
                class="flex items-center gap-3 p-4 border-b border-brand-border/30 cursor-pointer transition-all hover:bg-brand-cream/20"
                :class="{ 'bg-brand-orange/5': selectedKitabIds.includes(kitab.id) }"
              >
                <input 
                  type="checkbox" 
                  :value="kitab.id" 
                  v-model="selectedKitabIds"
                  class="w-5 h-5 rounded text-brand-orange focus:ring-brand-orange border-brand-border"
                />
                <span class="font-medium text-brand-brown line-clamp-1">{{ kitab.judul }}</span>
              </label>
            </div>
          </div>
          
          <p class="text-xs text-brand-muted font-medium mt-1">Kitab yang dipilih akan ditambahkan secara otomatis ke tagihan saat pendaftaran.</p>
        </div>
      </div>

      <!-- Aksi -->
      <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-brand-border/50">
        <NuxtLink to="/admin/program" class="px-8 py-4 text-center rounded-full border-2 border-brand-border text-brand-brown font-bold tracking-widest uppercase hover:border-brand-orange hover:bg-brand-cream/30 transition-all text-sm">
          Batal
        </NuxtLink>
        <button type="submit" class="px-8 py-4 bg-brand-brown text-white rounded-full font-bold tracking-widest uppercase hover:bg-brand-orange transition-all hover:-translate-y-1 hover:shadow-xl text-sm disabled:opacity-50" :disabled="isSaving">
          {{ isSaving ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Program') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import { useRuntimeConfig } from '#imports';
import { useToast } from '~/composables/useToast';
import { collection, getDocs } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#imports';

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

const { $db } = useNuxtApp();
const db = $db as Firestore;

const isEditing = ref(false);
const isDropdownOpen = ref(false);
const isLoadingKitabs = ref(true);
const kitabsList = ref<any[]>([]);
const selectedKitabIds = ref<string[]>([]);

const defaultForm = () => ({
  nama: '',
  deskripsi: '',
  deskripsiSingkat: '',
  jadwal: [''],
  durasi: '',
  harga: 0, status: 'aktif', gambarUrl: '', periode: '',
  tanggalMulaiStr: '', tanggalAkhirStr: '', deadlineDaftarStr: '',
  wajibBeliKitab: false, kitabWajibIdsStr: ''
});

const form = ref(defaultForm());

const populateForm = () => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    isEditing.value = true;
    const item = props.initialData;
    let jadwalArr = [''];
    if (Array.isArray(item.jadwal)) {
      jadwalArr = item.jadwal.length > 0 ? [...item.jadwal] : [''];
    } else if (typeof item.jadwal === 'string' && item.jadwal.trim() !== '') {
      jadwalArr = [item.jadwal];
    }

    form.value = {
      nama: item.nama ?? '',
      deskripsi: item.deskripsi ?? '',
      deskripsiSingkat: item.deskripsiSingkat ?? '',
      jadwal: jadwalArr,
      durasi: item.durasi ?? '',
      harga: item.harga ?? 0,
      status: item.status ?? 'aktif',
      gambarUrl: item.gambarUrl ?? '',
      periode: item.periode ?? '',
      tanggalMulaiStr: item.tanggalMulai?.toDate?.()?.toISOString().split('T')[0] ?? '',
      tanggalAkhirStr: item.tanggalAkhir?.toDate?.()?.toISOString().split('T')[0] ?? '',
      deadlineDaftarStr: item.deadlineDaftar?.toDate?.()?.toISOString().split('T')[0] ?? '',
      wajibBeliKitab: item.wajibBeliKitab ?? false,
      kitabWajibIdsStr: ''
    };
    
    // Set checkboxes based on initialData.kitabWajibIds
    if (item.kitabWajibIds && Array.isArray(item.kitabWajibIds)) {
      selectedKitabIds.value = [...item.kitabWajibIds];
    }
  }
};

const fetchKitabs = async () => {
  try {
    const snap = await getDocs(collection(db, 'kitabs'));
    kitabsList.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching kitabs:", error);
  } finally {
    isLoadingKitabs.value = false;
  }
};

onMounted(() => {
  fetchKitabs();
  populateForm();
});

watch(() => props.initialData, () => {
  populateForm();
}, { deep: true });

const onSubmit = () => {
  if (form.value.tanggalMulaiStr && form.value.tanggalAkhirStr) {
    if (new Date(form.value.tanggalAkhirStr) < new Date(form.value.tanggalMulaiStr)) {
      useToast().showToast('Tanggal belajar berakhir tidak boleh lebih awal dari tanggal mulai', 'error');
      return;
    }
  }
  
  if (form.value.tanggalMulaiStr && form.value.deadlineDaftarStr) {
    if (new Date(form.value.deadlineDaftarStr) > new Date(form.value.tanggalMulaiStr)) {
      useToast().showToast('Batas pendaftaran tidak boleh melebihi tanggal mulai belajar', 'error');
      return;
    }
  }

  // Convert selected checkboxes back to comma-separated string for compatibility with parent components
  form.value.kitabWajibIdsStr = selectedKitabIds.value.join(',');
  
  // Clean up empty jadwal strings
  form.value.jadwal = form.value.jadwal.filter((j: string) => j.trim() !== '');
  if (form.value.jadwal.length === 0) form.value.jadwal = [''];

  emit('submit', { ...form.value });
};
</script>

<style scoped lang="postcss">
.input-field {
  @apply px-5 py-3.5 text-sm rounded-xl border-2 border-brand-border/50 bg-brand-cream/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all w-full text-brand-brown font-medium;
}
</style>
