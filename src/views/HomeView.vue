<template>
  <HeaderSection />
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <ul role="list" class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <li v-for="menu in menus" :key="menu.name" class="shadow">
          <RouterLink :to="{ name: menu.route }">
            <img class="aspect-[3/2] w-full rounded-2xl object-cover" :src="menu.imageUrl" alt="" />
            <div class="p-2">
              <h1 class="p-2 mt-2 text-base/7 font-semibold text-indigo-400 text-center">{{ menu.name }}</h1>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import HeaderSection from '../components/HeaderSections.vue';
  const menus = [
    {
      name: 'Character',
      imageUrl: 'https://preview.redd.it/vvqmllp8ouq71.png?width=1080&crop=smart&auto=webp&s=5ed22a155337ba382f7add097536e1a13f999228',
      route: 'characters'
    },
    {
      name: 'Location',
      imageUrl: 'https://i.pinimg.com/originals/01/61/34/0161349c1ec598df272bb8dca5d303ae.jpg',
      route: 'locations'
    },
    {
      name: 'Episode',
      imageUrl: 'https://m.media-amazon.com/images/I/717d6b3Y5BL._AC_UF894,1000_QL80_.jpg',
      route: 'episodes'
    }
  ]
</script>