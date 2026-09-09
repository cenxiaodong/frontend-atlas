<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');
</script>
<template>
  <div>
    <div>menu</div>
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <div style="height: 3000px"></div>
  </div>
</template>

<style scoped>
/* 样式代码 */
</style>
