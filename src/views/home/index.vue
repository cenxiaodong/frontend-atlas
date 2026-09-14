<template>
  <div class="card content-box">
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
    <el-row class="mb20">
      <el-button v-if="BUTTONS.add" type="primary" :icon="CirclePlus"> 新增 </el-button>
      <el-button v-if="BUTTONS.edit" type="warning" :icon="EditPen"> 编辑 </el-button>
      <el-button v-if="BUTTONS.delete" type="danger" plain :icon="Delete"> 删除 </el-button>
      <el-button v-if="BUTTONS.import" type="info" plain :icon="Upload"> 导入数据 </el-button>
      <el-button v-if="BUTTONS.export" type="info" plain :icon="Download"> 导出数据 </el-button>
    </el-row>
    <!-- <div style="height: 2000px"></div> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CirclePlus, Delete, Download, EditPen, Upload } from '@element-plus/icons-vue';
import { useAuthButtons } from '@/hooks/useAuthButtons';

const { BUTTONS } = useAuthButtons();

const input = ref('');
</script>

<style scoped>
/* 样式代码 */
</style>
