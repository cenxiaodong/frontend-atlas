<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils';
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStore } from '@/stores/modules/global';
import { ELEMENT_Z_INDEX } from '@/config';
import type { LanguageType } from './stores/interface';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

// init theme
const { initTheme } = useTheme();
initTheme();

// init language
const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState('language', language as LanguageType);
});

const locale = computed(() => {
  if (globalStore.language == 'zh') return zhCn;
  if (globalStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});
</script>

<template>
  <el-config-provider :locale="locale" :size="assemblySize" :z-index="ELEMENT_Z_INDEX">
    <router-view></router-view>
  </el-config-provider>
  <!-- <SplashScreen /> -->
</template>

<style lang="scss"></style>
