<template>
  <div class="json-node">
    <div class="json-head">
      <template v-if="hasLabel">
        <span class="json-key" :class="{ 'is-index': typeof label === 'number' }">{{ labelText }}</span>
        <span class="json-punct">:</span>
      </template>

      <template v-if="isBranch">
        <span v-if="expanded" class="json-brace json-toggle" @click="toggle">{{ openToken }}</span>
        <span v-else class="json-brace json-toggle" @click="toggle">{{ openToken }} ⋯ {{ size }} 项 {{ closeToken }}</span>
      </template>
      <span v-else class="json-value" :class="`is-${valueType}`">{{ valueText }}</span>
    </div>

    <template v-if="isBranch && expanded">
      <div class="json-children">
        <JsonNode
          v-for="child in children"
          :key="child.label"
          :data="child.value"
          :label="child.label"
          :depth="depth + 1"
          :expand-depth="expandDepth"
        />
      </div>
      <div class="json-head">
        <span class="json-brace json-toggle" @click="toggle">{{ closeToken }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" name="JsonNode">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    data: unknown;
    /** 对象是 key、数组是下标；根节点不传 */
    label?: string | number;
    depth?: number;
    /** 深度小于这个值的节点默认展开：0 全折叠、Infinity 全展开 */
    expandDepth?: number;
  }>(),
  { depth: 0, expandDepth: 2 },
);

const hasLabel = computed(() => props.label !== undefined);
const isBranch = computed(() => props.data !== null && typeof props.data === 'object');
const isArrayLike = computed(() => Array.isArray(props.data));

const openToken = computed(() => (isArrayLike.value ? '[' : '{'));
const closeToken = computed(() => (isArrayLike.value ? ']' : '}'));

const size = computed(() => {
  const value = props.data;
  if (Array.isArray(value)) return value.length;
  if (value !== null && typeof value === 'object') return Object.keys(value).length;
  return 0;
});

const children = computed<{ label: string | number; value: unknown }[]>(() => {
  const value = props.data;
  if (Array.isArray(value)) return value.map((item, index) => ({ label: index, value: item }));
  if (value !== null && typeof value === 'object') return Object.entries(value).map(([key, item]) => ({ label: key, value: item }));
  return [];
});

// 数组下标不加引号，对象 key 加引号
const labelText = computed(() => (typeof props.label === 'number' ? props.label : `"${props.label}"`));

const valueType = computed(() => {
  const value = props.data;
  if (value === null) return 'null';
  return typeof value;
});

const valueText = computed(() => {
  if (typeof props.data === 'string') return JSON.stringify(props.data);
  return String(props.data);
});

const expanded = ref(props.depth < props.expandDepth);
const toggle = () => {
  expanded.value = !expanded.value;
};
</script>

<style lang="scss" scoped>
.json-node {
  font-family: ui-monospace, sfmono-regular, menlo, monaco, consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 22px;
  word-break: break-all;

  .json-key {
    margin-right: 2px;
    color: var(--el-color-primary);

    // 数组下标用弱色，不跟 key 抢注意力
    &.is-index {
      color: var(--el-text-color-placeholder);
    }
  }

  .json-punct {
    margin-right: 4px;
    color: var(--el-text-color-secondary);
  }

  .json-brace {
    color: var(--el-text-color-regular);
  }

  .json-toggle {
    cursor: pointer;
    user-select: none;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  // 左侧虚线是缩进指引，折叠多层的 JSON 靠它对齐
  .json-children {
    padding-left: 14px;
    margin-left: 3px;
    border-left: 1px dashed var(--el-border-color-lighter);
  }

  .json-value {
    &.is-string {
      color: var(--el-color-success);
    }

    &.is-number {
      color: var(--el-color-warning);
    }

    &.is-boolean {
      color: var(--el-color-danger);
    }

    &.is-null {
      font-style: italic;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>
