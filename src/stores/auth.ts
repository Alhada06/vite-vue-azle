import { defineStore } from 'pinia';
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from '../declarations/backend';
import { toRaw } from 'vue';
import { Identity } from '@dfinity/agent';

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
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

  authClient: AuthClient | null;
  identity: Identity | null;
};

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isReady: false,
      isAuthenticated: null,
      authClient: null,
      identity: null,
    };
  },
  actions: {
    async init() {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      this.authClient = authClient;
      const isAuthenticated = await authClient.isAuthenticated();
      const identity = isAuthenticated ? authClient.getIdentity() : null;

      this.isAuthenticated = isAuthenticated;
      this.identity = identity;

      this.isReady = true;
    },
    async login() {
      const authClient = toRaw(this.authClient);
      authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          this.isAuthenticated = await authClient.isAuthenticated();
          this.identity = this.isAuthenticated
            ? authClient.getIdentity()
            : null;
        },
      });
    },
    async logout() {
      const authClient = toRaw(this.authClient);
      await authClient?.logout();
      this.isAuthenticated = false;
      this.identity = null;
    },
  },
});
