<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div>
    hello home

    <div v-if="authStore.user">
      {{ authStore.user }}
      {{ authStore.identity.getPrincipal().toString() }}
    </div>
  </div>
</template>
