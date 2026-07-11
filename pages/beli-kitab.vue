<template>
  <div class="min-h-screen bg-brand-cream/20 pt-8 pb-20">
    <div v-if="isLoadingData" class="flex flex-col items-center justify-center min-h-[50vh]">
      <div class="w-12 h-12 rounded-full border-4 border-brand-orange border-t-transparent animate-spin mb-4"></div>
      <p class="text-brand-muted font-bold tracking-widest uppercase text-sm animate-pulse">Memuat Data...</p>
    </div>

    <template v-else-if="dataError">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 mt-10">
        <div class="bg-red-50 text-red-600 p-8 rounded-[30px] text-center border border-red-200">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p class="font-bold text-xl mb-2">Maaf, Data Tidak Ditemukan</p>
          <p class="mb-6">{{ dataError }}</p>
          <NuxtLink to="/kitab" class="inline-block bg-brand-orange text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20">
            Lihat Daftar Kitab
          </NuxtLink>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center max-w-2xl mx-auto px-4 mb-10">
        <h1 class="font-display text-4xl md:text-5xl text-brand-brown mb-4 font-bold tracking-tight">
          Form Pembelian <span class="text-brand-orange italic">Kitab</span>
        </h1>
        <p class="text-brand-muted md:text-lg leading-relaxed">Silakan lengkapi data pengiriman dan pilih zona ongkos kirim untuk menyelesaikan pembelian kitab Anda.</p>
      </div>

      <form @submit.prevent="submitForm" class="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        <!-- List Kitab yang Dibeli -->
        <div class="bg-white shadow-xl border border-brand-border/50 rounded-[30px] p-8 md:p-10">
          <h2 class="font-display text-2xl text-brand-brown mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">1</span>
            Daftar Kitab
          </h2>
          <div class="space-y-4">
            <div v-for="k in semuaKitabDibeli" :key="k.id" class="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-brand-border/30 rounded-2xl bg-brand-cream/10">
              <!-- Cover Image & Info -->
              <div class="flex items-center gap-4 flex-grow w-full">
                <div class="w-16 h-20 bg-brand-cream/50 rounded-lg overflow-hidden flex-shrink-0 border border-brand-border/30 flex items-center justify-center">
                  <img v-if="k.gambarUrl" :src="k.gambarUrl" :alt="k.judul" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-brand-orange/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div class="flex-grow">
                  <h3 class="font-bold text-brand-brown leading-snug">{{ k.judul }}</h3>
                  <p class="text-sm text-brand-muted">Rp {{ k.harga?.toLocaleString('id-ID') }} / pcs</p>
                </div>
              </div>
              
              <!-- Qty Controls & Action -->
              <div class="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-border/20">
                <!-- Qty Controls -->
                <div class="flex items-center gap-2 bg-white rounded-full border border-brand-border/50 p-1 flex-shrink-0">
                  <button type="button" @click="updateQty(k.id, -1)" class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-brand-cream text-brand-orange transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                  </button>
                  <span class="font-bold text-sm w-4 text-center text-brand-brown">{{ k.qty }}</span>
                  <button type="button" @click="updateQty(k.id, 1)" class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-brand-cream text-brand-orange transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>

                <!-- Allow deleting kitab if it's not the last one -->
                <button type="button" @click="removeKitab(k.id)" v-if="semuaKitabDibeli.length > 1" class="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            
            <div class="pt-4 mt-4 border-t border-brand-border/30 border-dashed">
              <button type="button" v-if="!isSelectingKitab && unselectedKitabs.length > 0" @click="isSelectingKitab = true" class="text-sm text-brand-orange font-bold hover:underline flex items-center gap-1 w-fit">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                Tambah Kitab Lainnya
              </button>
              
              <div v-if="isSelectingKitab" class="bg-brand-cream/20 p-5 rounded-2xl border border-brand-orange/30 mt-2 space-y-3">
                <div class="flex justify-between items-center mb-2">
                  <p class="font-bold text-brand-brown text-sm">Pilih Kitab Tambahan</p>
                  <button type="button" @click="isSelectingKitab = false" class="text-brand-muted hover:text-brand-orange">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button type="button" v-for="k in unselectedKitabs" :key="k.id" @click="addKitab(k.id)" class="text-left flex items-center gap-3 p-3 bg-white border border-brand-border/50 rounded-xl hover:border-brand-orange hover:shadow-md transition-all group">
                    <div class="w-10 h-12 bg-brand-cream/50 rounded overflow-hidden flex-shrink-0 border border-brand-border/30">
                      <img v-if="k.gambarUrl" :src="k.gambarUrl" class="w-full h-full object-cover" />
                      <svg v-else class="w-full h-full p-2 text-brand-orange/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <div class="flex-grow">
                      <p class="font-bold text-brand-brown text-sm line-clamp-1">{{ k.judul }}</p>
                      <p class="text-xs text-brand-orange">Rp {{ k.harga?.toLocaleString('id-ID') }}</p>
                    </div>
                    <div class="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Pembeli & Pengiriman -->
        <div class="bg-white shadow-xl border border-brand-border/50 rounded-[30px] p-8 md:p-10">
          <h2 class="font-display text-2xl text-brand-brown mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">2</span>
            Data & Alamat Pengiriman
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
              <input type="text" v-model="form.dataPeserta.namaLengkap" required class="input-field" placeholder="Masukkan nama lengkap Anda" />
            </div>
            <div>
              <label class="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">No. WhatsApp <span class="text-red-500">*</span></label>
              <input type="tel" v-model="form.dataPeserta.noWa" required class="input-field" placeholder="Contoh: 081234567890" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Email <span class="text-red-500">*</span></label>
              <input type="email" v-model="form.dataPeserta.email" required class="input-field" placeholder="Masukkan email aktif Anda" />
            </div>
            <div v-if="form.ongkir.zona === 'ambil_sendiri'" class="md:col-span-2 p-5 bg-brand-orange/5 border border-brand-orange/30 rounded-2xl">
              <p class="font-bold text-brand-orange mb-2 text-sm">Informasi Pengambilan Kitab:</p>
              <p class="text-sm text-brand-brown">Silakan ambil kitab Anda langsung di kantor MUBK:</p>
              <p class="text-sm font-bold mt-1 text-brand-brown">Jl. Pogung Rejo No.412, RT.14/RW.51, Pogung Kidul, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284</p>
              <a href="https://maps.app.goo.gl/dDU9oY8jouPKLCCu7" target="_blank" rel="noopener noreferrer" class="inline-block mt-3 text-sm text-brand-orange hover:text-orange-700 underline font-medium">Lihat di Google Maps</a>
            </div>
            <div v-else class="md:col-span-2">
              <label class="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Alamat Pengiriman Lengkap <span class="text-red-500">*</span></label>
              <textarea v-model="form.dataPeserta.alamatPengiriman" :required="form.ongkir.zona !== 'ambil_sendiri'" rows="3" class="input-field resize-none" placeholder="Masukkan alamat lengkap (Jalan, RT/RW, Desa, Kecamatan, Kota/Kab, Kodepos)"></textarea>
            </div>
            <div class="md:col-span-2 bg-brand-cream/30 p-5 rounded-2xl border border-brand-border/50">
              <label class="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-3">Pilih Zona Ongkos Kirim <span class="text-red-500">*</span></label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="flex flex-col p-4 bg-white border rounded-xl cursor-pointer transition-all hover:border-brand-orange" :class="form.ongkir.zona === 'jogja' ? 'border-brand-orange shadow-md ring-1 ring-brand-orange/50' : 'border-brand-border/50'">
                  <div class="flex items-center gap-2 mb-2">
                    <input type="radio" v-model="form.ongkir.zona" value="jogja" class="w-4 h-4 text-brand-orange accent-brand-orange" />
                    <span class="font-bold text-brand-brown text-sm">DI Yogyakarta</span>
                  </div>
                  <span class="text-brand-orange font-medium text-sm">Rp {{ ongkirSetting.jogja?.toLocaleString('id-ID') }}</span>
                </label>
                <label class="flex flex-col p-4 bg-white border rounded-xl cursor-pointer transition-all hover:border-brand-orange" :class="form.ongkir.zona === 'jawa' ? 'border-brand-orange shadow-md ring-1 ring-brand-orange/50' : 'border-brand-border/50'">
                  <div class="flex items-center gap-2 mb-2">
                    <input type="radio" v-model="form.ongkir.zona" value="jawa" class="w-4 h-4 text-brand-orange accent-brand-orange" />
                    <span class="font-bold text-brand-brown text-sm">Pulau Jawa</span>
                  </div>
                  <span class="text-brand-orange font-medium text-sm">Rp {{ ongkirSetting.jawa?.toLocaleString('id-ID') }}</span>
                </label>
                <label class="flex flex-col p-4 bg-white border rounded-xl cursor-pointer transition-all hover:border-brand-orange" :class="form.ongkir.zona === 'luar_jawa' ? 'border-brand-orange shadow-md ring-1 ring-brand-orange/50' : 'border-brand-border/50'">
                  <div class="flex items-center gap-2 mb-2">
                    <input type="radio" v-model="form.ongkir.zona" value="luar_jawa" class="w-4 h-4 text-brand-orange accent-brand-orange" />
                    <span class="font-bold text-brand-brown text-sm">Luar Jawa</span>
                  </div>
                  <span class="text-brand-orange font-medium text-sm">Rp {{ ongkirSetting.luarJawa?.toLocaleString('id-ID') }}</span>
                </label>
                <label class="flex flex-col p-4 bg-white border rounded-xl cursor-pointer transition-all hover:border-brand-orange sm:col-span-3" :class="form.ongkir.zona === 'ambil_sendiri' ? 'border-brand-orange shadow-md ring-1 ring-brand-orange/50' : 'border-brand-border/50'">
                  <div class="flex items-center gap-2 mb-2">
                    <input type="radio" v-model="form.ongkir.zona" value="ambil_sendiri" class="w-4 h-4 text-brand-orange accent-brand-orange" />
                    <span class="font-bold text-brand-brown text-sm">Ambil Sendiri di Kantor</span>
                  </div>
                  <span class="text-brand-orange font-medium text-sm">Gratis</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- DONASI SUKARELA -->
        <div class="bg-white shadow-sm border border-brand-border/50 rounded-[30px] p-8 md:p-10 relative overflow-hidden mt-8">
          <h2 class="font-display text-2xl text-brand-brown border-b border-brand-border/50 pb-4 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Donasi / Infaq Sukarela <span class="text-brand-muted text-lg font-sans normal-case italic">(Opsional)</span>
          </h2>
          <p class="text-sm text-brand-muted mb-6 leading-relaxed">Jika Anda berkenan, Anda dapat menyertakan infaq untuk mendukung kegiatan dakwah dan operasional program kami. Berapapun nilainya sangat berarti.</p>
          
          <div class="flex flex-col gap-2">
            <div class="relative w-full">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown font-bold text-sm">Rp</span>
              <input type="number" min="0" v-model="form.donasi" placeholder="0" class="input-field w-full !pl-12" />
            </div>
          </div>
        </div>

        <!-- Ringkasan Biaya & Submit -->
        <div class="bg-white shadow-xl border border-brand-border/50 rounded-[30px] p-8 md:p-10 relative overflow-hidden">
          <!-- Decorative accent -->
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <h2 class="font-display text-2xl text-brand-brown border-b border-brand-border/50 pb-4 mb-6 relative z-10 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">3</span>
            Ringkasan Biaya
          </h2>

          <div class="space-y-4">
            <div class="pb-4 border-b border-brand-border/50 border-dashed space-y-3">
              <p class="font-bold text-brand-brown mb-2 text-sm md:text-base">Pembelian Kitab</p>
              <div v-for="k in semuaKitabDibeli" :key="k.id" class="flex justify-between items-center text-sm">
                <span class="text-brand-muted line-clamp-1 pr-4">- {{ k.judul }} <span class="text-xs font-bold text-brand-orange">({{ k.qty }}x)</span></span>
                <span class="font-medium text-brand-brown whitespace-nowrap">Rp {{ ((k.harga ?? 0) * (k.qty ?? 1)).toLocaleString('id-ID') }}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center text-sm md:text-base pb-4 border-b border-brand-border/50 border-dashed">
              <div>
                <p class="font-bold text-brand-brown">Ongkos Kirim</p>
                <p v-if="form.ongkir.zona" class="text-brand-muted text-sm capitalize">Zona: {{ form.ongkir.zona.replace('_', ' ') }}</p>
                <p v-else class="text-red-500 text-xs mt-1 italic">Pilih zona ongkir di atas</p>
              </div>
              <span class="font-bold text-brand-brown">Rp {{ nominalOngkir.toLocaleString('id-ID') }}</span>
            </div>

            <div v-if="form.donasi > 0" class="flex justify-between items-center text-sm md:text-base pb-4">
              <p class="font-bold text-brand-brown">Donasi / Infaq Sukarela</p>
              <span class="font-bold text-brand-brown">Rp {{ form.donasi.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-end justify-between font-bold text-brand-brown mt-6 pt-6 border-t-2 border-brand-brown">
            <span class="text-lg mb-2 sm:mb-0 uppercase tracking-widest text-brand-muted">Total Pembayaran</span>
            <span class="text-brand-orange text-3xl md:text-4xl font-display">Rp {{ totalBayar.toLocaleString('id-ID') }}</span>
          </div>

          <div class="mt-8">
            <button 
              type="submit" 
              :disabled="isSubmitting || semuaKitabDibeli.length === 0 || !form.ongkir.zona" 
              class="w-full bg-brand-orange text-white font-bold tracking-widest uppercase text-sm py-5 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 shadow-brand-orange/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              {{ isSubmitting ? 'Memproses...' : 'Lanjut ke Pembayaran' }}
            </button>
          </div>

          <!-- Pending Invoice Info (Midtrans closed) -->
          <div v-if="pendingInvoice" class="bg-white text-brand-brown p-6 rounded-[20px] text-center border border-brand-orange/30 mt-6 shadow-sm">
            <div class="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-orange">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p class="font-bold text-lg mb-1">Menunggu Pembayaran</p>
            <p class="text-sm text-brand-muted mb-4">Pembelian kitab berhasil disimpan dengan nomor pesanan <strong class="text-brand-orange">{{ pendingInvoice }}</strong>. Silakan lanjutkan pembayaran.</p>
            <NuxtLink :to="`/cek-status?invoice=${pendingInvoice}`" class="inline-block w-full sm:w-auto bg-brand-orange text-white font-bold tracking-widest uppercase text-xs md:text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-all hover:shadow-lg shadow-brand-orange/20">
              Cek Status & Lanjutkan
            </NuxtLink>
          </div>

          <!-- Error Alert -->
          <div v-if="submitError" class="bg-red-50 text-red-600 p-6 rounded-[20px] text-center border border-red-200 mt-6">
            <p class="font-bold mb-1">Gagal Memproses Data</p>
            {{ submitError }}
          </div>
        </div>

      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#imports';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const route = useRoute();
const { $db } = useNuxtApp();
const db = $db as Firestore;

const availableKitabs = ref<any[]>([]); 
const ongkirSetting = ref<any>({ jogja: 15000, jawa: 25000, luarJawa: 45000 });
const isLoadingData = ref(true);
const dataError = ref('');

const selectedKitabIds = ref<string[]>([]);
const isSubmitting = ref(false);
const submitError = ref('');
const pendingInvoice = ref('');
const isSelectingKitab = ref(false);
const kitabQty = ref<Record<string, number>>({});

const form = ref({
  dataPeserta: {
    namaLengkap: '',
    email: '',
    noWa: '',
    alamatPengiriman: ''
  },
  ongkir: {
    zona: '',
    nominal: 0
  },
  donasi: 0
});

const semuaKitabDibeli = computed(() => {
  return availableKitabs.value
    .filter(k => selectedKitabIds.value.includes(k.id))
    .map(k => ({
      ...k,
      qty: kitabQty.value[k.id] || 1
    }));
});

const unselectedKitabs = computed(() => {
  return availableKitabs.value.filter(k => !selectedKitabIds.value.includes(k.id));
});

const nominalOngkir = computed(() => {
  if (!form.value.ongkir.zona || semuaKitabDibeli.value.length === 0) return 0;
  if (form.value.ongkir.zona === 'jogja') return ongkirSetting.value.jogja ?? 15000;
  if (form.value.ongkir.zona === 'jawa') return ongkirSetting.value.jawa ?? 25000;
  if (form.value.ongkir.zona === 'luar_jawa') return ongkirSetting.value.luarJawa ?? 45000;
  if (form.value.ongkir.zona === 'ambil_sendiri') return 0;
  return 0;
});

const totalBayar = computed(() => {
  const totalKitab = semuaKitabDibeli.value.reduce((acc, k) => acc + ((k.harga ?? 0) * (k.qty ?? 1)), 0);
  return totalKitab + nominalOngkir.value + (form.value.donasi || 0);
});

onMounted(async () => {
  const urlKitabIds = (route.query.kitabId as string)?.split(',') || [];
  
  try {
    const ongkirSnap = await getDoc(doc(db, 'settings', 'ongkir'));
    if (ongkirSnap.exists()) ongkirSetting.value = ongkirSnap.data();

    // Fetch active standalone kitabs
    const kQ = query(collection(db, 'kitabs'), where('status', '==', 'aktif'), where('bisaStandalone', '==', true));
    const kSnap = await getDocs(kQ);
    availableKitabs.value = kSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Auto-select based on query params
    urlKitabIds.forEach(id => {
      const exists = availableKitabs.value.find(k => k.id === id);
      if (exists && !selectedKitabIds.value.includes(id)) {
        selectedKitabIds.value.push(id);
        kitabQty.value[id] = 1;
      }
    });

    if (selectedKitabIds.value.length === 0) {
      dataError.value = 'Silakan pilih minimal 1 kitab dari halaman Daftar Kitab terlebih dahulu.';
    }
  } catch (e) {
    console.error('Failed to load data:', e);
    dataError.value = 'Terjadi kesalahan saat memuat data. Silakan muat ulang halaman.';
  } finally {
    isLoadingData.value = false;
  }
});

const removeKitab = (id: string) => {
  selectedKitabIds.value = selectedKitabIds.value.filter(k => k !== id);
  delete kitabQty.value[id];
};

const addKitab = (id: string) => {
  if (!selectedKitabIds.value.includes(id)) {
    selectedKitabIds.value.push(id);
    kitabQty.value[id] = 1;
  }
  isSelectingKitab.value = false;
};

const updateQty = (id: string, delta: number) => {
  const current = kitabQty.value[id] || 1;
  if (current + delta >= 1) {
    kitabQty.value[id] = current + delta;
  }
};

const submitForm = async () => {
  if (semuaKitabDibeli.value.length === 0 || !form.value.ongkir.zona) return;

  isSubmitting.value = true;
  submitError.value = '';
  pendingInvoice.value = '';

  const payload = {
    programId: null, // explicit null for standalone book purchase
    programNama: null,
    jadwalPilihan: null,
    dataPeserta: {
      namaLengkap: form.value.dataPeserta.namaLengkap,
      email: form.value.dataPeserta.email,
      noWa: form.value.dataPeserta.noWa,
      jenisKelamin: '-',
      tempatLahir: '-',
      tanggalLahir: '1970-01-01',
      domisili: '-',
      pekerjaan: '-',
      pernahBelajarBahasaArab: '',
      pernahIkutProgramMubk: false,
      alamatPengiriman: form.value.dataPeserta.alamatPengiriman
    },
    kitabDibeli: semuaKitabDibeli.value.map(k => ({
      kitabId: k.id,
      judul: k.judul,
      harga: k.harga,
      qty: k.qty || 1
    })),
    ongkir: { 
      zona: form.value.ongkir.zona, 
      nominal: nominalOngkir.value 
    },
    rincianBiaya: {
      biayaProgram: 0,
      totalHargaKitab: semuaKitabDibeli.value.reduce((acc, k) => acc + ((k.harga ?? 0) * (k.qty ?? 1)), 0),
      ongkir: nominalOngkir.value,
      donasi: form.value.donasi || 0,
      total: totalBayar.value
    }
  };

  try {
    const response = await $fetch('/api/pendaftaran', {
      method: 'POST',
      body: payload
    });

    const { snapToken, kodeInvoice } = response as any;
    if (typeof window !== 'undefined' && (window as any).snap) {
      (window as any).snap.pay(snapToken, {
        onSuccess: () => navigateTo(`/cek-status?invoice=${kodeInvoice}`),
        onPending: () => navigateTo(`/cek-status?invoice=${kodeInvoice}`),
        onError: () => { submitError.value = 'Terjadi error saat pembayaran. Silakan coba lagi.'; },
        onClose: () => {
          submitError.value = '';
          pendingInvoice.value = kodeInvoice;
        }
      });
    } else {
      navigateTo(`/cek-status?invoice=${kodeInvoice}`);
    }
  } catch (error: any) {
    submitError.value = error?.data?.message ?? error?.message ?? 'Terjadi kesalahan. Silakan coba lagi.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped lang="postcss">
.input-field {
  @apply px-5 py-3.5 text-sm rounded-xl border-2 border-brand-border/50 bg-brand-cream/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all w-full text-brand-brown font-medium;
}
.input-field::placeholder {
  @apply text-brand-muted/70 font-normal;
}
</style>
