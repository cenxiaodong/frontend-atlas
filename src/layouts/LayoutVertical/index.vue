<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
import Main from '@/layouts/components/Main/index.vue';
import Tabs from '@/layouts/components/Tabs/index.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';

const isRouterShow = ref(true);
const isDrawerVisible = ref(false); // 移动端抽屉显示状态
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide('refresh', refreshCurrentPage);

const SIDEBAR_WIDTH = {
  expanded: '210px',
  collapsed: '65px',
};
const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const isCollapse = computed(() => globalStore.isCollapse);
const isHideCollapse = computed(() => globalStore.isHideCollapse);

const tabs = computed(() => globalStore.tabs);

const menuList = computed(() => authStore.showMenuListGet);

const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
const asideWidth = computed(() => {
  // 移动端且抽屉显示时，宽度为 expanded
  if (isHideCollapse.value && isDrawerVisible.value) {
    return SIDEBAR_WIDTH.expanded;
  }
  // 移动端且抽屉隐藏时，宽度为0
  if (isHideCollapse.value && !isDrawerVisible.value) {
    return '0px';
  }
  return isCollapse.value ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded;
});
const mainMarginLeft = computed(() => (isCollapse.value ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded));
const headerWidth = computed(() => `calc(100% - ${isCollapse.value ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded})`);
</script>
<template>
  <el-container class="layout">
    <el-aside :style="{ width: asideWidth }">
      <div class="aside-box">
        <div class="logo flx-center">
          <!-- <!~~ <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" /> ~~> -->
          <span v-show="!isCollapse" class="logo-text">测试</span>
        </div>
        <el-scrollbar>
          <el-menu :router="false" :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false">
            <SubMenu :menu-list="menuList" />
          </el-menu>
          <!-- <div style="height: 2000px"></div> -->
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container class="main-contaniner" :style="{ marginLeft: mainMarginLeft }" style="padding-top: 95px">
      <!-- <div class="header-fixed-wrapper" > -->
      <el-header :style="{ width: headerWidth }">
        <div class="header-toolbar">
          <ToolBarLeft />
          <ToolBarRight />
        </div>
        <Tabs v-show="tabs" />
      </el-header>
      <!-- </div> -->
      <Main :is-router-show="isRouterShow" />
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;

  :deep(.el-aside) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: inline-block;
    width: auto;
    height: 100%;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-color);
    transition: width 0.3s;

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

  :deep(.el-container) {
    background-color: var(--el-bg-color-page);
    transition: all 0.3s ease;
  }

  .aside-fixed-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: inline-block;
    transition: width 0.3s;
  }

  .header-fixed-wrapper {
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
  }

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
</style>
