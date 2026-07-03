<template>
  <div class="max-w-4xl mx-auto space-y-8 pb-20 pt-8 px-4">
    <div class="text-center mb-8">
      <h1 class="font-display text-4xl md:text-5xl text-brand-brown mb-4 font-bold tracking-tight">Formulir <span class="text-brand-orange italic">Pendaftaran</span></h1>
      <p class="text-brand-muted md:text-lg leading-relaxed">Lengkapi data diri Anda dengan teliti untuk proses pendaftaran ke Ma'had 'Umar bin Khattab.</p>
    </div>

    <!-- Loading program info -->
    <div v-if="isLoadingData" class="bg-white/50 border border-brand-border/50 rounded-[30px] p-10 animate-pulse space-y-4">
      <div class="h-4 bg-brand-cream rounded w-1/3"></div>
      <div class="h-8 bg-brand-cream rounded w-2/3"></div>
    </div>

    <!-- Error / Empty State -->
    <div v-else-if="dataError" class="bg-white/60 p-10 md:p-14 rounded-[40px] text-center border border-brand-border/50 max-w-2xl mx-auto shadow-sm">
      <div class="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      </div>
      <h2 class="font-display text-3xl text-brand-brown mb-3">Pilih Program Dahulu</h2>
      <p class="text-brand-muted mb-8 leading-relaxed text-sm md:text-base">Anda harus memilih program yang ingin diikuti sebelum mengisi formulir pendaftaran ini.</p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink to="/program" class="bg-brand-orange text-white font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">
          Lihat Daftar Program
        </NuxtLink>
        <NuxtLink to="/kitab" class="bg-brand-cream text-brand-brown font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full border border-brand-border hover:border-brand-orange transition-all hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">
          Beli Kitab Saja
        </NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- Wizard Progress Bar (Premium Pill Design) -->
      <div class="mb-10 bg-white border border-brand-border/50 rounded-full p-2 flex max-w-3xl mx-auto shadow-sm">
        <div class="relative flex w-full">
          
          <!-- Sliding active indicator -->
          <div class="absolute top-0 bottom-0 bg-brand-orange rounded-full transition-all duration-500 shadow-md"
               :style="{ width: '25%', left: `${(currentStep - 1) * 25}%` }"></div>
          
          <!-- Step 1 -->
          <div class="relative z-10 flex-1 text-center py-3.5 md:py-4 flex items-center justify-center gap-3 transition-colors duration-500"
               :class="currentStep === 1 ? 'text-white' : (currentStep > 1 ? 'text-brand-orange' : 'text-brand-muted')">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500" 
                 :class="currentStep === 1 ? 'bg-white/20' : (currentStep > 1 ? 'bg-brand-orange/10' : 'bg-brand-cream text-brand-brown')">
              <svg v-if="currentStep > 1" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              <span v-else>1</span>
            </div>
            <span class="text-[11px] uppercase tracking-widest font-bold hidden sm:block">Data Diri</span>
          </div>
          
          <!-- Step 2 -->
          <div class="relative z-10 flex-1 text-center py-3.5 md:py-4 flex items-center justify-center gap-3 transition-colors duration-500"
               :class="currentStep === 2 ? 'text-white' : (currentStep > 2 ? 'text-brand-orange' : 'text-brand-muted')">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500" 
                 :class="currentStep === 2 ? 'bg-white/20' : (currentStep > 2 ? 'bg-brand-orange/10' : 'bg-brand-cream text-brand-brown')">
              <svg v-if="currentStep > 2" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              <span v-else>2</span>
            </div>
            <span class="text-[11px] uppercase tracking-widest font-bold hidden sm:block">Tambahan</span>
          </div>
          
          <!-- Step 3 -->
          <div class="relative z-10 flex-1 text-center py-3.5 md:py-4 flex items-center justify-center gap-3 transition-colors duration-500"
               :class="currentStep === 3 ? 'text-white' : (currentStep > 3 ? 'text-brand-orange' : 'text-brand-muted')">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500" 
                 :class="currentStep === 3 ? 'bg-white/20' : (currentStep > 3 ? 'bg-brand-orange/10' : 'bg-brand-cream text-brand-brown')">
              <svg v-if="currentStep > 3" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              <span v-else>3</span>
            </div>
            <span class="text-[11px] uppercase tracking-widest font-bold hidden sm:block">Kitab</span>
          </div>
          
          <!-- Step 4 -->
          <div class="relative z-10 flex-1 text-center py-3.5 md:py-4 flex items-center justify-center gap-3 transition-colors duration-500"
               :class="currentStep === 4 ? 'text-white' : 'text-brand-muted'">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500" 
                 :class="currentStep === 4 ? 'bg-white/20' : 'bg-brand-cream text-brand-brown'">
              4
            </div>
            <span class="text-[11px] uppercase tracking-widest font-bold hidden sm:block">Selesai</span>
          </div>
          
        </div>
      </div>

      <!-- Info Program Terpilih (Show in all steps to remind user) -->
      <div v-if="selectedProgram" class="bg-brand-brown text-white rounded-[30px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl mb-10">
        <div>
          <p class="text-xs text-brand-orange uppercase tracking-widest font-bold mb-1">Program Pilihan</p>
          <p class="font-display text-2xl mb-1">{{ selectedProgram.nama }}</p>
          <p class="text-sm text-white/70">
            {{ Array.isArray(selectedProgram.jadwal) ? (selectedProgram.jadwal.length + ' Pilihan Jadwal') : selectedProgram.jadwal }} · Rp {{ selectedProgram.harga?.toLocaleString('id-ID') }}
          </p>
        </div>
        <NuxtLink :to="`/program/${selectedProgram.id}`" class="bg-brand-orange text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-orange-600 transition-colors text-center self-start md:self-center shrink-0">Ganti Program</NuxtLink>
      </div>

      <!-- The Form -->
      <form ref="formRef" @submit.prevent="submitForm" class="space-y-10">

        <!-- ============================== -->
        <!-- STEP 1: DATA DIRI              -->
        <!-- ============================== -->
        <div v-show="currentStep === 1">
          <div class="bg-white border border-brand-border rounded-[30px] p-8 md:p-10 shadow-sm">
            <h2 class="font-display text-2xl text-brand-brown border-b border-brand-border/50 pb-4 mb-8">Data Diri</h2>

            <div class="space-y-6">
              <!-- Pilihan Jadwal (Dynamic based on program) -->
              <div v-if="selectedProgram && Array.isArray(selectedProgram.jadwal) && selectedProgram.jadwal.length > 1" class="flex flex-col gap-3 pb-6 border-b border-brand-border/30">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Pilih Jadwal Pembelajaran <span class="text-brand-orange">*</span></label>
                <div class="flex flex-col gap-3">
                  <label v-for="(jadwalOpsi, idx) in selectedProgram.jadwal" :key="idx" class="flex items-center gap-3 text-sm cursor-pointer group bg-brand-cream/30 p-4 rounded-xl border border-brand-border/50 hover:border-brand-orange transition-colors">
                    <input type="radio" v-model="form.jadwalPilihan" :value="jadwalOpsi" class="w-5 h-5 text-brand-orange focus:ring-brand-orange border-brand-border" />
                    <span class="group-hover:text-brand-orange transition-colors font-medium text-brand-brown">{{ jadwalOpsi }}</span>
                  </label>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Nama Lengkap <span class="text-brand-orange">*</span></label>
                <input type="text" v-model="form.dataPeserta.namaLengkap" :required="currentStep === 1" placeholder="Fulan bin Fulan" class="input-field" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Email <span class="text-brand-orange">*</span></label>
                  <input type="email" v-model="form.dataPeserta.email" :required="currentStep === 1" placeholder="email@contoh.com" class="input-field" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">No. WhatsApp <span class="text-brand-orange">*</span></label>
                  <input type="tel" v-model="form.dataPeserta.noWa" :required="currentStep === 1" placeholder="08xxxxxxxxxx" class="input-field" />
                </div>
              </div>

              <div class="flex flex-col gap-3">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Jenis Kelamin <span class="text-brand-orange">*</span></label>
                <div class="flex gap-8">
                  <label class="flex items-center gap-3 text-sm cursor-pointer group">
                    <input type="radio" v-model="form.dataPeserta.jenisKelamin" value="laki-laki" :required="currentStep === 1" class="w-5 h-5 text-brand-orange focus:ring-brand-orange border-brand-border" />
                    <span class="group-hover:text-brand-orange transition-colors">Laki-laki</span>
                  </label>
                  <label class="flex items-center gap-3 text-sm cursor-pointer group">
                    <input type="radio" v-model="form.dataPeserta.jenisKelamin" value="perempuan" :required="currentStep === 1" class="w-5 h-5 text-brand-orange focus:ring-brand-orange border-brand-border" />
                    <span class="group-hover:text-brand-orange transition-colors">Perempuan</span>
                  </label>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Tempat Lahir <span class="text-brand-orange">*</span></label>
                  <input type="text" v-model="form.dataPeserta.tempatLahir" :required="currentStep === 1" placeholder="Kota kelahiran" class="input-field" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Tanggal Lahir <span class="text-brand-orange">*</span></label>
                  <input type="date" v-model="form.dataPeserta.tanggalLahir" :required="currentStep === 1" class="input-field" />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Domisili <span class="text-brand-orange">*</span></label>
                <input type="text" v-model="form.dataPeserta.domisili" :required="currentStep === 1" placeholder="Kota/Kabupaten domisili sekarang" class="input-field" />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Pekerjaan / Profesi <span class="text-brand-orange">*</span></label>
                <input type="text" v-model="form.dataPeserta.pekerjaan" :required="currentStep === 1" placeholder="Mahasiswa, Guru, Karyawan, dll." class="input-field" />
              </div>
            </div>
          </div>
        </div>

        <!-- ============================== -->
        <!-- STEP 2: DATA LAINNYA           -->
        <!-- ============================== -->
        <div v-show="currentStep === 2">
          <div class="bg-white border border-brand-border rounded-[30px] p-8 md:p-10 shadow-sm">
            <h2 class="font-display text-2xl text-brand-brown border-b border-brand-border/50 pb-4 mb-8">Data Lainnya</h2>

            <div class="space-y-8">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Pernah Belajar Bahasa Arab Sebelumnya?</label>
                <textarea v-model="form.dataPeserta.pernahBelajarBahasaArab" rows="3" placeholder="Ceritakan singkat, atau kosongkan jika belum pernah." class="input-field resize-none"></textarea>
              </div>

              <div class="flex flex-col gap-3">
                <label class="text-sm font-bold text-brand-brown uppercase tracking-wider">Pernah Mengikuti Program MUBK Sebelumnya?</label>
                <div class="flex gap-8">
                  <label class="flex items-center gap-3 text-sm cursor-pointer group">
                    <input type="radio" v-model="form.dataPeserta.pernahIkutProgramMubk" :value="true" class="w-5 h-5 text-brand-orange focus:ring-brand-orange border-brand-border" />
                    <span class="group-hover:text-brand-orange transition-colors">Ya</span>
                  </label>
                  <label class="flex items-center gap-3 text-sm cursor-pointer group">
                    <input type="radio" v-model="form.dataPeserta.pernahIkutProgramMubk" :value="false" class="w-5 h-5 text-brand-orange focus:ring-brand-orange border-brand-border" />
                    <span class="group-hover:text-brand-orange transition-colors">Tidak</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================== -->
        <!-- STEP 3: KITAB & PENGIRIMAN     -->
        <!-- ============================== -->
        <div v-show="currentStep === 3">
          <div class="space-y-10">
            <!-- PILIHAN KITAB TAMBAHAN -->
            <div v-if="availableKitabs.length > 0" class="bg-white border border-brand-border rounded-[30px] p-8 md:p-10 shadow-sm">
              <h2 class="font-display text-2xl text-brand-brown border-b border-brand-border/50 pb-4 mb-4">Kitab Tambahan <span class="text-brand-muted text-lg font-sans normal-case italic">(Opsional)</span></h2>
              <p class="text-sm text-brand-muted mb-8">Tambahkan kitab yang ingin Anda beli bersamaan dengan pendaftaran program.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="kitab in availableKitabs" :key="kitab.id" class="relative flex items-start gap-4 p-4 border border-brand-border rounded-[20px] hover:border-brand-orange hover:shadow-md transition-all">
                  <input
                    type="checkbox"
                    :id="`kitab-${kitab.id}`"
                    :value="kitab.id"
                    v-model="selectedKitabIds"
                    class="mt-1 w-5 h-5 rounded border-brand-border text-brand-orange focus:ring-brand-orange cursor-pointer"
                  />
                  <label :for="`kitab-${kitab.id}`" class="cursor-pointer flex-1">
                    <p class="text-base font-bold text-brand-brown leading-snug">{{ kitab.judul }}</p>
                    <p class="text-xs text-brand-muted uppercase tracking-widest mt-1 mb-2">{{ kitab.penulis }}</p>
                    <p class="text-sm font-bold text-brand-orange">Rp {{ kitab.harga?.toLocaleString('id-ID') }}</p>
                  </label>
                </div>
              </div>
            </div>

            <!-- PENGIRIMAN -->
            <div v-if="semuaKitabDibeli.length > 0" class="bg-brand-deeper text-white border border-brand-deeper rounded-[30px] p-8 md:p-10 shadow-xl relative overflow-hidden">
              <div class="absolute -top-24 -right-24 text-brand-orange/10 pointer-events-none">
                <svg class="w-64 h-64" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
                </svg>
              </div>
              
              <h2 class="font-display text-2xl border-b border-white/20 pb-4 mb-8 relative z-10">Alamat Pengiriman Kitab</h2>

              <div class="space-y-6 relative z-10">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-white/80 uppercase tracking-wider">Alamat Lengkap <span class="text-brand-orange">*</span></label>
                  <textarea v-model="form.dataPeserta.alamatPengiriman" :required="semuaKitabDibeli.length > 0 && currentStep === 3" rows="4" placeholder="Nama jalan, RT/RW, Desa/Kelurahan, Kecamatan, Kota/Kab, Provinsi, Kode Pos" class="px-5 py-4 text-sm rounded-xl border border-white/20 bg-white/5 focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-colors w-full text-white placeholder-white/30 resize-none"></textarea>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-white/80 uppercase tracking-wider">Zona Ongkos Kirim <span class="text-brand-orange">*</span></label>
                  <select v-model="form.ongkir.zona" :required="semuaKitabDibeli.length > 0 && currentStep === 3" class="px-5 py-4 text-sm rounded-xl border border-white/20 bg-white/5 focus:outline-none focus:border-brand-orange transition-colors w-full text-white appearance-none">
                    <option value="" class="text-black">Pilih zona pengiriman</option>
                    <option value="jogja" class="text-black">DI Yogyakarta — Rp {{ ongkirSetting.jogja?.toLocaleString('id-ID') }}</option>
                    <option value="jawa" class="text-black">Jawa Luar DIY — Rp {{ ongkirSetting.jawa?.toLocaleString('id-ID') }}</option>
                    <option value="luar_jawa" class="text-black">Luar Jawa — Rp {{ ongkirSetting.luarJawa?.toLocaleString('id-ID') }}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div v-else class="bg-brand-cream/30 border border-brand-border rounded-[30px] p-8 md:p-10 text-center text-brand-muted">
              Tidak ada kitab yang dibeli. Anda dapat melanjutkan ke ringkasan biaya.
            </div>
          </div>
        </div>

        <!-- ============================== -->
        <!-- STEP 4: RINGKASAN BIAYA        -->
        <!-- ============================== -->
        <div v-show="currentStep === 4">
          <div class="bg-white shadow-xl border border-brand-border/50 rounded-[30px] p-8 md:p-10 relative overflow-hidden">
            <!-- Decorative accent -->
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <h2 class="font-display text-2xl text-brand-brown border-b border-brand-border/50 pb-4 mb-6 relative z-10">Ringkasan Biaya</h2>

            <div class="space-y-4">
              <div v-if="selectedProgram" class="flex justify-between items-start text-sm md:text-base pb-4 border-b border-brand-border/50 border-dashed">
                <div>
                  <p class="font-bold text-brand-brown">Program</p>
                  <p class="text-brand-muted text-sm">{{ selectedProgram.nama }}</p>
                  <p v-if="form.jadwalPilihan" class="text-brand-orange text-xs mt-1">Jadwal: {{ form.jadwalPilihan }}</p>
                </div>
                <span class="font-bold text-brand-brown whitespace-nowrap">Rp {{ selectedProgram.harga?.toLocaleString('id-ID') }}</span>
              </div>
              
              <div v-if="semuaKitabDibeli.length > 0" class="pb-4 border-b border-brand-border/50 border-dashed space-y-3">
                <p class="font-bold text-brand-brown mb-2 text-sm md:text-base">Kitab</p>
                <div v-for="k in semuaKitabDibeli" :key="k.id" class="flex justify-between text-sm items-center">
                  <span class="text-brand-muted line-clamp-1 pr-4">- {{ k.judul }}</span>
                  <span class="font-medium text-brand-brown whitespace-nowrap">Rp {{ k.harga?.toLocaleString('id-ID') }}</span>
                </div>
              </div>
              
              <div v-if="semuaKitabDibeli.length > 0 && form.ongkir.zona" class="flex justify-between items-center text-sm md:text-base pb-4">
                <div>
                  <p class="font-bold text-brand-brown">Ongkos Kirim</p>
                  <p class="text-brand-muted text-sm capitalize">Zona: {{ form.ongkir.zona.replace('_', ' ') }}</p>
                </div>
                <span class="font-bold text-brand-brown">Rp {{ nominalOngkir.toLocaleString('id-ID') }}</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-end justify-between font-bold text-brand-brown mt-6 pt-6 border-t-2 border-brand-brown">
              <span class="text-lg mb-2 sm:mb-0 uppercase tracking-widest text-brand-muted">Total Pembayaran</span>
              <span class="text-brand-orange text-3xl md:text-4xl font-display">Rp {{ totalBayar.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>

        <!-- Validation Error Message -->
        <div v-if="validationError" class="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200 font-medium">
          {{ validationError }}
        </div>

        <!-- Wizard Navigation Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            type="button" 
            v-if="currentStep > 1" 
            @click="prevStep" 
            class="w-full sm:w-1/3 bg-white text-brand-brown font-bold tracking-widest uppercase text-sm py-5 rounded-full hover:bg-orange-50 transition-all border border-brand-border shadow-sm">
            Kembali
          </button>
          
          <button 
            type="button" 
            v-if="currentStep < 4" 
            @click="nextStep" 
            class="w-full bg-brand-orange text-white font-bold tracking-widest uppercase text-sm py-5 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20"
            :class="currentStep > 1 ? 'sm:w-2/3' : 'sm:w-full'">
            Selanjutnya
          </button>

          <button 
            type="submit" 
            v-if="currentStep === 4" 
            :disabled="isSubmitting" 
            class="w-full sm:w-2/3 bg-brand-orange text-white font-bold tracking-widest uppercase text-sm py-5 rounded-full hover:bg-orange-600 transition-all hover:shadow-xl hover:-translate-y-1 shadow-brand-orange/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {{ isSubmitting ? 'Memproses...' : 'Lanjut ke Pembayaran' }}
          </button>
        </div>

        <!-- Submit Error Submission -->
        <div v-if="submitError" class="bg-red-50 text-red-600 p-6 rounded-[20px] text-center border border-red-200 mt-4">
          <p class="font-bold mb-1">Gagal Memproses Data</p>
          {{ submitError }}
        </div>

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

// State Wizard
const currentStep = ref(1);
const formRef = ref<HTMLFormElement | null>(null);
const validationError = ref('');

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
  jadwalPilihan: '',
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

      // Auto-select jadwal jika hanya ada 1 opsi atau masih string
      if (Array.isArray(selectedProgram.value.jadwal)) {
        if (selectedProgram.value.jadwal.length === 1) {
          form.value.jadwalPilihan = selectedProgram.value.jadwal[0];
        }
      } else if (typeof selectedProgram.value.jadwal === 'string') {
        form.value.jadwalPilihan = selectedProgram.value.jadwal;
      }

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

// Wizard Navigation Methods
const nextStep = () => {
  validationError.value = '';
  
  // Custom Validation Logic per step
  if (currentStep.value === 1) {
    const { namaLengkap, email, noWa, jenisKelamin, tempatLahir, tanggalLahir, domisili, pekerjaan } = form.value.dataPeserta;
    if (!namaLengkap || !email || !noWa || !jenisKelamin || !tempatLahir || !tanggalLahir || !domisili || !pekerjaan) {
      validationError.value = 'Mohon lengkapi semua isian wajib (*) di Data Diri.';
      return;
    }
    if (selectedProgram.value && !form.value.jadwalPilihan) {
      validationError.value = 'Mohon pilih Jadwal Pembelajaran yang tersedia.';
      return;
    }
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationError.value = 'Format email tidak valid.';
      return;
    }
  }

  if (currentStep.value === 3) {
    if (semuaKitabDibeli.value.length > 0) {
      if (!form.value.dataPeserta.alamatPengiriman) {
        validationError.value = 'Alamat pengiriman wajib diisi karena ada pengiriman kitab.';
        return;
      }
      if (!form.value.ongkir.zona) {
        validationError.value = 'Zona ongkos kirim wajib dipilih.';
        return;
      }
    }
  }

  // Go next if valid
  if (currentStep.value < 4) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevStep = () => {
  validationError.value = '';
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const submitForm = async () => {
  // Final validation just in case
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

<style scoped lang="postcss">
.input-field {
  @apply px-5 py-3.5 text-sm rounded-xl border-2 border-brand-border/50 bg-brand-cream/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all w-full text-brand-brown font-medium;
}
.input-field::placeholder {
  @apply text-brand-muted/70 font-normal;
}
</style>
