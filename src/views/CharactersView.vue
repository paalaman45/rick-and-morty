<template>
  <CharactersSections />
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
    <!-- OPEN -->
    <Disclosure as="section" aria-labelledby="filter-heading" class="grid items-center border-gray-200 mb-10">
      <h2 id="filter-heading" class="sr-only">Filters</h2>
      <div class="relative col-start-1 row-start-1 py-4">
        <div class="flex w-full space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
          <div>
            <DisclosureButton class="group flex items-center font-medium text-gray-700">
              <FunnelIcon class="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              2 Filters
            </DisclosureButton>
          </div>
          <div class="pl-6">
            <button type="button" class="text-gray-500">Clear all</button>
          </div>
        </div>
      </div>
      <DisclosurePanel class="border-t border-gray-200 py-10">
        <div class="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
          <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend class="block font-medium">Status</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div v-for="(option, optionIdx) in filters.price" :key="option.value" class="flex items-center text-base sm:text-sm">
                  <input :id="`price-${optionIdx}`" name="price[]" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
                  <label :for="`price-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">Species</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div v-for="(option, optionIdx) in filters.color" :key="option.value" class="flex items-center text-base sm:text-sm">
                  <input :id="`color-${optionIdx}`" name="color[]" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
                  <label :for="`color-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend class="block font-medium">Type</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div v-for="(option, optionIdx) in filters.size" :key="option.value" class="flex items-center text-base sm:text-sm">
                  <input :id="`size-${optionIdx}`" name="size[]" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
                  <label :for="`size-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">Gender</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div v-for="(option, optionIdx) in filters.category" :key="option.value" class="flex items-center text-base sm:text-sm">
                  <input :id="`category-${optionIdx}`" name="category[]" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
                  <label :for="`category-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <!-- CLOSE -->
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

  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon, FunnelIcon } from '@heroicons/vue/20/solid'

  const filters = {
  price: [
    { value: 'Alive', label: 'Alive', checked: false },
    { value: 'Dead', label: 'Dead', checked: false },
  ],
  color: [
    { value: 'Human', label: 'Human', checked: false },
    { value: 'Alien', label: 'Alien', checked: false },
    { value: 'Mythological Creature', label: 'Mythological Creature', checked: true },
    { value: 'Poopybutthole', label: 'Poopybutthole', checked: false },
    { value: 'Animal', label: 'Animal', checked: false },
    { value: 'Humanoid', label: 'Humanoid', checked: false },
    { value: 'Robot', label: 'Robot', checked: false },
    { value: 'Disease', label: 'Disease', checked: false },
    { value: 'Cronenberg', label: 'Cronenberg', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
    { value: 'female', label: 'Female', checked: false },
    { value: 'male', label: 'Male', checked: false },
    { value: 'genderless', label: 'Genderless', checked: false },
    { value: 'unknown', label: 'Unknown', checked: false },
  ],
}
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]
</script>