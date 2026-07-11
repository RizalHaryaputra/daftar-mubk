<template>
  <div class="bg-brand-cream font-sans selection:bg-brand-orange selection:text-white">

    <!-- HERO -->
    <div class="relative">
      <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-brand-deeper"></div>
      <section class="bg-brand-cream rounded-b-[40px] md:rounded-b-[80px] pt-12 pb-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div class="hidden md:block absolute top-16 right-16 text-brand-orange opacity-30">
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
            Syarat &amp; <span class="italic font-light text-brand-orange">Ketentuan</span>
          </h1>
          <p class="text-brand-muted text-base leading-relaxed">
            Berlaku untuk seluruh layanan Ma'had 'Umar bin Khattab &mdash; YPIA Academy.
          </p>
          <p class="text-brand-muted/60 text-sm mt-3">Terakhir diperbarui: Juli 2026</p>
        </div>
      </section>
    </div>

    <!-- DARK CONTENT -->
    <div class="bg-brand-deeper pb-24">
      <section class="px-6 py-16 max-w-4xl mx-auto space-y-6">

        <!-- Intro -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <p class="text-white/70 leading-relaxed">
            Dengan mengakses dan menggunakan layanan Ma'had 'Umar bin Khattab (selanjutnya disebut <strong class="text-white">"MUBK"</strong> atau <strong class="text-white">"kami"</strong>), yang dikelola oleh <strong class="text-white">YPIA Academy</strong>, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat &amp; Ketentuan yang tercantum di bawah ini.
          </p>
        </div>

        <!-- Section 1 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Ketentuan Umum</h2>
          </div>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed pl-13">
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              MUBK menyelenggarakan program pembelajaran bahasa Arab intensif dan layanan pembelian kitab untuk mendukung kegiatan belajar mengajar.
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              Layanan mencakup pendaftaran program, pembelian kitab daring, serta informasi akademik melalui platform digital ini.
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              Kami berhak mengubah, memperbarui, atau menghentikan layanan sewaktu-waktu dengan pemberitahuan yang wajar.
            </li>
          </ul>
        </div>

        <!-- Section 2 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Pendaftaran Program</h2>
          </div>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed">
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              Peserta wajib mengisi formulir pendaftaran dengan data yang benar, lengkap, dan akurat.
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              Pendaftaran dianggap sah setelah pembayaran biaya program terverifikasi oleh sistem.
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              MUBK berhak menolak pendaftaran apabila ditemukan data palsu atau pelanggaran ketentuan ini.
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              Kuota terbatas — tempat dikonfirmasi berdasarkan urutan pembayaran yang terverifikasi (<em>first come first served</em>).
            </li>
          </ul>
        </div>

        <!-- Section 3 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Pembayaran</h2>
          </div>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed">
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              <span>Seluruh transaksi diproses melalui <strong class="text-white">Midtrans</strong>, penyedia pembayaran tersertifikasi yang diawasi oleh Bank Indonesia. MUBK tidak menyimpan data kartu Anda.</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              <span>Harga yang tercantum adalah harga final dalam Rupiah (IDR), belum termasuk ongkos kirim (jika ada).</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              <span>Bukti pembayaran yang sah adalah konfirmasi yang dikirim oleh sistem melalui email atau WhatsApp.</span>
            </li>
          </ul>
        </div>

        <!-- Section 4 - Refund - highlighted -->
        <div class="bg-brand-brown border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Kebijakan Pembatalan &amp; Refund</h2>
          </div>
          <div class="space-y-5">
            <div class="bg-white/10 rounded-2xl p-5">
              <h4 class="text-brand-orange font-bold text-sm uppercase tracking-wider mb-3">Biaya Pendaftaran Program</h4>
              <ul class="space-y-2 text-white/70 text-sm leading-relaxed">
                <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Biaya yang telah dibayarkan <strong class="text-white">tidak dapat dikembalikan (non-refundable)</strong>, digunakan untuk mempersiapkan materi, pengajar, dan sarana pembelajaran.</span></li>
                <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Pengembalian dana 100% dilakukan apabila <strong class="text-white">program dibatalkan oleh MUBK</strong> karena alasan internal atau force majeure.</span></li>
                <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Pemindahan jadwal dapat dilakukan satu kali, maksimal <strong class="text-white">3 hari sebelum program dimulai</strong>.</span></li>
              </ul>
            </div>
            <div class="bg-white/10 rounded-2xl p-5">
              <h4 class="text-brand-orange font-bold text-sm uppercase tracking-wider mb-3">Pembelian Kitab</h4>
              <ul class="space-y-2 text-white/70 text-sm leading-relaxed">
                <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Kitab yang telah dikirim <strong class="text-white">tidak dapat dikembalikan</strong>, kecuali terdapat kerusakan produk atau kesalahan pengiriman dari pihak kami.</span></li>
                <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Klaim wajib dilaporkan dalam <strong class="text-white">2×24 jam</strong> setelah paket diterima, disertai foto/video bukti.</span></li>
                <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div><span>Pengembalian dana diselesaikan dalam <strong class="text-white">7–14 hari kerja</strong> setelah klaim diverifikasi.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Section 5 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Kewajiban Peserta</h2>
          </div>
          <ul class="space-y-3 text-white/60 text-sm leading-relaxed">
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>Peserta wajib menjaga etika dan tata krama selama mengikuti program, baik tatap muka maupun daring.</li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>Peserta dilarang mendistribusikan atau memperjualbelikan materi pembelajaran tanpa izin tertulis dari MUBK.</li>
            <li class="flex items-start gap-3"><div class="w-1 h-1 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>Peserta yang melanggar ketentuan ini dapat dikeluarkan dari program tanpa pengembalian biaya.</li>
          </ul>
        </div>

        <!-- Section 6 -->
        <div class="bg-white/5 border border-white/10 rounded-[24px] p-8">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-9 h-9 bg-brand-orange text-brand-deeper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
            <h2 class="font-display text-xl md:text-2xl text-white">Perubahan Ketentuan</h2>
          </div>
          <p class="text-white/60 text-sm leading-relaxed">
            MUBK berhak memperbarui Syarat &amp; Ketentuan ini kapan saja. Perubahan akan diumumkan melalui platform kami dan/atau email. Penggunaan layanan secara berkelanjutan setelah perubahan diterbitkan dianggap sebagai persetujuan Anda terhadap ketentuan yang diperbarui.
          </p>
        </div>

        <!-- Contact -->
        <div class="bg-brand-brown border border-white/10 rounded-[24px] p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div class="flex-1">
            <p class="text-brand-orange text-xs font-bold uppercase tracking-widest mb-1">Ada Pertanyaan?</p>
            <h3 class="font-display text-xl text-white mb-1">Hubungi tim kami</h3>
            <p class="text-white/50 text-sm">Kami siap menjawab pertanyaan Anda.</p>
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
