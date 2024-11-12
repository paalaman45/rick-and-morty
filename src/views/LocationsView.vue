<template>
  <LocationHeader />
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-4 mb-5">
      <div v-for="location in locations" :key="location.id" class="relative overflow-hidden rounded-lg border bg-white select-none shadow hover:shadow-lg">
          <div class="flex flex-col justify-between rounded-md">
              <div class="space-y-2">
                  <h3 class="font-bold text-center py-2 bg-gray-600 text-white">{{ location.name }}</h3>
                  <div class="flex justify-between p-2">
                    <div class="flex-col">
                      <p class="text-sm text-gray-600 text-center font-black">TYPES</p>
                      <p class="text-sm text-red-400">{{ location.type }}</p>
                    </div>
                    <div class="flex-col">
                      <p class="text-sm text-gray-700 text-center font-black">DIMENSIONS</p>
                      <p class="text-sm text-teal-400">{{ location.dimension }}</p>
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
  import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';
  import LocationHeader from '@/components/LocationHeader.vue';

  import axios from 'axios';
  import { ref, watch } from 'vue';

  const locations = ref([]);

  const page = ref(1);
  const pagination = ref({
    pages: 0,
    next: null,
    prev: null
  });

  async function fetchLocations() {
    try {
      console.log("Fetching locations data...");
      const response = await axios.get('https://rickandmortyapi.com/api/location?page=' + page.value);
      locations.value = response.data.results;
      pagination.value = {
        pages: response.data.info.pages,
        next: response.data.info.next,
        prev: response.data.info.prev
      };
      console.log("API response:", response.data.results);
      console.log(response.data.info);
    } catch (err) {
      console.error('Error fetching characters: ', err);
    }
  }
  fetchLocations();

  watch(page, fetchLocations, { immediate: true });

  function goToNextPage() {
    if (pagination.value.next) page.value++;
  }

  function goToPreviousPage() {
    if (pagination.value.prev) page.value--;
  }

</script>