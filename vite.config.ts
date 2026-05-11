import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
// import { wrapperEnv } from './build/getEnv';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      host: '0.0.0.0', // 确保允许网络访问
      port: 5555, // 明确指定端口
      open: true, // 自动打开浏览器
      // hmr: {
      //   overlay: true,
      // },
    },
    // base: import.meta.env.BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
