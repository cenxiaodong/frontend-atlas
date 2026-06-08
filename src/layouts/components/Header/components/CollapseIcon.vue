<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();

const toggleSidebar = inject<(() => void) | null>('toggleSidebar', null);
const changeCollapse = () => {
  if (toggleSidebar) {
    toggleSidebar();
  }
};
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
