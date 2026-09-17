<template>
  <div class="toolbox">
    <!-- 顶部：说明 + 搜索 -->
    <div class="card mb10 toolbox-head">
      <div class="toolbox-head-text">
        <h4 class="toolbox-head-title">工具箱</h4>
        <span class="toolbox-head-desc">日常开发常用的小工具，全部在浏览器本地计算，输入的内容不会上传到服务器。</span>
      </div>
      <el-input v-model="keyword" class="toolbox-search" placeholder="搜索工具" clearable :prefix-icon="Search" />
    </div>

    <!-- 分类筛选 -->
    <div class="mb10 toolbox-cats">
      <el-check-tag v-for="item in categories" :key="item" :checked="category === item" @change="category = item">
        {{ item }}
      </el-check-tag>
    </div>

    <!-- 工具卡片：点进去是详情页（独立路由，可收藏、可新开标签页） -->
    <div v-if="filteredTools.length" class="toolbox-grid">
      <div v-for="tool in filteredTools" :key="tool.key" class="card toolbox-card" @click="openTool(tool.key)">
        <el-icon class="toolbox-card-icon">
          <component :is="tool.icon"></component>
        </el-icon>
        <div class="toolbox-card-title">{{ tool.title }}</div>
        <div class="toolbox-card-desc">{{ tool.desc }}</div>
      </div>
    </div>
    <div v-else class="card">
      <el-empty :image-size="80" description="没有匹配的工具" />
    </div>
  </div>
</template>

<script setup lang="ts" name="toolbox">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { TOOLS } from './tools';

const router = useRouter();

const keyword = ref('');
const category = ref('全部');
const categories = computed(() => ['全部', ...Array.from(new Set(TOOLS.map((tool) => tool.category)))]);

const filteredTools = computed(() => {
  const word = keyword.value.trim().toLowerCase();
  return TOOLS.filter((tool) => {
    if (category.value !== '全部' && tool.category !== category.value) return false;
    if (!word) return true;
    return `${tool.title} ${tool.desc} ${tool.key}`.toLowerCase().includes(word);
  });
});

const openTool = (key: string) => router.push(`/toolbox/detail/${key}`);
</script>

<style lang="scss" scoped>
.toolbox {
  .toolbox-head {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  }

  .toolbox-head-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .toolbox-head-title {
    margin: 0;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }

  .toolbox-head-desc {
    font-size: 13px;
    line-height: 20px;
    color: var(--el-text-color-secondary);
  }

  .toolbox-search {
    flex-shrink: 0;
    width: 240px;
  }

  .toolbox-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .toolbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
  }

  .toolbox-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:hover {
      border-color: var(--el-color-primary);
      box-shadow: 0 6px 16px rgb(0 0 0 / 8%);
      transform: translateY(-2px);
    }
  }

  .toolbox-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    font-size: 20px;
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
    border-radius: 8px;
  }

  .toolbox-card-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .toolbox-card-desc {
    font-size: 12px;
    line-height: 18px;
    color: var(--el-text-color-secondary);
  }

  @media (max-width: 768px) {
    .toolbox-head {
      flex-direction: column;
      align-items: stretch;
    }

    .toolbox-search {
      width: 100%;
    }

    .toolbox-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
}
</style>
