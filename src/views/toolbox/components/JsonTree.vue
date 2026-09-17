<template>
  <div class="json-tree">
    <div class="json-tree-bar">
      <span class="json-tree-stat">{{ nodeCount }} 个节点</span>
      <el-button link type="primary" size="small" @click="setMode('all')">全部展开</el-button>
      <el-button link type="primary" size="small" @click="setMode('none')">全部折叠</el-button>
      <el-button link type="primary" size="small" @click="setMode('default')">恢复默认</el-button>
    </div>
    <!-- 用 mode 当 key：切换时整棵树重建，所有节点的展开状态才会一起生效 -->
    <JsonNode :key="mode" :data="data" :expand-depth="expandDepth" />
  </div>
</template>

<script setup lang="ts" name="JsonTree">
import { computed, ref } from 'vue';
import JsonNode from './JsonNode.vue';

const props = defineProps<{ data: unknown }>();

/** 默认展开前两层，不然复杂的 JSON 一上来就是几千行 DOM */
const DEFAULT_EXPAND_DEPTH = 2;

type ExpandMode = 'default' | 'all' | 'none';
const mode = ref<ExpandMode>('default');

const expandDepth = computed(() => {
  if (mode.value === 'all') return Number.POSITIVE_INFINITY;
  if (mode.value === 'none') return 0;
  return DEFAULT_EXPAND_DEPTH;
});

const setMode = (next: ExpandMode) => {
  mode.value = next;
};

const nodeCount = computed(() => {
  const count = (value: unknown): number => {
    if (Array.isArray(value)) return 1 + value.reduce<number>((sum, item) => sum + count(item), 0);
    if (value !== null && typeof value === 'object') return 1 + Object.values(value).reduce<number>((sum, item) => sum + count(item), 0);
    return 1;
  };
  return count(props.data);
});
</script>

<style lang="scss" scoped>
.json-tree {
  max-height: 55vh;
  padding: 10px 12px;
  overflow: auto;
  background-color: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;

  .json-tree-bar {
    display: flex;
    gap: 8px;
    align-items: center;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .json-tree-stat {
    margin-right: auto;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}
</style>
