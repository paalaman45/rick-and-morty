import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharactersView from '@/views/CharactersView.vue'
import CharacterView from '@/views/CharacterView.vue'
import EpisodeView from '@/views/EpisodeView.vue'
import EpisodesView from '@/views/EpisodesView.vue'
import LocationsView from '@/views/LocationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView,
    },
    {
      path: '/character/:id',
      name: 'character',
      component: CharacterView,
    },
    {
      path: '/locations/',
      name: 'locations',
      component: LocationsView,
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: EpisodesView,
    },
    {
      path: '/episode/:id',
      name: 'episode',
      component: EpisodeView,
    }
  ],
})

export default router
