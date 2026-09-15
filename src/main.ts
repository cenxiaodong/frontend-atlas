import { createApp } from 'vue';

import App from './App.vue';
import router from '@/routers/index';
import { registerGlobalComponents } from '@/components/global/index';
// element css
import 'element-plus/dist/index.css';
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css';

// 层级规范（z-index 变量）
import '@/styles/z-index.scss';
// 布局尺寸变量（高度/宽度）
import '@/styles/layout.scss';
// 样式reset文件
import '@/styles/reset.scss';
// common css
import '@/styles/common.scss';
// custom element css
import '@/styles/element.scss';
// element icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// svg icons
import 'virtual:svg-icons-register';
// reset
import '@/styles/reset.scss';
// pinia
import pinia from './stores';
// vue i18n
import I18n from '@/languages/index';
// directives
import directives from '@/directives/index.ts';

const app = createApp(App);

// 注册全局组件
registerGlobalComponents(app);
// 全局错误处理配置
// app.config.errorHandler = errorHandler;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(directives).use(pinia).use(I18n).mount('#app');
