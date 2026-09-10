<template>
  <Maximize v-show="maximize" />
  <el-main ref="mainRef">
    {{ keepAliveName }}
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in" @enter="restoreScroll">
        <keep-alive :include="keepAliveName">
          <component :is="createComponentWrapper(Component, route)" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <!--<el-footer v-show="footer">
    <Footer />
  </el-footer>-->
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router';
import { watch, h, ref, onMounted, onBeforeUnmount, type Component } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/modules/global';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import Maximize from './components/Maximize.vue';

const route = useRoute();
const globalStore = useGlobalStore();

defineProps<{
  isRouterShow: boolean;
}>();

// import Footer from '@/layouts/components/Footer/index.vue';

const { maximize, layout } = storeToRefs(globalStore);

const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);

// ==================== 滚动位置记忆 ====================
const mainRef = ref<{ $el: HTMLElement }>();
const scrollMap = new Map<string, number>();

// 滚动时记录当前页面的位置（key 与 keep-alive 缓存 key 保持一致）
const onScroll = () => {
  scrollMap.set(route.fullPath, mainRef.value?.$el.scrollTop ?? 0);
};

onMounted(() => mainRef.value?.$el.addEventListener('scroll', onScroll));
onBeforeUnmount(() => mainRef.value?.$el.removeEventListener('scroll', onScroll));

// keep-alive 缓存被移除时（如关闭 tab），同步清理对应的滚动位置
watch(keepAliveName, (newList, oldList) => {
  oldList.forEach((name) => {
    if (!newList.includes(name)) scrollMap.delete(name);
  });
});

// 进入动画开始前恢复目标页面的滚动位置（避免先显示顶部再跳变）
const restoreScroll = () => {
  const target = mainRef.value?.$el;
  if (!target) return;
  target.scrollTop = scrollMap.get(route.fullPath) ?? 0;
};

// 解决详情页 keep-alive 问题
const wrapperMap = new Map();
function createComponentWrapper(component: Component, route: RouteLocationNormalized) {
  if (!component) return;
  const wrapperName = route.fullPath;
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) };
    wrapperMap.set(wrapperName, wrapper);
  }
  return h(wrapper);
}

// 监听当前页面是否最大化，动态添加 class
watch(
  () => maximize!.value,
  () => {
    const app = document.getElementById('app') as HTMLElement;
    if (maximize!.value) app.classList.add('main-maximize');
    else app.classList.remove('main-maximize');
  },
  { immediate: true },
);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout!.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute('class', layout!.value);
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}

.el-footer {
  height: auto;
  padding: 0;
}
</style>
