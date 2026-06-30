<template>
  <div class="bg-brand-cream min-h-screen font-sans flex flex-col">
    <AppNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
