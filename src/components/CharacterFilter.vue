<template>
<Disclosure as="section" aria-labelledby="filter-heading" class="grid items-center border-gray-200 mb-10">
  <h2 id="filter-heading" class="sr-only">Filters</h2>
  <div class="relative col-start-1 row-start-1 py-4">
    <div class="flex w-full space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
      <div>
        <DisclosureButton class="group flex items-center font-medium text-gray-700">
          <FunnelIcon class="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          {{ countSelectedFilters }} Filters
        </DisclosureButton>
      </div>
      <div class="pl-6">
        <button type="button" class="text-gray-500" @click="clearCheckbox">Clear all</button>
      </div>
    </div>
  </div>
  <DisclosurePanel class="border-t border-gray-200 py-10">
    <div class="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
      <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
        <fieldset>
          <legend class="block font-medium">Status</legend>
          <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
            <div v-for="(option, optionIdx) in filters.status" :key="option.value" class="flex items-center text-base sm:text-sm">
              <input v-model="option.checked" @change="toggleSingleCheckbox('status', option)" :id="`price-${optionIdx}`" name="status" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
              <label :for="`price-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="block font-medium">Species</legend>
          <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
            <div v-for="(option, optionIdx) in filters.species" :key="option.value" class="flex items-center text-base sm:text-sm">
              <input v-model="option.checked" @change="toggleSingleCheckbox('species', option)" :id="`color-${optionIdx}`" name="species" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
              <label :for="`color-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
        <fieldset>
          <legend class="block font-medium">Type</legend>
          <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
            <div v-for="(option, optionIdx) in filters.type" :key="option.value" class="flex items-center text-base sm:text-sm">
              <input v-model="option.checked" @change="toggleSingleCheckbox('type', option)" :id="`size-${optionIdx}`" name="type" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
              <label :for="`size-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="block font-medium">Gender</legend>
          <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
            <div v-for="(option, optionIdx) in filters.gender" :key="option.value" class="flex items-center text-base sm:text-sm">
              <input v-model="option.checked" @change="toggleSingleCheckbox('gender', option)" :id="`category-${optionIdx}`" name="gender" :value="option.value" type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
              <label :for="`category-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{ option.label }}</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </DisclosurePanel>
</Disclosure>
</template>

<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon, FunnelIcon } from '@heroicons/vue/20/solid'

  import { defineEmits, reactive, ref, computed } from 'vue';
  const emit = defineEmits(['filterApplied']);
  const selectedFilters = ref({});

  function clearCheckbox()
  {
    for (const filterType in filters) {
      filters[filterType].forEach(option => {
        option.checked = false; // Uncheck each option
      });
    }
    applyFilters();
  }

  function toggleSingleCheckbox(filterType, selectedOption) {
    filters[filterType].forEach(option => {
      option.checked = option === selectedOption;
    });
    applyFilters();
  }

  function applyFilters() {
    selectedFilters.value = {};

    for (const [filterType, options] of Object.entries(filters)) {
      selectedFilters.value[filterType] = options
        .filter(option => option.checked)
        .map(option => option.value);

      console.log("Filter Type: " + filterType);
      console.log(options);
    }
    emit('filterApplied', selectedFilters.value); 
  }

  // Function to count selected filters
const countSelectedFilters = computed(() => {
  let count = 0;

  // Iterate over each filter type and add up checked options
  for (const options of Object.values(selectedFilters.value)) {
    count += options.length;
  }

  return count;
});

  const filters = reactive({
    status: [
      { value: 'Alive', label: 'Alive', checked: false },
      { value: 'Dead', label: 'Dead', checked: false },
    ],
    species: [
      { value: 'Human', label: 'Human', checked: false },
      { value: 'Alien', label: 'Alien', checked: false },
      { value: 'Mythological Creature', label: 'Mythological Creature', checked: false },
      { value: 'Poopybutthole', label: 'Poopybutthole', checked: false },
      { value: 'Animal', label: 'Animal', checked: false },
      { value: 'Humanoid', label: 'Humanoid', checked: false },
      { value: 'Robot', label: 'Robot', checked: false },
      { value: 'Disease', label: 'Disease', checked: false },
      { value: 'Cronenberg', label: 'Cronenberg', checked: false },
    ],
    type: [
      { value: 'Genetic experiment', label: 'Genetic experiment', checked: false },
      { value: 'Superhuman (Ghost trains summoner)', label: 'Superhuman (Ghost trains summoner)', checked: false },
      { value: 'Human with antennae', label: 'Human with antennae', checked: false },
      { value: 'Human with ants in his eyes', label: 'Human with ants in his eyes', checked: false },
      { value: 'Bepisian', label: 'Bepisian', checked: false },
      { value: 'Cromulon', label: 'Cromulon', checked: false },
      { value: 'Cat-Person', label: 'Cat-Person', checked: false },
      { value: 'Human with baby legs', label: 'Human with baby legs', checked: false },
    ],
    gender: [
      { value: 'female', label: 'Female', checked: false },
      { value: 'male', label: 'Male', checked: false },
      { value: 'genderless', label: 'Genderless', checked: false },
      { value: 'unknown', label: 'Unknown', checked: false },
    ],
  });
  applyFilters();
</script>