import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { staticRouter, errorRouter } from '@/router/modules/staticRouter';
const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
};

const router = createRouter({
  history: routerMode[import.meta.env.VITE_ROUTER_MODE](),
  strict: false, // URL 尾部斜杠不敏感。/about 和 /about/ 都匹配同一个路由
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    ...staticRouter,
    ...errorRouter,
  ],
});

router.beforeEach(() => {
  NProgress.start();
  return true;
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
