<template>
  <div class="maximize" @click="exitMaximize">
    <SvgIcon name="tuichu" size="19px" color="#fff" class="iconfont" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();
const exitMaximize = () => {
  globalStore.setGlobalState('maximize', false);
};
</script>

<style scoped lang="scss">
.maximize {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 55px;
  height: 55px;
  cursor: pointer;
  background-color: var(--el-color-info);
  border-radius: 50%;
  opacity: 0.9;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--el-color-info-dark-2);
  }

  .iconfont {
    position: relative;
    top: 51%;
    left: 15%;
  }
}
</style>
