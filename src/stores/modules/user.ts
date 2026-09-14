import { defineStore } from 'pinia';
import type { UserState } from '@/stores/interface';
import piniaPersistConfig from '@/stores/helper/persist';

export const useUserStore = defineStore('atlas-user', {
  state: (): UserState => ({
    token: '3384元873434',
    userInfo: { name: '岑' },
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo;
    },
  },
  persist: piniaPersistConfig({ key: 'atlas-user' }),
});
