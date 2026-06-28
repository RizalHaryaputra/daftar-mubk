<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-brand-brown text-white flex flex-col">
      <div class="p-6 border-b border-white/10">
        <span class="font-display text-brand-orange text-lg">Admin MUBK</span>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink to="/admin/dashboard" class="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white" active-class="bg-white/10 text-white">Dashboard</NuxtLink>
        <NuxtLink to="/admin/pendaftaran" class="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white" active-class="bg-white/10 text-white">Pendaftaran</NuxtLink>
        <NuxtLink to="/admin/program" class="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white" active-class="bg-white/10 text-white">Program</NuxtLink>
        <NuxtLink to="/admin/kitab" class="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white" active-class="bg-white/10 text-white">Kitab</NuxtLink>
        <NuxtLink to="/admin/ongkir" class="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white" active-class="bg-white/10 text-white">Ongkir</NuxtLink>
      </nav>
      <div class="p-4 border-t border-white/10">
        <button class="w-full px-4 py-2 text-left text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>
