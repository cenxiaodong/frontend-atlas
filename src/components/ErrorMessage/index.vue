<template>
  <div class="error-container" :class="{ 'is-embed': !fullscreen }">
    <div class="error-box">
      <img :src="config.img" class="error-img" :alt="`${code} 错误`" />
      <div class="error-detail">
        <h2 class="error-code">{{ code }}</h2>
        <h4 class="error-desc">{{ desc }}</h4>
        <div class="error-actions">
          <el-button type="primary" round @click="goHome">返回首页</el-button>
          <el-button v-if="canGoBack()" round @click="goBack">返回上一页</el-button>
          <el-button v-if="config.refresh" round plain @click="refresh">刷新页面</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ErrorMessage">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { HOME_URL } from '@/config';
import img403 from '@/assets/images/403.png';
import img404 from '@/assets/images/404.png';
import img500 from '@/assets/images/500.png';

interface ErrorConfig {
  img: string;
  desc: string;
  refresh?: boolean;
}

const ERROR_MAP: Record<string, ErrorConfig> = {
  '403': {
    img: img403,
    desc: '抱歉，当前账号没有权限访问该页面，如需开通请联系管理员。',
  },
  '404': {
    img: img404,
    desc: '抱歉，您访问的页面不存在或已被移除，请检查网址是否正确。',
  },
  '500': {
    img: img500,
    desc: '系统繁忙或发生异常，请稍后重试，也可以刷新页面看看。',
    refresh: true,
  },
};

interface Props {
  /** 错误码，可选：403 / 404 / 500，默认 404 */
  code?: string;
  /** 自定义描述(可选)，覆盖默认文案 */
  desc?: string;
  /** 是否整屏展示(默认整屏，传 false 可内嵌到任意容器) */
  fullscreen?: boolean;
}

const props = withDefaults(defineProps<Props>(), { code: '404', fullscreen: true });

const router = useRouter();
const config = computed<ErrorConfig>(() => ERROR_MAP[props.code] ?? ERROR_MAP['404']!);
const desc = computed(() => props.desc ?? config.value.desc);
const canGoBack = () => window.history.length > 1;

const goHome = () => router.push(HOME_URL);
const goBack = () => router.back();
const refresh = () => window.location.reload();
</script>

<style scoped lang="scss">
@use './index';
</style>
