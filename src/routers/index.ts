import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useUserStore } from '@/stores/modules/user';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { staticRouter, errorRouter } from '@/routers/modules/staticRouter';
const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
};

const router = createRouter({
  history: routerMode[import.meta.env.VITE_ROUTER_MODE](),
  strict: false, // URL 尾部斜杠不敏感。/about 和 /about/ 都匹配同一个路由
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [...staticRouter, ...errorRouter],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  NProgress.start();

  // 动态设置标题
  const title = import.meta.env.VITE_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token) {
      return from.fullPath;
    }
    resetRouter();
    return true;
  }

  // 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) {
    return true;
  }

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) {
    return { path: LOGIN_URL, replace: true };
  }

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter();
    return { ...to, replace: true };
  }

  // 存储 routerName 做按钮权限筛选
  authStore.setRouteName(to.name as string);

  // 正常访问页面
  return true;
});

router.afterEach(() => {
  NProgress.done();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.flatMenuListGet.forEach((route) => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

export default router;
