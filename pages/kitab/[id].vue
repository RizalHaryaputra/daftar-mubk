<template>
  <div class="space-y-6">
    <div class="bg-white border border-brand-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
      <!-- Cover Besar -->
      <div class="w-full md:w-64 h-80 bg-brand-brown rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
        <span class="font-serif text-6xl text-brand-orange/25 select-none">كتاب</span>
      </div>

      <!-- Informasi Kitab -->
      <div class="flex-1">
        <h1 class="font-display text-3xl text-brand-brown mb-2">Al-Ajurrumiyyah</h1>
        <p class="text-sm text-brand-muted mb-6">Oleh: Ibnu Ajurrum</p>

        <p class="font-sans text-2xl font-medium text-brand-orange mb-6">Rp 45.000</p>

        <div class="space-y-4 mb-8">
          <h2 class="font-display text-xl text-brand-brown">Deskripsi</h2>
          <p class="text-sm text-brand-muted leading-relaxed">
            Kitab dasar dalam mempelajari ilmu tata bahasa Arab (Nahwu). Kitab ini sangat populer dan menjadi rujukan utama bagi pemula di berbagai pesantren dan lembaga pendidikan bahasa Arab di seluruh dunia.
          </p>
        </div>

        <div class="flex gap-4">
          <AppButton variant="primary" @click="navigateTo('/pendaftaran?kitab=kitab-1')">Beli Kitab Saja</AppButton>
          <AppButton variant="outline" class="!text-brand-brown !border-brand-border hover:!bg-gray-50" @click="navigateTo('/kitab')">Kembali</AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
