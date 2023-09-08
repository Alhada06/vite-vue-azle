<script setup lang="ts">
import MdiAccountCircleOutline from '~icons/mdi/account-circle-outline';
import MdiAccountCogOutline from '~icons/mdi/account-cog-outline';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const {
  isReady,
  isRegistered,
  isAuthenticated,
  user,
  userActor,
  balance,
  identity,
} = storeToRefs(authStore);

const userObj = computed(() => (user.value != null ? user.value[0] : null));
const test = () => {
  console.log(balance.value);
  console.log(identity.value.getPrincipal().toString());
};
</script>

<template>
  <div class="navbar bg-base-300 top-0 fixed">
    <div class="flex-1">
      <!-- <a class="btn btn-ghost normal-case text-xl">daisyUI</a> -->
      <router-link class="btn btn-ghost normal-case text-xl" to="/"
        >Experience</router-link
      >
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost">
          <div class="inline-flex">
            {{ balance }}
            <span class="badge badge-xs badge-primary mx-2">Exp</span>
          </div>
        </label>
      </div>
      <div v-if="isAuthenticated" class="dropdown dropdown-end mx-1 px-1">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <!-- <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> -->
            <MdiAccountCircleOutline class="w-full h-full" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li class="px-1" v-if="userObj">Hello {{ userObj.username }}</li>
          <li>
            <router-link to="/profile" class="justify-between">
              Profile
              <span><MdiAccountCogOutline /></span>
            </router-link>
          </li>

          <li @click="authStore.logout"><a>Logout</a></li>
        </ul>
      </div>
      <div v-else>
        <button @click="authStore.login()" class="btn btn-primary">
          Log in
        </button>
      </div>
    </div>
  </div>
</template>
