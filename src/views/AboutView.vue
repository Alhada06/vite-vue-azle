<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const { isReady, identity, isAuthenticated } = storeToRefs(authStore);
</script>

<template>
  <div>
    <h1>This is an about page</h1>
    {{ identity?.getPrincipal() }}
    <button
      v-if="isAuthenticated"
      @click="authStore.logout()"
      class="btn btn-primary"
    >
      Log out
    </button>
    <button v-else @click="authStore.login()" class="btn btn-primary">
      Log in
    </button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
