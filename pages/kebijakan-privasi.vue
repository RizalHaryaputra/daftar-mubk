<template>
  <div class="bg-brand-cream font-sans selection:bg-brand-orange selection:text-white">

    <!-- HERO -->
    <div class="relative">
      <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-brand-deeper"></div>
      <section class="bg-brand-cream rounded-b-[40px] md:rounded-b-[80px] pt-12 pb-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div class="hidden md:block absolute top-16 left-16 text-brand-orange opacity-30">
          <svg class="w-20 h-20 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
          </svg>
        </div>
        <div class="max-w-2xl mx-auto z-10">
          <div class="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full px-4 py-1.5 mb-6">
            <div class="w-2 h-2 rounded-full bg-brand-orange"></div>
            <span class="text-brand-orange text-xs font-bold uppercase tracking-widest">Legal</span>
          </div>
          <h1 class="font-display text-5xl md:text-6xl text-brand-brown leading-tight tracking-tight mb-4">
            Kebijakan <span class="italic font-light text-brand-orange">Privasi</span>
          </h1>
          <p class="text-brand-muted text-base leading-relaxed">
            Data Anda adalah amanah yang kami jaga dengan penuh tanggung jawab.
          </p>
          <p class="text-brand-muted/60 text-sm mt-3">Terakhir diperbarui: Juli 2025</p>
        </div>
      </section>
    </div>

    <!-- DARK CONTENT -->
    <div class="bg-brand-deeper pb-24">

      <!-- Highlight Cards -->
      <section class="px-6 pt-16 pb-6 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white/5 border border-white/10 rounded-[20px] p-6 flex items-start gap-4">
            <div class="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p class="text-white font-bold text-sm">Data Tidak Diperjualbelikan</p>
              <p class="text-white/40 text-xs mt-1 leading-relaxed">Data Anda tidak pernah dijual ke pihak ketiga manapun.</p>
            </div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-[20px] p-6 flex items-start gap-4">
            <div class="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div>
              <p class="text-white font-bold text-sm">Penyimpanan Aman</p>
              <p class="text-white/40 text-xs mt-1 leading-relaxed">Data tersimpan di server Google Firebase yang terenkripsi.</p>
            </div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-[20px] p-6 flex items-start gap-4">
            <div class="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <p class="text-white font-bold text-sm">Penggunaan Terbatas</p>
              <p class="text-white/40 text-xs mt-1 leading-relaxed">Data hanya digunakan untuk keperluan operasional layanan.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="px-6 py-6 max-w-5xl mx-auto space-y-6">

        <!-- Intro -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <p class="text-white/70 leading-relaxed">
            Kebijakan Privasi ini menjelaskan bagaimana <strong class="text-white">Ma'had 'Umar bin Khattab (MUBK)</strong>, yang dikelola oleh <strong class="text-white">YPIA Academy</strong>, mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda. Kami berkomitmen untuk menjaga privasi Anda sesuai dengan peraturan perundang-undangan yang berlaku di Indonesia, termasuk UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi.
          </p>
        </div>

        <!-- Section 1 - Data yang Dikumpulkan -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Data yang Kami Kumpulkan</h2>
          </div>
          <p class="text-white/60 text-sm mb-5">Data pribadi yang Anda berikan saat mendaftar program atau membeli kitab, meliputi:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h4 class="text-brand-orange font-bold text-xs uppercase tracking-wider mb-3">Data Identitas</h4>
              <ul class="space-y-2 text-white/60 text-sm">
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Nama lengkap</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Jenis kelamin</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Tempat &amp; tanggal lahir</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Domisili / kota tinggal</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Pekerjaan</li>
              </ul>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h4 class="text-brand-orange font-bold text-xs uppercase tracking-wider mb-3">Data Kontak &amp; Transaksi</h4>
              <ul class="space-y-2 text-white/60 text-sm">
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Nomor WhatsApp</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Alamat email</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Alamat pengiriman (pembelian kitab)</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Riwayat transaksi pembayaran</li>
                <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0"></div>Program &amp; jadwal yang dipilih</li>
              </ul>
            </div>
          </div>
          <p class="text-white/50 text-sm mt-4 border-t border-white/10 pt-4">
            Kami <strong class="text-white">tidak</strong> mengumpulkan data sensitif seperti nomor rekening atau data kartu kredit/debit. Pembayaran ditangani sepenuhnya oleh Midtrans.
          </p>
        </div>

        <!-- Section 2 - Tujuan -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Tujuan Penggunaan Data</h2>
          </div>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed">
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              Memproses dan mengkonfirmasi pendaftaran program atau pembelian kitab.
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              Mengirimkan konfirmasi pembayaran, informasi jadwal, dan tautan grup WhatsApp kelas.
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              Memproses pengiriman kitab ke alamat yang Anda daftarkan.
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              Mengirimkan informasi nomor resi pengiriman dan pembaruan status pesanan.
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              Meningkatkan kualitas layanan dan pengalaman pengguna kami.
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              Menghubungi Anda terkait informasi program atau layanan yang relevan dari MUBK.
            </li>
          </ul>
        </div>

        <!-- Section 3 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Penyimpanan &amp; Keamanan Data</h2>
          </div>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed">
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Data Anda disimpan di <strong class="text-white">Google Firebase Firestore</strong>, yang menggunakan enkripsi standar industri baik saat transit maupun saat tersimpan (<em>at rest</em>).</span></li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Akses ke data pribadi Anda dibatasi hanya kepada anggota tim MUBK yang berwenang.</span></li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Data Anda akan disimpan selama akun/data pendaftaran Anda aktif atau selama dibutuhkan untuk pemenuhan kewajiban hukum.</span></li>
          </ul>
        </div>

        <!-- Section 4 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Berbagi Data dengan Pihak Ketiga</h2>
          </div>
          <p class="text-white/60 text-sm mb-5 leading-relaxed">Kami <strong class="text-white">tidak menjual, menyewakan, atau menukar</strong> data pribadi Anda. Data hanya dibagikan kepada mitra berikut sebatas yang diperlukan:</p>
          <div class="space-y-3">
            <div class="flex items-start gap-4 bg-white/5 rounded-2xl p-4">
              <div class="text-brand-orange font-bold text-sm min-w-[90px]">Midtrans</div>
              <div class="text-white/60 text-sm">Penyedia layanan pembayaran untuk memproses transaksi Anda secara aman.</div>
            </div>
            <div class="flex items-start gap-4 bg-white/5 rounded-2xl p-4">
              <div class="text-brand-orange font-bold text-sm min-w-[90px]">Jasa Kurir</div>
              <div class="text-white/60 text-sm">Nama dan alamat pengiriman diberikan kepada JNE, J&T, dll., untuk keperluan pengiriman kitab.</div>
            </div>
          </div>
          <p class="text-white/40 text-xs mt-4 leading-relaxed">Data dapat diungkapkan kepada otoritas pemerintah apabila diwajibkan oleh hukum atau perintah pengadilan.</p>
        </div>

        <!-- Section 5 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Hak Anda atas Data Pribadi</h2>
          </div>
          <p class="text-white/60 text-sm mb-5 leading-relaxed">Sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi, Anda memiliki hak untuk:</p>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed">
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span><strong class="text-white">Mengakses</strong> data pribadi Anda yang kami miliki.</span></li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span><strong class="text-white">Memperbarui atau mengoreksi</strong> data yang tidak akurat.</span></li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span><strong class="text-white">Meminta penghapusan</strong> data Anda, dengan ketentuan tidak bertentangan dengan kewajiban hukum kami.</span></li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span><strong class="text-white">Membatasi</strong> pemrosesan data Anda dalam kondisi tertentu.</span></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="bg-brand-brown border border-white/10 rounded-[24px] p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div class="flex-1">
            <p class="text-brand-orange text-xs font-bold uppercase tracking-widest mb-1">Pertanyaan Terkait Privasi?</p>
            <h3 class="font-display text-xl text-white mb-1">Hubungi tim kami</h3>
            <p class="text-white/50 text-sm">Kami siap menjawab pertanyaan terkait privasi data Anda.</p>
          </div>
          <div class="space-y-3">
            <a href="https://wa.me/6281392658080" target="_blank" class="flex items-center gap-3 text-sm">
              <div class="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <span class="text-white font-bold">+62 813-9265-8080</span>
            </a>
            <div class="flex items-center gap-3 text-sm">
              <div class="w-8 h-8 bg-brand-orange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span class="text-white font-bold">ypia.academy@gmail.com</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' });
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 16s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
