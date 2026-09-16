<template>
  <div class="footer flx-center">
    <span>
      © {{ year }} {{ APP_TITLE_EN }}
      <span class="hide-mobile"> · {{ APP_TITLE }}</span>
    </span>
    <a class="sep" href="https://github.com/cenxiaodong/frontend-atlas" target="_blank">GitHub</a>
    <span class="sep">
      基于 <a href="https://github.com/HalseySpicy/Geeker-Admin" target="_blank">Geeker-Admin</a>
      <span class="hide-mobile">（MIT License）二次开发</span>
    </span>
  </div>
</template>

<script setup lang="ts" name="Footer">
import { APP_TITLE, APP_TITLE_EN } from '@/config';

// 年份动态取，避免每年手动改
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  right: 0;
  bottom: 0;

  // 左边距跟随侧边栏（含折叠/移动端），变量由 LayoutVertical 提供
  left: var(--layout-main-left, 0);
  height: var(--layout-footer-height);
  padding: 0 12px;
  overflow: hidden;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  letter-spacing: 0.5px;

  // 只允许单行，超窄屏由下面的媒体查询继续精简，而不是折行把 30px 撑破
  white-space: nowrap;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);

  // 与侧边栏的 transition: all 0.3s 对齐，折叠时一起动
  transition: left 0.3s;

  a {
    color: var(--el-text-color-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .sep {
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid var(--el-border-color-light);
  }
}

// 移动端：去掉修饰文字，只留「署名 + 仓库 + 来源」，缩小字号保证一行放得下
@media (max-width: 768px) {
  .footer {
    padding: 0 8px;
    font-size: 12px;
    letter-spacing: 0;

    .hide-mobile {
      display: none;
    }

    .sep {
      padding-left: 6px;
      margin-left: 6px;
    }
  }
}
</style>
