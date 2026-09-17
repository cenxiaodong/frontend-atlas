<template>
  <div class="app-logo">
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 18 21 24l-7.5 6" />
      <path d="M20.4 11.5 27.6 36.5" />
      <path d="M34.5 18 27 24l7.5 6" />
      <circle cx="24" cy="41.3" r="2.9" />
    </svg>
  </div>
</template>

<script setup lang="ts" name="AppLogo">
/**
 * @description 会跟随主题色变化的 logo
 *
 * 原来的写法是 <img src="/logo.svg">，SVG 里的渐变写死了 #818cf8 → #4f46e5。
 * 坑在于 <img> 引用的 SVG 是「独立文档」，页面 CSS 进不去，换主题色它纹丝不动。
 * 所以这里把图形拆成两层：
 * 1. 圆角方块交给 CSS 背景，直接吃 var(--el-color-primary-*) —— 主题一变自动跟着变
 * 2. 白色的 </> 字形单独一条内联 SVG 叠在上面，颜色固定不参与主题
 * 圆角 26% 来自原 SVG 的 rx=12.5 / 48，视觉效果与旧 logo 一致。
 * */
</script>

<style scoped lang="scss">
.app-logo {
  display: inline-flex;
  aspect-ratio: 1 / 1;
  background: linear-gradient(135deg, var(--el-color-primary-light-3), var(--el-color-primary));
  border-radius: 26%;

  svg {
    width: 100%;
    height: 100%;
  }

  path {
    fill: none;
    stroke: #fff;
    stroke-width: 3.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  circle {
    fill: #fff;
  }
}
</style>
