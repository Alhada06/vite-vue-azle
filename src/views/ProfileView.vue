<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { backend } from '../declarations/backend/index.js';
import { useAuthStore } from '../stores/auth';
import { useAlerts } from '../stores/useAlerts';
import { ic, Principal } from 'azle';
const authStore = useAuthStore();
const { identity } = storeToRefs(authStore);
const alerts = useAlerts();
const username = ref('');
const principal = computed(async () => await backend.caller());
const p2 = computed(() => identity.value);
const register = async () => {
  const newUser = await backend
    .createUser(username.value, identity.value.getPrincipal())
    .then(() => alerts.success('register'));
};
</script>
<template>
  <div>
    <div>{{ principal }}-----{{ p2 }}---- {{ identity?.getPrincipal() }}</div>
    <input
      type="text"
      required
      v-model="username"
      name="username"
      id="username"
    />
    <button @click="register" class="btn btn-primary">register</button>
  </div>
</template>
