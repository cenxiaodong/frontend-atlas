<template>
  <el-drawer v-model="drawerVisible" title="布局设置" size="290px">
    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark />
    </div>
    <div class="theme-item">
      <span>灰色模式</span>
      <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
    </div>
    <div class="theme-item mb40">
      <span>色弱模式</span>
      <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>菜单折叠</span>
      <el-switch v-model="isCollapse" />
    </div>
    <div class="theme-item">
      <span>菜单手风琴</span>
      <el-switch v-model="accordion" />
    </div>
    <!-- <div class="theme-item">
      <span>水印</span>
      <el-switch v-model="watermark" />
    </div> -->
    <div class="theme-item">
      <span>面包屑</span>
      <el-switch v-model="breadcrumb" />
    </div>
    <div class="theme-item">
      <span>面包屑图标</span>
      <el-switch v-model="breadcrumbIcon" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="tabs" />
    </div>
    <div class="theme-item">
      <span>标签栏图标</span>
      <el-switch v-model="tabsIcon" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="footer" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStore } from '@/stores/modules/global';
import { DEFAULT_PRIMARY } from '@/config';
import mittBus from '@/utils/eventBus';
import SwitchDark from '@/components/SwitchDark/index.vue';

const { changePrimary, changeGreyOrWeak } = useTheme();

const globalStore = useGlobalStore();
const { primary, isGrey, isWeak, isCollapse, accordion, breadcrumb, breadcrumbIcon, tabs, tabsIcon, footer } = storeToRefs(globalStore);

// 预定义主题颜色
const colorList = [DEFAULT_PRIMARY, '#daa96e', '#0c819f', '#409eff', '#27ae60', '#ff5c93', '#e74c3c', '#fd726d', '#f39c12', '#9b59b6'];
// 打开主题设置
const drawerVisible = ref(false);
mittBus.on('openThemeDrawer', () => (drawerVisible.value = true));
</script>

<style scoped lang="scss">
@import './index';
</style>
