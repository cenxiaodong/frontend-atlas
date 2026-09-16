import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';

/**
 * @description 页面按钮权限
 *
 * 取值必须写在 computed 内部：写到外面会变成一次性快照，
 * 而 store 重新拉权限时是整体替换 authButtonList（不是原地修改），
 * 快照指向的旧数组再也不会变，computed 就永远不重算。
 * */
export const useAuthButtons = () => {
  const route = useRoute();
  const authStore = useAuthStore();

  const BUTTONS = computed(() => {
    const currentPageAuthButton: { [key: string]: boolean } = {};
    const authButtons = authStore.authButtonListGet[route.name as string] || [];
    authButtons.forEach((item) => (currentPageAuthButton[item] = true));
    return currentPageAuthButton;
  });

  return {
    BUTTONS,
  };
};
