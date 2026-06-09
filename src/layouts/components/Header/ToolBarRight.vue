<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <!-- 全局组件大小 -->
      <AssemblySize id="assemblySize" />
      <!-- 中英文切换 -->
      <Language id="language" />
      <!-- 搜索菜单 -->
      <SearchMenu id="searchMenu" />
      <!-- 全屏 -->
      <Fullscreen id="fullscreen" />
      <!-- <SearchMenu id="searchMenu" />
      <ThemeSetting id="themeSetting" />
      <Message id="message" />
       -->
    </div>
    <!-- <span class="username">{{ username }}</span> -->
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import AssemblySize from './components/AssemblySize.vue';
import Language from './components/Language.vue';
import Fullscreen from './components/Fullscreen.vue';
import SearchMenu from './components/SearchMenu.vue';
// import ThemeSetting from './components/ThemeSetting.vue';
// import Message from './components/Message.vue';
import Avatar from './components/Avatar.vue';
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;

  .header-icon {
    display: flex;
    align-items: center;

    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }

  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
