<template>
  <div class="bg-brand-cream min-h-screen font-sans">
    <AppNavbar />
    <main class="max-w-5xl mx-auto px-4 py-6 space-y-3">
      <slot />
    </main>
    <div class="max-w-5xl mx-auto px-4 pb-6">
      <AppFooter />
    </div>
  </div>
</template>
