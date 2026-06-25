<template>
  <div class="space-y-6">
    <div class="bg-white border border-brand-border rounded-xl overflow-hidden">
      <div class="bg-brand-brown h-48 relative flex items-center justify-center overflow-hidden">
        <span class="font-serif text-7xl text-brand-orange/25 select-none z-0">ن</span>
        <span class="absolute top-4 right-4 z-10 bg-brand-orange text-white text-xs font-medium px-3 py-1 rounded">
          Buka Pendaftaran
        </span>
      </div>

      <div class="p-6 md:p-8">
        <p class="text-brand-orange text-xs font-medium uppercase tracking-widest mb-2">Pemula</p>
        <h1 class="font-display text-3xl text-brand-brown mb-4">Nahwu Dasar Intensif</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-6 border-t border-brand-border">
          <div>
            <p class="text-xs text-brand-muted mb-1 uppercase tracking-widest">Jadwal</p>
            <p class="text-sm font-medium text-brand-brown">Senin & Rabu<br>19.30 - 21.00 WIB</p>
          </div>
          <div>
            <p class="text-xs text-brand-muted mb-1 uppercase tracking-widest">Durasi</p>
            <p class="text-sm font-medium text-brand-brown">3 Bulan<br>24 Pertemuan</p>
          </div>
          <div>
            <p class="text-xs text-brand-muted mb-1 uppercase tracking-widest">Biaya</p>
            <p class="text-sm font-medium text-brand-brown">Rp 250.000<br><span class="text-xs text-brand-muted font-normal">Per Program</span></p>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="font-display text-xl text-brand-brown">Deskripsi Program</h2>
          <p class="text-sm text-brand-muted leading-relaxed">
            Program ini dirancang khusus bagi pemula yang belum pernah belajar bahasa Arab. Anda akan diajarkan dasar-dasar ilmu nahwu menggunakan kitab Al-Ajurrumiyyah dengan metode yang mudah dipahami.
          </p>
        </div>

        <div class="mt-8 pt-8 border-t border-brand-border">
          <h2 class="font-display text-xl text-brand-brown mb-4">Kitab Wajib</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardKitab :kitab="{ id: 'kitab-1', judul: 'Al-Ajurrumiyyah', penulis: 'Ibnu Ajurrum', harga: 45000, bisaStandalone: false, gambarUrl: null }" />
          </div>
        </div>

        <div class="mt-8 flex justify-end">
          <AppButton variant="primary" @click="navigateTo('/pendaftaran?program=prog-1')">
            Daftar Program Ini
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
