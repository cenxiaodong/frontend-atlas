<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils';
import { useTheme } from '@/hooks/useTheme';
import { useUserStore } from '@/stores/modules/user';
import { useGlobalStore } from '@/stores/modules/global';
import type { LanguageType } from './stores/interface';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const userStore = useUserStore();
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

userStore.setToken('bqddxxwqmfncffacvbpkuxvwvqrhln');
</script>

<template>
  <el-config-provider :locale="locale" :size="assemblySize">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss"></style>
