import router, { resetRouter } from '@/routers';
import { LOGIN_URL } from '@/config';
import { useAuthStore } from '@/stores/modules/auth';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import { useTabsStore } from '@/stores/modules/tabs';
import { useUserStore } from '@/stores/modules/user';

/**
 * @description 清空登录态并跳回登录页
 *
 * 「退出登录」和「登录失效（401）」共用这一份，避免两边各写一遍然后漏项。
 * 两个顺序上的讲究：
 * 1. resetRouter() 必须排在 authStore.$reset() 前面 —— 动态路由是按菜单数据算出来的，
 *    菜单先清空就再也摘不掉路由了
 * 2. keep-alive 缓存必须清 —— 否则下一个用户登录进来会看到上一个用户缓存下来的页面
 *
 * 关于依赖：这里的环是 utils/auth → routers → stores/auth → api/modules/login → api → utils/auth。
 * api 早就在 import router 了（同一条边），这里只是多绕一跳，没有新增环。
 * 但代价是「stores/modules/tabs」会被提到模块加载期求值，
 * 所以 store 模块里不能有顶层调用（见 tabs.ts 里的注释）。
 * 另外：不要从这个文件出发、再从 src/utils/index.ts re-export，那才会真的多出一个环。
 * */
export const resetAuthState = () => {
  resetRouter();
  useAuthStore().$reset();
  useKeepAliveStore().$reset();
  useTabsStore().$reset();
  useUserStore().setToken('');
  router.replace(LOGIN_URL);
};
