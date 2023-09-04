<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { backend } from '../declarations/backend/index.js';
import { useAuthStore } from '../stores/auth';
import { useAlerts } from '../stores/useAlerts';
import SvgSpinners8DotsRotate from '~icons/svg-spinners/8-dots-rotate';

import { ic, Principal } from 'azle';
const authStore = useAuthStore();
const { identity, user } = storeToRefs(authStore);
const alerts = useAlerts();
const router = useRouter();
const username = ref(user.value[0]?.username);
const principal = computed(async () => await backend.caller());
const p2 = computed(() => identity.value);
const updating = ref(false);
const isEditing = ref(false);
const updateProfile = async () => {
  updating.value = true;
  const newUser = await backend
    .createUser(username.value, identity.value.getPrincipal())
    .then((x) => {
      console.log(x);
      user.value = x;
      updating.value = false;
      isEditing.value = false;
      alerts.success('Update Successfull');
      router.push('/profile');
    });
};
</script>
<template>
  <div class="grid grid-cols-12 gap-4 h-full prose lg:prose-xl">
    <div class="col-start-2 col-span-9 bg-base-300 rounded">
      <div class="flex justify-center align-top mt-10 text-base-content">
        <h3>Profile</h3>
      </div>
      <div class="flex justify-center align-top mt-10 text-base-content">
        <p>Manage your information</p>
      </div>
      <div v-if="isEditing" class="flex flex-row justify-center">
        <form
          @submit.prevent="updateProfile"
          class="form-control w-full max-w-xs"
        >
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            required
            v-model="username"
            name="username"
            id="username"
            class="input input-bordered w-full max-w-xs"
          />
          <!-- <label class="label">
          <span class="label-text-alt">Bottom Left label</span>
          <span class="label-text-alt">Bottom Right label</span>
        </label> -->
          <div class="inline-flex justify-between">
            <button
              type="submit"
              class="btn btn-primary w-1/3 m-1 mt-10 justify-self-center"
            >
              <span v-if="updating"><SvgSpinners8DotsRotate /></span>
              <span v-else> Save </span>
            </button>
            <button
              @click="isEditing = !isEditing"
              class="btn btn-secondary w-1/3 m-1 mt-10 justify-self-center"
            >
              <span> Cancel </span>
            </button>
          </div>
        </form>
      </div>

      <div v-else class="flex flex-row justify-center">
        <div class="form-control w-full max-w-xs">
          <div class="flex justify-end">
            <button
              @click="isEditing = !isEditing"
              type="submit"
              class="btn btn-ghost w-1/6 mt-10"
            >
              <span> Edit </span>
            </button>
          </div>
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            required
            v-model="username"
            name="username"
            id="username"
            disabled
            class="input input-ghost w-full max-w-xs"
          />
          <!-- <label class="label">
          <span class="label-text-alt">Bottom Left label</span>
          <span class="label-text-alt">Bottom Right label</span>
        </label> -->
        </div>
      </div>
    </div>
  </div>
</template>
