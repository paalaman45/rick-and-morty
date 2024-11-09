<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="character in characters" :key="character.id" >
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
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const characters = ref([]);

  async function fetchCharacter() {
    try {
      console.log("Fetching character data...");
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      characters.value = response.data.results;
      console.log("API response:", response.data.results);
    } catch (err) {
      console.error('Error fetching characters: ', err);
    }
  }

  fetchCharacter();
</script>