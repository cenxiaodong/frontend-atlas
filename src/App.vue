<script setup lang="ts">
import { computed } from 'vue';
import { getBrowserLang } from '@/utils';
import { useTheme } from '@/hooks/useTheme';
import { useUserStore } from '@/stores/modules/user';
import { useGlobalStore } from '@/stores/modules/global';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const locale = computed(() => {
  if (globalStore.language == 'zh') return zhCn;
  if (globalStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});

const { initTheme } = useTheme();
initTheme();

userStore.setToken('bqddxxwqmfncffacvbpkuxvwvqrhln');
</script>

<template>
  <el-config-provider :locale="locale" :size="assemblySize">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss"></style>
