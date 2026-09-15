<template>
  <SvgIcon name="zhuti" size="19px" @click="openDrawer" />
</template>

<script setup lang="ts">
import mittBus from '@/utils/eventBus';
const openDrawer = () => {
  mittBus.emit('openThemeDrawer');
};
</script>
