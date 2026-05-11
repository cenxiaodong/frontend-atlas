import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// const routerMode = {
//   hash: () => createWebHashHistory(),
//   history: () => createWebHistory(),
// };

// console.log(import.meta.env.VITE_ROUTER_MODE, import.meta.env);

// console.log(routerMode['history']());

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
