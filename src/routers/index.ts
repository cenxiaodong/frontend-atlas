import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useUserStore } from '@/stores/modules/user';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/index';
import { staticRouter, errorRouter } from '@/routers/modules/staticRouter';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
};
/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */

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
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn('路由错误', error.message);
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
