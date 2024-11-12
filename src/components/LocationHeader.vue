<template>
  <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
      <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
      <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">{{ title }}</h2>
      <p class="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">{{ description }}</p>
    </div>
    <div class="flex justify-center mt-4">
      <nav class="flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div>
              <RouterLink :to="{ name: 'home' }" class="text-white hover:text-gray-200">
                <HomeIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
                <span class="sr-only">Home</span>
              </RouterLink>
            </div>
          </li>
          <li v-for="page in pages" :key="page.name">
            <div class="flex items-center">
              <svg class="h-5 w-5 shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <RouterLink :to="{ name: page.href }" class="ml-4 text-sm font-medium text-white hover:text-gray-200">{{ page.name }}</RouterLink>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>
  const title = "Locations";
  const description = "Explore all Rick and Morty Known Locations!";

  import { ref, onMounted } from 'vue';
  import { previousRouteName } from '@/router';

  import { HomeIcon } from '@heroicons/vue/20/solid'

  const pages = ref([ 
    { name: 'Locations', href: 'locations', current: false },
  ]);

  const previousPage = ref(previousRouteName);

  onMounted(() => {
    console.log('Previous route name:', previousPage.value);
    if(previousPage.value){
      const capitalizedPage = previousPage.value.charAt(0).toUpperCase() + previousPage.value.slice(1);
      pages.value.push({
        name: `${capitalizedPage}`, 
        href: previousPage.value,
        current: false,
      });
    }
    
  });
</script>