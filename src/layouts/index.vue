<script setup lang="ts">
import { computed, watch, type Component } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';
import LayoutVertical from './LayoutVertical/index.vue';
import type { LayoutType } from '@/stores/interface';
const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutVertical,
  transverse: LayoutVertical,
  columns: LayoutVertical,
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute('class', layout.value);
  },
  { immediate: true },
);
</script>
<template>
  <component :is="LayoutComponents[layout as LayoutType]" />
</template>
<style lang="scss" scoped></style>
