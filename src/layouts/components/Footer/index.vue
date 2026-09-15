<template>
  <div class="footer flx-center">
    <a href="https://github.com/HalseySpicy" target="_blank"> 2022 © Geeker-Admin By Geeker Technology. </a>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--layout-footer-height);
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);

  a {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    letter-spacing: 0.5px;
    text-decoration: none;
  }
}
</style>
