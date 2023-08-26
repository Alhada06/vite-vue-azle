<script setup lang="ts">
import './App.css';
import { RouterLink, RouterView } from 'vue-router';
import Counter from './components/Counter.vue';
import AppAlerts from './components/AppAlerts.vue';
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';
import Navbar from './components/Navbar.vue';
const authStore = useAuthStore();
const { isReady } = storeToRefs(authStore);
if (isReady.value === false) {
  authStore.init();
}
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
  <AppAlerts />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.svelte:hover {
  filter: drop-shadow(0 0 2em #ff3e00aa);
}
.read-the-docs {
  color: #888;
}
</style>
