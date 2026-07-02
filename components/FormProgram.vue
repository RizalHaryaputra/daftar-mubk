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
        <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Deskripsi Lengkap <span class="text-brand-orange">*</span></label>
        <textarea v-model="form.deskripsi" required rows="4" class="input-field resize-none" placeholder="Jelaskan detail tentang program ini..."></textarea>
      </div>

      <!-- Jadwal & Durasi -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Jadwal Belajar <span class="text-brand-orange">*</span></label>
          <input v-model="form.jadwal" required class="input-field" placeholder="Contoh: Senin & Rabu, 19.30-21.00 WIB" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Durasi Program <span class="text-brand-orange">*</span></label>
          <input v-model="form.durasi" required class="input-field" placeholder="Contoh: 3 bulan (12 pekan)" />
        </div>
      </div>

      <!-- Harga & Gambar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Harga Pendaftaran (Rp) <span class="text-brand-orange">*</span></label>
            <input type="number" v-model="form.harga" required class="input-field" placeholder="0" />
          </div>
          
          <!-- Tanggal Mulai -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Tanggal Mulai Belajar</label>
            <input type="date" v-model="form.tanggalMulaiStr" class="input-field" />
          </div>

          <!-- Batas Daftar -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-brand-brown uppercase tracking-widest">Batas Akhir Pendaftaran</label>
            <input type="date" v-model="form.deadlineDaftarStr" class="input-field" />
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
  nama: '', deskripsi: '', jadwal: '', durasi: '',
  harga: 0, status: 'aktif', gambarUrl: '',
  tanggalMulaiStr: '', deadlineDaftarStr: '',
  wajibBeliKitab: false, kitabWajibIdsStr: ''
});

const form = ref(defaultForm());

const populateForm = () => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    isEditing.value = true;
    const item = props.initialData;
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
  // Convert selected checkboxes back to comma-separated string for compatibility with parent components
  form.value.kitabWajibIdsStr = selectedKitabIds.value.join(',');
  emit('submit', { ...form.value });
};
</script>

<style scoped lang="postcss">
.input-field {
  @apply px-5 py-3.5 text-sm rounded-xl border-2 border-brand-border/50 bg-brand-cream/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all w-full text-brand-brown font-medium;
}
</style>
