<template>
  <CharactersSections />
  <div class="bg-white">
    <div class="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2">
      <div class="px-5 py-2 flex flex-col gap-3 pb-6">
        <div class="w-full flex justify-center relative">
          <div class="relative z-10 h-[150px] shadow-md w-[150px] rounded-full border-4 overflow-hidden -mt-14 border-white"><img :src="character.image"></div>
        </div>
        <div class="">
          <h3 class="text-xl text-slate-900 relative font-bold leading-6 text-center">{{ character.name }}</h3>
        </div>
        <div class="flex gap-3 justify-center">
          <span class="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Gender: {{ character.gender }}</span>
          <span class="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Status: {{ character.status }}</span>
          <span class="rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Species: {{ character.species }}</span>
          <span class="rounded-sm bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">Origin: {{ origin ?? 'unknown' }}</span>
          <span class="rounded-sm bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">Locations: {{ location ?? 'unkown' }}</span>
        </div>
        <h4 class="text-md font-medium leading-3">Episodes</h4>
        <p class="text-sm text-gray-600">Episode where {{ character.name }} was seen in the series.</p>
        <div class="flex flex-col gap-3">
          <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <li v-for="(episode, index) in episodes" :key="episode.id" class="col-span-1 flex rounded-md shadow-sm">
              <RouterLink :to="{ path: `/episode/${episode.match(/\d+$/)[0]}` }" class="flex w-full">
                <div class="flex flex-1 items-center justify-between truncate rounded-l-md border-b border-l border-t border-gray-200 bg-white">
                  <div class="flex-1 truncate px-4 py-2 text-sm text-center">
                    <a class="font-medium text-gray-900 hover:text-gray-600">Episode</a>
                  </div>
                </div>
                <div :class="colors[index % colors.length]" class="flex w-16 shrink-0 items-center justify-center rounded-r-md text-sm font-medium text-white">
                  <p class="text-white">{{ episode.match(/\d+$/)[0] }}</p>
                </div>
              </RouterLink>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
  import CharactersSections from '@/components/CharactersSections.vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  
  const character = ref('');
  const route = useRoute();
  const router = useRouter();
  const characterId = route.params.id;
  const episodes = ref(null);
  const colors = ['bg-pink-600', 'bg-purple-600', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-red-500'];
  const location = ref(null);
  const origin = ref(null);

  console.log("Character ID: " +characterId);

  const getCharacterData = async() => {
    try{
      const response = await axios.get('https://rickandmortyapi.com/api/character/' + characterId);
      character.value = response.data;
      episodes.value = response.data.episode;
      location.value = response.data.location.name;
      origin.value = response.data.origin.name;

      console.log("API response:", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  onMounted(() => {
    if (characterId) {
      getCharacterData();
    }
    // router.push({ name: 'home' })
  });
</script>