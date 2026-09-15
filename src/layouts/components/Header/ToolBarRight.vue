<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <!-- 全局组件大小 -->
      <el-tooltip content="组件大小" placement="bottom">
        <AssemblySize />
      </el-tooltip>

      <!-- 中英文切换 -->
      <el-tooltip content="中英文切换" placement="bottom">
        <Language />
      </el-tooltip>
      <!-- 搜索菜单 -->
      <el-tooltip content="搜索菜单" placement="bottom">
        <SearchMenu />
      </el-tooltip>
      <!-- 全屏 -->
      <el-tooltip content="全屏" placement="bottom">
        <Fullscreen />
      </el-tooltip>
      <!-- 主题设置 -->
      <el-tooltip content="主题设置" placement="bottom">
        <ThemeSetting />
      </el-tooltip>
      <!-- <SearchMenu id="searchMenu" />
      
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
import ThemeSetting from './components/ThemeSetting.vue';
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
