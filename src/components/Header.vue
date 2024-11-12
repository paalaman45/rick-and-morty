<template>
  <header class="bg-white">
    <nav class="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
        <div class="flex items-center">
          <a href="/">
            <span class="sr-only">Your Company</span>
            <img class="h-10 w-auto" :src="brandUrl" alt="" />
          </a>
          <div class="ml-10 hidden space-x-8 lg:block">
            <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-gray-800 hover:text-gray-500">{{ link.name }}</a>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
        <RouterLink v-for="link in navigation" :key="link.name" :to="{ name: link.href }" class="text-base font-medium text-white hover:text-indigo-50">{{ link.name }}</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import brandUrl  from '../assets/image/brand-logo.png';

  const navigation = [
    { name: 'Character', href: 'characters' },
    { name: 'Location', href: 'locations' },
    { name: 'Episode', href: 'episodes' },
  ]
</script>