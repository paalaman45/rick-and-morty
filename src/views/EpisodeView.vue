<template>
  <EpisodeSections />
  <div v-if="Found" class="bg-white">
    <div class="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden">
      <div class="px-5 py-2 flex flex-col gap-3 pb-6">
        <div class="mt-5">
          <h1 class="text-xl text-slate-900 relative font-bold leading-1 text-center">{{ EpName ?? '' }}</h1>
        </div>
        <div class="flex gap-3 flex-wrap">
          <span class="rounded-sm bg-yellow-100 px-3 py-1 text-lg font-medium text-yellow-800">{{ Ep ?? '' }}</span>
        </div>
        <h4 class="text-md font-medium leading-3">Air Date</h4>
        <p class="text-sm text-gray-600">{{ EpAirDate ?? '' }}</p>
        <h4 class="text-md font-medium leading-3">Characters</h4>
        <p class="text-sm text-gray-600">Character who are in this episodes.</p>
        <div class="flex flex-col gap-3">
          <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <li v-for="(character) in characterData" :key="character.id" class="col-span-1 flex rounded-md shadow">   
              <RouterLink :to="{ path: `/character/${character.Id}` }" class="flex w-full">
                <div class="flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                  <img :src="character.img">
                </div>
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <p class="font-medium text-gray-900 hover:text-gray-600">{{ character.name }}</p>
                  <p class="text-gray-500">{{ character.status +" - "+character.species }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <main v-else class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">404</p>
      <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Episode not found</h1>
      <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the episode you’re looking for.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link :to="{ name: 'episodes' }" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Go back
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
  import EpisodeSections from '@/components/EpisodeSections.vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';

  const router = useRoute();
  const episodeId = router.params.id;
  const Ep = ref(null);
  const EpName = ref(null);
  const EpAirDate = ref(null);
  const characters = ref([])
  const characterData = ref([]);
  const Found = ref(true);

  const getEpisodeData = async() => {
    try{
      const response = await axios.get('https://rickandmortyapi.com/api/episode/' + episodeId);
      Ep.value = response.data.episode;
      EpName.value = response.data.name;
      EpAirDate.value = response.data.air_date;
      characters.value = response.data.characters;
      // console.log(characters._rawValue);
      console.log(response.data);
    } catch(error){
      console.log("Error fetching: " + error);
      Found.value = false;
    }
    // Get all character data
    characters.value.map(character => {
      let Id = character.match(/\d+$/)[0];
      getCharacterData(Id);
    });
  }

  const getCharacterData= async(Id) => {
    try{
      const response = await axios.get('https://rickandmortyapi.com/api/character/' + Id);
      console.log("Character: " + response.data);
      let dataObj = {
        Id: response.data.id,
        name: response.data.name,
        img: response.data.image,
        species: response.data.species,
        status: response.data.status
      }
      characterData.value.push(dataObj);
    } catch( error) {
      console.log("Error fetching character data: " + error);
    }
  }

  onMounted(() => {
    if(episodeId){
      getEpisodeData();
    }
  });


</script>