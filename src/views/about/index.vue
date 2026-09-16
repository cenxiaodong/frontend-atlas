<template>
  <div>
    <div class="card mb10">
      <div class="flx-center mb10"><img src="/logo.png" width="60" alt="Frontend Atlas" /></div>
      <div class="badge-box flx-center mb10">
        <img src="https://img.shields.io/badge/Vue-3.6-42b883" />
        <img src="https://img.shields.io/badge/Vite-8-646cff" />
        <img src="https://img.shields.io/badge/TypeScript-6-3178c6" />
        <img src="https://img.shields.io/badge/Element%20Plus-2.14-409eff" />
        <img src="https://img.shields.io/badge/Pinia-3-ffd859" />
      </div>
      <span class="text">
        <el-link type="primary" href="https://github.com/cenxiaodong/frontend-atlas" target="_blank">{{ APP_TITLE_EN }}({{ APP_TITLE }})</el-link>
        是一个个人自用的前端知识/能力整合项目：把日常反复用到的工程能力（权限、请求、主题、图标、错误页、PWA……）沉淀成一套开箱即用的后台底座，同时把脚手架、通用组件和踩坑记录集中整理，需要时随手就能查到。
      </span>
    </div>
    <div class="card mb10">
      <h4 class="title">特别致谢</h4>
      <span class="text">
        项目基于开源后台模板
        <el-link class="bold" type="primary" href="https://github.com/HalseySpicy/Geeker-Admin" target="_blank">Geeker-Admin</el-link>
        二次开发起步，沿用了其整体架构与权限、请求、主题等基础实现，并逐步替换为自有品牌、页面与内容。感谢原作者的开源与分享。
      </span>
    </div>
    <div class="card mb10">
      <h4 class="title">项目信息</h4>
      <el-descriptions :column="columnCount" border>
        <el-descriptions-item label="版本号" label-align="left">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="更新时间" label-align="left">
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Github" label-align="left">
          <el-link type="primary" href="https://github.com/cenxiaodong/frontend-atlas" target="_blank"> Github </el-link>
        </el-descriptions-item>
        <el-descriptions-item label="node版本" label-align="left">
          <el-tag>>=22</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="pnpm版本" label-align="left">
          <el-tag>>=10</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="预览地址" label-align="left">
          <el-link type="primary" href="https://cenxiaodong.github.io/frontend-atlas" target="_blank"> 预览地址 </el-link>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="文档地址" label-align="left">
          <el-link type="primary" href="https://docs.spicyboy.cn" target="_blank"> 文档地址 </el-link>
        </el-descriptions-item>
        <el-descriptions-item label="预览地址" label-align="left">
          <el-link type="primary" href="https://admin.spicyboy.cn" target="_blank"> 预览地址 </el-link>
        </el-descriptions-item> -->
      </el-descriptions>
    </div>
    <div class="card mb10">
      <h4 class="title">生产环境依赖</h4>
      <el-descriptions :column="columnCount" border>
        <el-descriptions-item v-for="(value, key) in dependencies" :key="key" width="400px" :label="key">
          <el-tag type="info">
            {{ value }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card">
      <h4 class="title">开发环境依赖</h4>
      <el-descriptions :column="columnCount" border>
        <el-descriptions-item v-for="(value, key) in devDependencies" :key="key" width="400px" :label="key">
          <el-tag type="info">
            {{ value }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts" name="about">
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
import { computed } from 'vue';
import { APP_TITLE, APP_TITLE_EN } from '@/config';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

const columnCount = computed(() => {
  if (width.value < 768) return 1; // 手机：1列
  if (width.value < 1200) return 2; // 平板：2列
  return 3; // 桌面：3列
});
</script>

<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }

  .badge-box {
    flex-wrap: wrap;
    gap: 6px;
  }

  .text {
    font-size: 15px;
    line-height: 25px;

    // color: var(--el-text-color-primary);

    :deep(.el-link) {
      font-size: 15px;

      .el-link__inner {
        font-weight: 500;
      }
    }
  }
}
</style>
