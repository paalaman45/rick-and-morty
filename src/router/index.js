// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CharactersView from '@/views/CharactersView.vue';
import CharacterView from '@/views/CharacterView.vue';
import EpisodeView from '@/views/EpisodeView.vue';
import EpisodesView from '@/views/EpisodesView.vue';
import LocationsView from '@/views/LocationsView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/characters', name: 'characters', component: CharactersView },
  { path: '/character/:id', name: 'character', component: CharacterView },
  { path: '/locations', name: 'locations', component: LocationsView },
  { path: '/episodes', name: 'episodes', component: EpisodesView },
  { path: '/episode/:id', name: 'episode', component: EpisodeView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

let previousRouteName = ''; // Variable to store previous route name

// Set up the beforeEach hook on the main router instance
router.beforeEach((to, from, next) => {
  previousRouteName = from.name || ''; // Store previous route name
  next();
});

// Export the previous route name and the default router
export { previousRouteName };
export default router;
