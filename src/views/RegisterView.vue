<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { backend } from '../declarations/backend/index.js';
import { useAuthStore } from '../stores/auth';
import { useAlerts } from '../stores/useAlerts';
import SvgSpinners8DotsRotate from '~icons/svg-spinners/8-dots-rotate';

import { ic, Principal } from 'azle';
import {
  ICRC1Account,
  ICRC1TransferArgs,
} from '../declarations/backend/backend.did';
const authStore = useAuthStore();
const { identity, user, userActor } = storeToRefs(authStore);
const alerts = useAlerts();
const router = useRouter();
const username = ref('');
const principal = computed(async () => await backend.caller());
const p2 = computed(() => identity.value);
const registering = ref(false);
const register = async () => {
  registering.value = true;
  const newUser = await backend
    .createUser(username.value, identity.value.getPrincipal())
    .then(async (x) => {
      console.log(x);
      user.value = x;
      //send tokens
      const to: ICRC1Account = {
        owner: identity.value.getPrincipal(),
        subaccount: [],
      };
      const amount = BigInt(1000 * 10 ** 8);
      const transferArgs: ICRC1TransferArgs = {
        to,
        amount,
        from_subaccount: [],
        fee: [],
        memo: [],
        created_at_time: [],
      };
      await backend
        .icrc1_transfer(transferArgs)
        .then(() => {
          registering.value = false;
          alerts.success('Registration Successfull');
          router.push('/');
        })
        .catch((err) => console.log(err));
    });
};

// const sendTokens = () => {
//   const to: ICRC1Account = {
//     owner: identity.value.getPrincipal(),
//     subaccount: [],
//   };
//   const amount = BigInt(1000 * 10 ** 8);
//   const transferArgs: ICRC1TransferArgs = {
//     to,
//     amount,
//     from_subaccount: [],
//     fee: [],
//     memo: [],
//     created_at_time: [],
//   };
// };
</script>
<template>
  <div class="grid grid-cols-12 gap-4 h-full prose lg:prose-xl">
    <div class="col-start-2 col-span-9 bg-base-300 rounded">
      <div class="flex justify-center align-top mt-10 text-base-content">
        <h3>Welcome</h3>
      </div>
      <div class="flex justify-center align-top mt-10 text-base-content">
        <p>Please fill out your information and register</p>
      </div>
      <div class="flex flex-row justify-center">
        <form @submit.prevent="register" class="form-control w-full max-w-xs">
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
          <button
            type="submit"
            class="btn btn-primary w-1/2 mt-10 justify-self-center"
          >
            <span v-if="registering"><SvgSpinners8DotsRotate /></span>
            <span v-else> Register </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
