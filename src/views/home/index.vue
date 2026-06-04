<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');
</script>
<template>
  <div class="card content-box">
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
    <!-- <div style="height: 2000px"></div> -->
  </div>
</template>

<style scoped>
/* 样式代码 */
</style>
