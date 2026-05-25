import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from '@/routers/index';
import { registerGlobalComponents } from '@/components/global/index';
// common css
import '@/styles/common.scss';
// element css
import 'element-plus/dist/index.css';
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css';
// element icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// svg icons
import 'virtual:svg-icons-register';
// reset
import '@/styles/reset.scss';
// pinia
import pinia from './stores';

const app = createApp(App);

// 注册全局组件
registerGlobalComponents(app);
// 全局错误处理配置
// app.config.errorHandler = errorHandler;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(pinia).mount('#app');
