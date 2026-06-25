<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-brand-brown mb-2">Formulir Pendaftaran</h1>
      <p class="text-sm text-brand-muted">Lengkapi data diri Anda di bawah ini.</p>
    </div>

    <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <!-- Data Utama -->
        <div class="space-y-4">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2">Data Diri</h2>
          
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Nama Lengkap <span class="text-brand-orange">*</span></label>
            <input type="text" v-model="form.namaLengkap" required placeholder="Masukkan nama lengkap" class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Email <span class="text-brand-orange">*</span></label>
              <input type="email" v-model="form.email" required placeholder="email@contoh.com" class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">No. WhatsApp <span class="text-brand-orange">*</span></label>
              <input type="tel" v-model="form.noWa" required placeholder="08xxxxxxxxxx" class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-brand-brown">Jenis Kelamin <span class="text-brand-orange">*</span></label>
            <select v-model="form.jenisKelamin" required class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors">
              <option value="">Pilih jenis kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
        </div>

        <!-- Alamat Pengiriman (jika beli kitab) -->
        <div class="space-y-4 pt-4">
          <h2 class="font-display text-xl text-brand-brown border-b border-brand-border pb-2">Pengiriman Kitab</h2>
          <div class="p-4 bg-brand-cream rounded-lg border border-brand-border">
            <p class="text-sm text-brand-brown font-medium mb-2">Simulasi (karena fitur cart belum dinamis):</p>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="beliKitab" class="rounded border-brand-border text-brand-orange focus:ring-brand-orange">
              <span class="text-sm text-brand-brown">Saya juga membeli kitab fisik</span>
            </label>
          </div>
          
          <div v-if="beliKitab" class="space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Alamat Pengiriman Lengkap <span class="text-brand-orange">*</span></label>
              <textarea v-model="form.alamatPengiriman" rows="3" required placeholder="Masukkan alamat lengkap (Jalan, RT/RW, Desa, Kec, Kota, Prov, Kodepos)" class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors resize-none"></textarea>
            </div>
            
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-brand-brown">Zona Ongkir <span class="text-brand-orange">*</span></label>
              <select v-model="form.zonaOngkir" required class="px-4 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-orange transition-colors">
                <option value="">Pilih zona ongkir</option>
                <option value="jogja">DI Yogyakarta (Rp 15.000)</option>
                <option value="jawa">Jawa Luar DIY (Rp 25.000)</option>
                <option value="luar_jawa">Luar Jawa (Rp 45.000)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-brand-border">
          <div class="bg-gray-50 p-4 rounded-lg mb-6 border border-brand-border">
            <h3 class="text-sm font-medium text-brand-brown mb-3">Ringkasan Biaya</h3>
            <div class="flex justify-between text-sm mb-2 text-brand-muted">
              <span>Program (Nahwu Dasar)</span>
              <span>Rp 250.000</span>
            </div>
            <div v-if="beliKitab" class="flex justify-between text-sm mb-2 text-brand-muted">
              <span>Kitab (Al-Ajurrumiyyah)</span>
              <span>Rp 45.000</span>
            </div>
            <div v-if="beliKitab && form.zonaOngkir" class="flex justify-between text-sm mb-2 text-brand-muted">
              <span>Ongkir</span>
              <span>Rp {{ getOngkir().toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between text-base font-medium text-brand-brown mt-4 pt-3 border-t border-brand-border">
              <span>Total Pembayaran</span>
              <span class="text-brand-orange">Rp {{ getTotal().toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <AppButton type="submit" variant="primary" class="w-full">
            Lanjut Pembayaran
          </AppButton>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const beliKitab = ref(false);

const form = ref({
  namaLengkap: '',
  email: '',
  noWa: '',
  jenisKelamin: '',
  alamatPengiriman: '',
  zonaOngkir: ''
});

const getOngkir = () => {
  if (!beliKitab.value) return 0;
  if (form.value.zonaOngkir === 'jogja') return 15000;
  if (form.value.zonaOngkir === 'jawa') return 25000;
  if (form.value.zonaOngkir === 'luar_jawa') return 45000;
  return 0;
};

const getTotal = () => {
  let total = 250000; // Harga program
  if (beliKitab.value) {
    total += 45000; // Harga kitab
    total += getOngkir();
  }
  return total;
};

const submitForm = () => {
  alert('Simulasi: Melanjutkan ke API Midtrans. Total: Rp ' + getTotal().toLocaleString('id-ID'));
};
</script>
