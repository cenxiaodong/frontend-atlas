import { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from 'vite-plugin-eslint';
import vueDevTools from 'vite-plugin-vue-devtools';
// unplugin插件自动生成的类型声明文件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_APP_TITLE, VITE_DEVTOOLS } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // Vue 开发者工具（Vue DevTools）直接内置到你的 Vite 开发服务器中
    VITE_DEVTOOLS && vueDevTools({ launchEditor: 'code' }),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // 创建打包压缩配置
    createCompression(viteEnv),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: VITE_APP_TITLE,
        },
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ];
};

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(',');
  const plugins: PluginOption[] = [];
  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        ext: '.gz', // 生成 .gz 后缀的压缩文件
        algorithm: 'gzip', // 使用 gzip 压缩算法
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, // 保留原始文件（你配置的是这个值）
      }),
    );
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br', // 生成 .br 后缀的压缩文件
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    );
  }
  return plugins;
};
