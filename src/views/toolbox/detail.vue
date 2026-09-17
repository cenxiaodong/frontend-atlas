<template>
  <div class="tool-detail">
    <div v-if="!tool" class="card">
      <el-empty :image-size="80" description="没有找到这个工具">
        <el-button type="primary" @click="backToList">返回工具箱</el-button>
      </el-empty>
    </div>

    <template v-else>
      <div class="card mb10 tool-detail-head">
        <el-button class="tool-detail-back" link type="primary" :icon="ArrowLeft" @click="backToList">工具箱</el-button>
        <div class="tool-detail-info">
          <el-icon class="tool-detail-icon">
            <component :is="tool.icon"></component>
          </el-icon>
          <span class="tool-detail-title">{{ tool.title }}</span>
          <span class="tool-detail-desc">{{ tool.desc }}</span>
        </div>
      </div>

      <div class="card">
        <ToolRunner :key="tool.key" :tool="tool" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" name="toolboxDetail">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import { APP_TITLE } from '@/config';
import { useTabsStore } from '@/stores/modules/tabs';
import ToolRunner from './components/ToolRunner.vue';
import { TOOLS } from './tools';

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();

const tool = computed(() => TOOLS.find((item) => item.key === route.params.key));

// 标签页标题默认是菜单里的「工具详情」，换成具体工具名，开了多个工具才分得清
watch(
  () => [route.fullPath, tool.value?.title] as const,
  () => {
    const title = tool.value?.title;
    if (!title) return;
    tabsStore.setTabTitle(route.fullPath, title);
    document.title = `${title} - ${APP_TITLE}`;
  },
  { immediate: true },
);

const backToList = () => router.push('/toolbox/index');
</script>

<style lang="scss" scoped>
.tool-detail {
  .tool-detail-head {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .tool-detail-back {
    align-self: flex-start;
    padding: 0;
  }

  .tool-detail-info {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .tool-detail-icon {
    font-size: 18px;
    color: var(--el-color-primary);
  }

  .tool-detail-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .tool-detail-desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}
</style>
