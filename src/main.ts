import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from '@/routers/index';

// element css
import 'element-plus/dist/index.css';
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css';
// svg icons
import 'virtual:svg-icons-register';
// reset
import '@/styles/reset.scss';
// pinia
import pinia from './stores';

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
