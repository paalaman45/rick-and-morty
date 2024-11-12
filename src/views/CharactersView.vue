<template>
  <CharactersSections />
  <!-- <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="character in characters" :key="character.id">
        <RouterLink :to="{ path: `/character/${character.id}` }">
          <div class="relative">
            <div class="relative h-72 w-full overflow-hidden rounded-lg">
              <img :src="character.image" alt="character.name" class="h-full w-full object-cover object-center" />
            </div>
            <div class="relative mt-4">
              <h3 class="text-sm font-medium text-gray-900">{{ character.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">Gender: {{ character.gender }}</p>
              <p class="mt-1 text-sm text-gray-500">Species: {{ character.species }}</p>
              <p class="mt-1 text-sm text-gray-500">Origin: {{ character.origin.name }}</p>
            </div>
            <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
              <div :class="[
                'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium',
                character.status === 'Alive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                'md:mt-2 lg:mt-0'
              ]">{{ character.status }}
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div> -->

  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-4 mb-5">
      <div  v-for="character in characters" :key="character.id" class="relative overflow-hidden rounded-lg border bg-white select-none shadow hover:shadow-lg">
          <div class="flex flex-col justify-between rounded-md">
              <div class="space-y-2">
                  <div class="bg-gray-600 p-3 flex items-center justify-between">
                    <span class="relative inline-block">
                      <img class="h-16 w-16 rounded-full" :src="character.image" :alt="character.name" />
                      <span :class="['absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white', character.status === 'Alive' ? 'bg-green-400' : 'bg-red-400']" />
                    </span>
                    <div class="flex-col items-end flex">
                      <RouterLink :to="{ path: `/character/${character.id}` }"><h3 class="font-bold text-center text-white hover:text-gray-400 underline">{{ character.name }}</h3></RouterLink>
                      <span :class="['text-gray-300', character.status === 'Alive' ? 'text-green-400' : 'text-red-400']">{{ character.status }}</span>
                    </div>
                  </div>
                  <div class="p-2">
                    <div class="flex justify-between">
                      <p class="text-sm text-gray-600 text-center font-black">Gender</p>
                      <p class="text-sm text-emerald-300">{{ character.gender }}</p>
                    </div>
                    <div class="flex justify-between">
                      <p class="text-sm text-gray-600 text-center font-black">Species</p>
                      <p class="text-sm text-cyan-300">{{ character.species }}</p>
                    </div>
                    <div class="flex justify-between">
                      <p class="text-sm text-gray-600 text-center font-black">Origin</p>
                      <p class="text-sm text-purple-300">{{ character.origin.name }}</p>
                    </div>
                    <div class="flex justify-between">
                      <p class="text-sm text-gray-600 text-center font-black">Last Seen</p>
                      <p class="text-sm text-pink-300">{{ character.location.name }}</p>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div class="-mt-px flex w-0 flex-1">
        <button 
          @click="goToPreviousPage"
          :disabled="!pagination.prev"
          class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed">
          <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div class="hidden md:-mt-px md:flex">
        <span class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          Page {{ page }} of {{ pagination.pages }}
        </span>
      </div>
      <div class="-mt-px flex w-0 flex-1 justify-end">
        <button 
          @click="goToNextPage"
          :disabled="!pagination.next"
          class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed">
          Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref, watch } from 'vue';
  import CharactersSections from '@/components/CharactersSections.vue';
  import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

  const characters = ref([]);
  const page = ref(1);
  const pagination = ref({
    pages: 0,
    next: null,
    prev: null
  });

  async function fetchCharacter() {
    try {
      console.log("Fetching character data...");
      const response = await axios.get('https://rickandmortyapi.com/api/character?page=' + page.value);
      pagination.value = {
        pages: response.data.info.pages,
        next: response.data.info.next,
        prev: response.data.info.prev
      };
      characters.value = response.data.results;
      console.log("API response:", response.data.results);
    } catch (err) {
      console.error('Error fetching characters: ', err);
    }
  }

  watch(page, fetchCharacter, { immediate: true });

  function goToNextPage() {
    if (pagination.value.next) page.value++;
  }

  function goToPreviousPage() {
    if (pagination.value.prev) page.value--;
  }
</script>