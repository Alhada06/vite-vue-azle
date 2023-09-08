<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useAlerts } from '../stores/useAlerts';

import {
  backend,
  canisterId,
  createActor,
} from '../declarations/backend/index.js';

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
const amount = ref('');
const principal = computed(async () => await backend.caller());
const p2 = computed(() => identity.value);
const transfering = ref(false);
const transfer = async () => {
  transfering.value = true;
  const transferer = computed(() => userActor.value);
  const to: ICRC1Account = {
    owner: Principal.fromText(
      'rfaly-2535o-l7q37-mq4m4-3pem5-p3t2e-oq2bg-cem5k-ym7rn-tjlue-eqe',
    ),
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
  await transferer.value
    .icrc1_transfer(transferArgs)
    .then(() => {
      transfering.value = false;
      alerts.success('transfer Successfull');
      router.push('/');
    })
    .then(async (x) => {
      //send tokens
    });
};
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

      <button
        @click="transfer"
        class="btn btn-primary w-1/2 mt-10 justify-self-center"
      >
        <span v-if="transfering"><SvgSpinners8DotsRotate /></span>
        <span v-else> transfer </span>
      </button>
    </div>
  </div>
</template>
