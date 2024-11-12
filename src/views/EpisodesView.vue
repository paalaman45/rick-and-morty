<template>
  <EpisodeSections />
  <!-- OPEN -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-4 mb-5">
      <div v-for="episode in episodes" :key="episode.id" class="relative overflow-hidden rounded-lg border bg-white shadow hover:shadow-lg">
          <div class="flex flex-col justify-between rounded-md">
              <div class="space-y-2">
                  <RouterLink :to="{ path: `/episode/${episode.id}` }"><h3 class="font-bold text-center py-2 bg-gray-600 text-white underline">{{ episode.name }}</h3></RouterLink>
                  <div class="flex justify-between p-2">
                    <div class="flex-col">
                      <p class="text-sm text-gray-600 text-center font-black">AIR DATE</p>
                      <p class="text-sm text-red-400">{{ episode.air_date }}</p>
                    </div>
                    <div class="flex-col">
                      <p class="text-sm text-gray-700 text-center font-black">EPISODE</p>
                      <p class="text-sm text-teal-400">{{ episode.episode }}</p>
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
  import { ref, computed, watch  } from 'vue';

  import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';
  import EpisodeSections from '@/components/EpisodeSections.vue';

  const episodes = ref([]);
  const page = ref(1);
  const pagination = ref({
    pages: 0,
    next: null,
    prev: null
  });

  async function fetchEpisodes() {
    try {
      console.log("Fetching character data...");
      const response = await axios.get('https://rickandmortyapi.com/api/episode?page='+page.value);
      episodes.value = response.data.results;
      console.log("API response:", response.data.results);
      pagination.value = {
        pages: response.data.info.pages,
        next: response.data.info.next,
        prev: response.data.info.prev
      };
    } catch (err) {
      console.error('Error fetching episodes: ', err);
    }
  }

  const initials = computed(() => {
  const words = episode.name.trim().split(/\s+/);
  return words.length > 0
    ? words[0][0].toUpperCase() + (words.length > 1 ? words[1][0].toUpperCase() : '')
    : '';
  });

  watch(page, fetchEpisodes, { immediate: true });

  function goToNextPage() {
    if (pagination.value.next) page.value++;
  }

  function goToPreviousPage() {
    if (pagination.value.prev) page.value--;
  }
  
</script>