<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
import Main from '@/layouts/components/Main/index.vue';
import Tabs from '@/layouts/components/Tabs/index.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const isCollapse = computed(() => globalStore.isCollapse);

const tabs = computed(() => globalStore.tabs);

const menuList = computed(() => authStore.showMenuListGet);

const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
</script>
<template>
  <el-container class="layout">
    <el-aside :style="{ width: isCollapse ? '65px' : '210px' }">
      <div class="aside-box">
        <div class="logo flx-center">
          <!-- <!~~ <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" /> ~~> -->
          <span v-show="!isCollapse" class="logo-text">测试</span>
        </div>
        <el-scrollbar>
          <el-menu :router="false" :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false">
            <SubMenu :menu-list="menuList" />
          </el-menu>
          <div style="height: 2000px"></div>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container :style="{ marginLeft: isCollapse ? '65px' : '210px' }" style="padding-top: 95px">
      <div class="header-fixed-wrapper" :style="{ width: isCollapse ? 'calc(100% - 65px)' : 'calc(100% - 210px)' }">
        <el-header>
          <div class="header-toolbar">
            <ToolBarLeft />
            <ToolBarRight />
          </div>
          <Tabs v-show="tabs" />
        </el-header>
      </div>
      <Main />
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
    transition: margin-left 0.3s ease;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99;
    box-sizing: border-box;
    width: calc(100% - 65px);
    height: 95px;
    padding: 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
    transition: width 0.3s;
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

  .aside-fixed {
    border: 1px solid red;
  }

  .el-header {
    box-sizing: border-box;
    height: 95px;
    padding: 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);

    .header-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px;
    }
  }
}
</style>
