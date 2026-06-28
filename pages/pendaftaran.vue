<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Formulir Pendaftaran</h1>
      <p class="text-sm text-brand-muted">Lengkapi data diri Anda dengan benar.</p>
    </div>

    <!-- Loading program info -->
    <div v-if="isLoadingData" class="bg-white border border-brand-border rounded-xl p-6 animate-pulse space-y-3">
      <div class="h-4 bg-gray-200 rounded w-1/3"></div>
      <div class="h-6 bg-gray-200 rounded w-2/3"></div>
    </div>

    <!-- Error -->
    <div v-else-if="dataError" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
      {{ dataError }}
    </div>

    <template v-else>
      <!-- Info Program Terpilih -->
      <div v-if="selectedProgram" class="bg-brand-cream border border-brand-border rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <p class="text-xs text-brand-muted uppercase tracking-widest">Program yang dipilih</p>
          <p class="font-medium text-brand-brown">{{ selectedProgram.nama }}</p>
          <p class="text-xs text-brand-muted">{{ selectedProgram.jadwal }} · Rp {{ selectedProgram.harga?.toLocaleString('id-ID') }}</p>
        </div>
        <NuxtLink :to="`/program/${selectedProgram.id}`" class="text-xs text-brand-orange hover:underline shrink-0">Ganti</NuxtLink>
      </div>

      <form @submit.prevent="submitForm" class="space-y-8">

        <!-- ===== SEKSI 1: DATA DIRI ===== -->
        <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8 space-y-5">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2">Data Diri</h2>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Nama Lengkap <span class="text-brand-orange">*</span></label>
            <input type="text" v-model="form.dataPeserta.namaLengkap" required placeholder="Fulan bin Fulan" class="input-field" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Email <span class="text-brand-orange">*</span></label>
              <input type="email" v-model="form.dataPeserta.email" required placeholder="email@contoh.com" class="input-field" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">No. WhatsApp <span class="text-brand-orange">*</span></label>
              <input type="tel" v-model="form.dataPeserta.noWa" required placeholder="08xxxxxxxxxx" class="input-field" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-brand-brown">Jenis Kelamin <span class="text-brand-orange">*</span></label>
            <div class="flex gap-6">
              <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" v-model="form.dataPeserta.jenisKelamin" value="laki-laki" required class="text-brand-orange focus:ring-brand-orange" />
                Laki-laki
              </label>
              <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" v-model="form.dataPeserta.jenisKelamin" value="perempuan" class="text-brand-orange focus:ring-brand-orange" />
                Perempuan
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Tempat Lahir <span class="text-brand-orange">*</span></label>
              <input type="text" v-model="form.dataPeserta.tempatLahir" required placeholder="Kota kelahiran" class="input-field" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Tanggal Lahir <span class="text-brand-orange">*</span></label>
              <input type="date" v-model="form.dataPeserta.tanggalLahir" required class="input-field" />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Domisili <span class="text-brand-orange">*</span></label>
            <input type="text" v-model="form.dataPeserta.domisili" required placeholder="Kota/Kabupaten domisili sekarang" class="input-field" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Pekerjaan / Profesi <span class="text-brand-orange">*</span></label>
            <input type="text" v-model="form.dataPeserta.pekerjaan" required placeholder="Mahasiswa, Guru, Karyawan, dll." class="input-field" />
          </div>
        </div>

        <!-- ===== SEKSI 2: DATA LAINNYA ===== -->
        <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8 space-y-5">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2">Data Lainnya</h2>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Pernah Belajar Bahasa Arab Sebelumnya?</label>
            <textarea v-model="form.dataPeserta.pernahBelajarBahasaArab" rows="3" placeholder="Ceritakan singkat, atau kosongkan jika belum pernah." class="input-field resize-none"></textarea>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-brand-brown">Pernah Mengikuti Program MUBK Sebelumnya?</label>
            <div class="flex gap-6">
              <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" v-model="form.dataPeserta.pernahIkutProgramMubk" :value="true" class="text-brand-orange focus:ring-brand-orange" />
                Ya
              </label>
              <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" v-model="form.dataPeserta.pernahIkutProgramMubk" :value="false" class="text-brand-orange focus:ring-brand-orange" />
                Tidak
              </label>
            </div>
          </div>
        </div>

        <!-- ===== SEKSI 3: PILIHAN KITAB TAMBAHAN ===== -->
        <div v-if="availableKitabs.length > 0" class="bg-white border border-brand-border rounded-xl p-6 md:p-8 space-y-4">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2">Kitab Tambahan (Opsional)</h2>
          <p class="text-sm text-brand-muted">Tambahkan kitab yang ingin Anda beli bersama pendaftaran.</p>
          <div class="space-y-3">
            <div v-for="kitab in availableKitabs" :key="kitab.id" class="flex items-center justify-between p-3 border border-brand-border rounded-lg">
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  :id="`kitab-${kitab.id}`"
                  :value="kitab.id"
                  v-model="selectedKitabIds"
                  class="rounded border-brand-border text-brand-orange focus:ring-brand-orange"
                />
                <label :for="`kitab-${kitab.id}`" class="cursor-pointer">
                  <p class="text-sm font-medium text-brand-brown">{{ kitab.judul }}</p>
                  <p class="text-xs text-brand-muted">{{ kitab.penulis }}</p>
                </label>
              </div>
              <p class="text-sm font-medium text-brand-orange shrink-0 ml-4">Rp {{ kitab.harga?.toLocaleString('id-ID') }}</p>
            </div>
          </div>
        </div>

        <!-- ===== SEKSI 4: PENGIRIMAN (MUNCUL JIKA ADA KITAB) ===== -->
        <div v-if="semuaKitabDibeli.length > 0" class="bg-white border border-brand-border rounded-xl p-6 md:p-8 space-y-4">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2">Alamat Pengiriman</h2>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Alamat Lengkap <span class="text-brand-orange">*</span></label>
            <textarea v-model="form.dataPeserta.alamatPengiriman" required rows="4" placeholder="Nama jalan, RT/RW, Desa/Kelurahan, Kecamatan, Kota/Kab, Provinsi, Kode Pos" class="input-field resize-none"></textarea>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Zona Ongkos Kirim <span class="text-brand-orange">*</span></label>
            <select v-model="form.ongkir.zona" required class="input-field">
              <option value="">Pilih zona ongkir</option>
              <option value="jogja">DI Yogyakarta — Rp {{ ongkirSetting.jogja?.toLocaleString('id-ID') }}</option>
              <option value="jawa">Jawa Luar DIY — Rp {{ ongkirSetting.jawa?.toLocaleString('id-ID') }}</option>
              <option value="luar_jawa">Luar Jawa — Rp {{ ongkirSetting.luarJawa?.toLocaleString('id-ID') }}</option>
            </select>
          </div>
        </div>

        <!-- ===== SEKSI 5: RINGKASAN BIAYA ===== -->
        <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2 mb-4">Ringkasan Biaya</h2>

          <div class="space-y-2">
            <div v-if="selectedProgram" class="flex justify-between text-sm">
              <span class="text-brand-muted">Program — {{ selectedProgram.nama }}</span>
              <span>Rp {{ selectedProgram.harga?.toLocaleString('id-ID') }}</span>
            </div>
            <div v-for="k in semuaKitabDibeli" :key="k.id" class="flex justify-between text-sm">
              <span class="text-brand-muted">{{ k.judul }}</span>
              <span>Rp {{ k.harga?.toLocaleString('id-ID') }}</span>
            </div>
            <div v-if="semuaKitabDibeli.length > 0 && form.ongkir.zona" class="flex justify-between text-sm">
              <span class="text-brand-muted">Ongkir</span>
              <span>Rp {{ nominalOngkir.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <div class="flex justify-between font-semibold text-brand-brown mt-4 pt-4 border-t border-brand-border">
            <span>Total Pembayaran</span>
            <span class="text-brand-orange text-lg">Rp {{ totalBayar.toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <!-- Error Submission -->
        <div v-if="submitError" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
          {{ submitError }}
        </div>

        <AppButton type="submit" variant="primary" class="w-full" :disabled="isSubmitting">
          {{ isSubmitting ? 'Memproses...' : 'Lanjut ke Pembayaran' }}
        </AppButton>

      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#imports';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const route = useRoute();
const { $db } = useNuxtApp();
const db = $db as Firestore;

// State data awal
const selectedProgram = ref<any>(null);
const availableKitabs = ref<any[]>([]); // kitab standalone yg bisa ditambah
const kitabWajibProgram = ref<any[]>([]); // kitab wajib dari program
const ongkirSetting = ref<any>({ jogja: 15000, jawa: 25000, luarJawa: 45000 });
const isLoadingData = ref(true);
const dataError = ref('');

// State form & submission
const isSubmitting = ref(false);
const submitError = ref('');
const selectedKitabIds = ref<string[]>([]);

const form = ref({
  dataPeserta: {
    namaLengkap: '',
    email: '',
    noWa: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    domisili: '',
    pekerjaan: '',
    pernahBelajarBahasaArab: '',
    pernahIkutProgramMubk: false,
    alamatPengiriman: null as string | null
  },
  ongkir: {
    zona: '',
    nominal: 0
  }
});

// Semua kitab yang dibeli (wajib + pilihan user)
const semuaKitabDibeli = computed(() => {
  const pilihan = availableKitabs.value.filter(k => selectedKitabIds.value.includes(k.id));
  return [...kitabWajibProgram.value, ...pilihan];
});

const nominalOngkir = computed(() => {
  if (!form.value.ongkir.zona || semuaKitabDibeli.value.length === 0) return 0;
  if (form.value.ongkir.zona === 'jogja') return ongkirSetting.value.jogja ?? 15000;
  if (form.value.ongkir.zona === 'jawa') return ongkirSetting.value.jawa ?? 25000;
  if (form.value.ongkir.zona === 'luar_jawa') return ongkirSetting.value.luarJawa ?? 45000;
  return 0;
});

const totalBayar = computed(() => {
  const biayaProgram = selectedProgram.value?.harga ?? 0;
  const totalKitab = semuaKitabDibeli.value.reduce((acc, k) => acc + (k.harga ?? 0), 0);
  return biayaProgram + totalKitab + nominalOngkir.value;
});

// Load data on mount
onMounted(async () => {
  const programId = route.query.programId as string;
  const kitabId = route.query.kitabId as string;

  try {
    // Load ongkir setting
    const ongkirSnap = await getDoc(doc(db, 'settings', 'ongkir'));
    if (ongkirSnap.exists()) ongkirSetting.value = ongkirSnap.data();

    // Load program jika ada
    if (programId) {
      const progSnap = await getDoc(doc(db, 'programs', programId));
      if (!progSnap.exists()) {
        dataError.value = 'Program tidak ditemukan. Silakan kembali dan pilih program yang valid.';
        return;
      }
      selectedProgram.value = { id: progSnap.id, ...progSnap.data() };

      // Fetch kitab wajib program
      if (selectedProgram.value.wajibBeliKitab && selectedProgram.value.kitabWajibIds?.length > 0) {
        const promises = selectedProgram.value.kitabWajibIds.map((id: string) => getDoc(doc(db, 'kitabs', id)));
        const snaps = await Promise.all(promises);
        kitabWajibProgram.value = snaps.filter(s => s.exists()).map(s => ({ id: s.id, ...s.data() }));
      }
    }

    // Pre-select kitab jika datang dari halaman detail kitab
    if (kitabId) {
      const kitabSnap = await getDoc(doc(db, 'kitabs', kitabId));
      if (kitabSnap.exists()) {
        const k = { id: kitabSnap.id, ...kitabSnap.data() };
        availableKitabs.value = [k];
        selectedKitabIds.value = [kitabId];
      }
    } else {
      // Load semua kitab standalone yang tersedia
      const kitabsSnap = await getDocs(query(
        collection(db, 'kitabs'),
        where('status', '==', 'aktif'),
        where('bisaStandalone', '==', true)
      ));
      const allKitabs = kitabsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Jangan tampilkan kitab yang sudah ada di kitabWajib
      const wajibIds = new Set(kitabWajibProgram.value.map((k: any) => k.id));
      availableKitabs.value = allKitabs.filter(k => !wajibIds.has(k.id));
    }

    if (!programId && !kitabId) {
      dataError.value = 'Silakan pilih program atau kitab terlebih dahulu dari halaman yang tersedia.';
    }
  } catch (e) {
    console.error('Failed to load form data:', e);
    dataError.value = 'Terjadi kesalahan saat memuat data. Silakan muat ulang halaman.';
  } finally {
    isLoadingData.value = false;
  }
});

// Sync ongkir nominal ke form
watch(nominalOngkir, (val) => {
  form.value.ongkir.nominal = val;
});

const submitForm = async () => {
  // Validasi: jika ada kitab tapi zona ongkir belum dipilih
  if (semuaKitabDibeli.value.length > 0 && !form.value.ongkir.zona) {
    submitError.value = 'Silakan pilih zona ongkir untuk pengiriman kitab.';
    return;
  }

  isSubmitting.value = true;
  submitError.value = '';

  const payload = {
    programId: selectedProgram.value?.id ?? null,
    programNama: selectedProgram.value?.nama ?? null,
    dataPeserta: {
      ...form.value.dataPeserta,
      alamatPengiriman: semuaKitabDibeli.value.length > 0 ? form.value.dataPeserta.alamatPengiriman : null
    },
    kitabDibeli: semuaKitabDibeli.value.map(k => ({
      kitabId: k.id,
      judul: k.judul,
      harga: k.harga,
      qty: 1
    })),
    ongkir: semuaKitabDibeli.value.length > 0
      ? { zona: form.value.ongkir.zona, nominal: nominalOngkir.value }
      : { zona: null, nominal: 0 },
    rincianBiaya: {
      biayaProgram: selectedProgram.value?.harga ?? 0,
      totalHargaKitab: semuaKitabDibeli.value.reduce((acc, k) => acc + k.harga, 0),
      ongkir: nominalOngkir.value,
      total: totalBayar.value
    }
  };

  try {
    const response = await $fetch('/api/pendaftaran', {
      method: 'POST',
      body: payload
    });

    // Buka Midtrans Snap
    const { snapToken, kodeInvoice } = response as any;
    if (typeof window !== 'undefined' && (window as any).snap) {
      (window as any).snap.pay(snapToken, {
        onSuccess: () => navigateTo(`/cek-status?invoice=${kodeInvoice}`),
        onPending: () => navigateTo(`/cek-status?invoice=${kodeInvoice}`),
        onError: () => { submitError.value = 'Terjadi error saat pembayaran. Silakan coba lagi.'; },
        onClose: () => { submitError.value = 'Pembayaran dibatalkan. Anda bisa melanjutkan dari halaman Cek Status.'; }
      });
    } else {
      // Fallback redirect
      navigateTo(`/cek-status?invoice=${kodeInvoice}`);
    }
  } catch (error: any) {
    const msg = error?.data?.message ?? error?.message ?? 'Terjadi kesalahan. Silakan coba lagi.';
    submitError.value = msg;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.input-field {
  @apply px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors w-full;
}
</style>
