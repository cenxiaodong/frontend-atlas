import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// svg icons
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
