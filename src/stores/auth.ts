import { User } from './../declarations/backend/backend.did.d';
import { defineStore } from 'pinia';
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from '../declarations/backend';
import { toRaw } from 'vue';
import { Identity, Actor } from '@dfinity/agent';
import { useAlerts } from './useAlerts';
import { StorageSerializers } from '@vueuse/core';
import { ic, Principal } from 'azle';

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: false,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === 'ic'
        ? 'https://identity.ic0.app/#authorize'
        : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`,
    maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
  },
};

function actorFromIdentity(identity: Identity) {
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}
export type RootState = {
  isReady: Boolean;
  isAuthenticated: Boolean;
  principal: Principal;
  authClient: AuthClient | null;
  identity: Identity | null;
  userActor: Actor | null;
  user: User | null;
};

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isReady: false,
      isAuthenticated: false,
      isRegistered: false,
      authClient: null,
      identity: null,
      userActor: null,
      user: null,
    };
  },
  actions: {
    async init() {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      this.authClient = authClient;
      const isAuthenticated = await authClient.isAuthenticated();
      const identity = isAuthenticated ? authClient.getIdentity() : null;
      const bActor = identity ? actorFromIdentity(identity) : null;
      this.identity = identity;
      this.userActor = bActor;
      this.isRegistered = bActor ? await bActor.callerIsRegistered() : false;

      this.user = this.isRegistered ? await bActor.callerProfile() : null;
      this.isReady = true;
    },
    async login() {
      const alertsStore = useAlerts();
      const authClient = toRaw(this.authClient);
      authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          const isAuthenticated = await authClient.isAuthenticated();
          const identity = isAuthenticated ? authClient.getIdentity() : null;
          const bActor = identity ? actorFromIdentity(identity) : null;
          this.identity = identity;
          this.userActor = bActor;
          this.isRegistered = bActor
            ? await bActor.callerIsRegistered()
            : false;

          alertsStore.success('You are logged in!');

          if (this.isRegistered) {
            this.user = this.isRegistered ? await bActor.callerProfile() : null;
            return this.$router.push('/');
          }
          return this.$router.push('/profile');
        },
      });
    },
    async logout() {
      const alertsStore = useAlerts();
      const authClient = toRaw(this.authClient);
      await authClient?.logout();
      this.isAuthenticated = false;
      this.identity = null;
      this.userActor = null;
      this.isRegistered = false;
      this.user = null;
      alertsStore.info('Successfully logged out!');
    },
  },
});
