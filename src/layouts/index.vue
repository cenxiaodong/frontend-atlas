<script setup lang="ts">
// import { ref } from 'vue';
// import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
import authMenuList from '@/json/authMenuList.json';
// let isCollapse = ref(false);

console.log(authMenuList.data);
</script>
<template>
  <el-container class="layout">
    <!-- <el-aside>
      <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">测试</span>
        </div>
        <el-scrollbar>
          <el-menu :router="false" :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false">
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container> -->
  </el-container>
</template>
<style lang="scss" scoped></style>
