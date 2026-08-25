<script setup lang="ts" name="SplashScreen">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 开屏页最短展示时长（ms）
const MIN_SPLASH_TIME = 1200;
// 淡出动画时长（ms），需与 index.html 中 #app-splash 的 transition 保持一致
const FADE_DURATION = 500;

const router = useRouter();

let hidden = false;

const hideSplash = () => {
  if (hidden) return;
  hidden = true;
  const splash = document.getElementById('app-splash');
  if (!splash) return;
  splash.classList.add('splash-hide');
  window.setTimeout(() => splash.remove(), FADE_DURATION);
};

const initSkip = () => {
  document.getElementById('splash-skip')?.addEventListener('click', hideSplash);
};

onMounted(() => {
  initSkip();
  Promise.all([router.isReady(), new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_TIME))]).then(() => hideSplash());
});
</script>

<template>
  <!-- 开屏页 DOM 由 index.html 内联渲染，本组件负责在应用就绪后触发淡出并移除 -->
  <div class="splash-controller"></div>
</template>
