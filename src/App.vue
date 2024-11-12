<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import FooterSections from './components/FooterSections.vue';
</script>

<template>
  <Header />
  <RouterView />
  <FooterSections />
</template>

<style scoped>

</style>
