<script setup lang="ts">
import { computed, provide, ref, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
import Main from '@/layouts/components/Main/index.vue';
import Tabs from '@/layouts/components/Tabs/index.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';

// ==================== 常量 ====================
const SIDEBAR_WIDTH = { expanded: '210px', collapsed: '65px' } as const;
const BREAKPOINTS = { mobile: 768, collapse: 1200 } as const;

// ==================== 响应式状态 ====================
const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const screenWidth = ref(window.innerWidth);
const device = ref<'mobile' | 'pc'>(window.innerWidth <= BREAKPOINTS.mobile ? 'mobile' : 'pc');
const isMobileMenuOpen = ref(false);
const isRouterShow = ref(true);

// ==================== 计算属性 ====================
const isMobileDevice = computed(() => device.value === 'mobile');
const isCollapse = computed(() => globalStore.isCollapse);

const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ?? route.path) as string);
const tabs = computed(() => globalStore.tabs);

/** 侧边栏始终用展开宽度渲染，移动端通过 CSS transform 控制显隐 */
const asideWidth = computed(() => {
  // 移动端：始终展开宽度，显隐由 CSS transform 控制
  if (isMobileDevice.value) return '0px';
  // PC 端：跟随折叠状态
  return isCollapse.value ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded;
});

/** 主内容区左边距：移动端为 0（菜单浮层覆盖），PC 端跟随折叠状态 */
const mainMarginLeft = computed(() => {
  if (isMobileDevice.value) return '0px';
  return isCollapse.value ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded;
});

/** 顶部 Header 宽度 */
const headerWidth = computed(() => {
  if (isMobileDevice.value) return '100%';
  return `calc(100% - ${isCollapse.value ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded})`;
});

// ==================== 方法 ====================
/** 切换侧边栏：移动端 → 浮层开关；PC 端 → 折叠/展开 */
const toggleSidebar = () => {
  if (isMobileDevice.value) {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  } else {
    globalStore.setGlobalState('isCollapse', !globalStore.isCollapse);
  }
};

/** 窗口大小变化处理 */
const handleResize = () => {
  screenWidth.value = window.innerWidth;
  const isMobile = screenWidth.value <= BREAKPOINTS.mobile;

  device.value = isMobile ? 'mobile' : 'pc';

  if (isMobile) {
    isMobileMenuOpen.value = false;
    return;
  }

  // PC 端：1200px 以下自动折叠，以上自动展开
  const shouldCollapse = screenWidth.value < BREAKPOINTS.collapse;
  if (globalStore.isCollapse !== shouldCollapse) {
    globalStore.setGlobalState('isCollapse', shouldCollapse);
  }
};

const debouncedResize = useDebounceFn(handleResize, 40);

// ==================== 生命周期 ====================
onMounted(handleResize);
window.addEventListener('resize', debouncedResize, false);
onBeforeUnmount(() => {
  window.removeEventListener('resize', debouncedResize);
});

// ==================== provide ====================
provide('refresh', (val: boolean) => (isRouterShow.value = val));
provide('toggleSidebar', toggleSidebar);
</script>

<template>
  <el-container
    :class="[
      'layout',
      device,
      {
        openSidebar: isMobileMenuOpen,
      },
    ]"
  >
    <el-aside :style="{ width: asideWidth }">
      <div class="aside-box">
        <div class="logo flx-center">
          <span class="logo-text">测试</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isMobileMenuOpen ? false : isCollapse"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container class="main-container" :style="{ marginLeft: mainMarginLeft }" style="padding-top: 95px">
      <el-header :style="{ width: headerWidth }">
        <div class="header-toolbar">
          <ToolBarLeft />
          <ToolBarRight />
        </div>
        <Tabs v-show="tabs" />
      </el-header>
      {{ asideWidth }}{{ isCollapse }}
      <Main :is-router-show="isRouterShow" />
    </el-container>
  </el-container>

  <!-- 移动端遮罩层 -->
  <Transition name="fade">
    <div v-if="isMobileDevice && isMobileMenuOpen" class="drawer-bg" @click="isMobileMenuOpen = false" />
  </Transition>
</template>

<style lang="scss" scoped>
// ==================== 动画 ====================
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

// ==================== 布局容器 ====================
.el-container {
  width: 100%;
  height: 100%;

  // ==================== 侧边栏 ====================
  :deep(.el-aside) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: inline-block;
    width: auto;
    height: 100%;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-color);
    transition: all 0.3s;

    .aside-box {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: width 0.3s ease;

      .el-scrollbar {
        height: calc(100% - 55px);

        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }

      .logo {
        box-sizing: border-box;
        height: 55px;

        .logo-img {
          width: 28px;
          object-fit: contain;
        }

        .logo-text {
          margin-left: 6px;
          font-size: 21.5px;
          font-weight: bold;
          color: var(--el-aside-logo-text-color);
          white-space: nowrap;
        }
      }
    }
  }

  // ==================== 主内容区 ====================
  :deep(.el-container) {
    background-color: var(--el-bg-color-page);
    transition: all 0.3s ease;
  }

  // ==================== 顶部 Header ====================
  .el-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99;
    box-sizing: border-box;
    height: 95px;
    padding: 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
    transition: width 0.3s;

    .header-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px;
      border-bottom: 1px solid var(--el-header-border-color);
    }
  }
}

// ==================== 移动端：侧边栏默认隐藏在屏幕左侧 ====================

.mobile {
  :deep(.el-aside) {
    transform: translateX(-100%);
  }

  &.openSidebar {
    :deep(.el-aside) {
      width: 210px !important;
      transform: translateX(0);
      transition: transform 0.3s;
    }
  }
}

// ==================== 移动端遮罩层 ====================
.drawer-bg {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #000;
  opacity: 0.4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
