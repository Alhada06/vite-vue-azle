<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useAlerts } from '../stores/useAlerts';
const authStore = useAuthStore();
const { isReady, identity, isAuthenticated, principal } =
  storeToRefs(authStore);
const alertsStore = useAlerts();

const prin = ref(identity.value.getPrincipal());
const { alerts } = storeToRefs(alertsStore);
</script>

<template>
  <div>
    <h1>This is an about page</h1>
    {{ identity?.getPrincipal() }}
    {{ principal?.toString() }}
    {{ prin }}
    {{ alerts }}
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

    <button @click="alertsStore.success('sucesso')" class="btn btn-primary">
      teste
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
