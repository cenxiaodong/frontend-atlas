import { resolve }from 'path'
import { PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import checker from 'vite-plugin-checker'
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
  const { VITE_APP_TITLE, VITE_DEVTOOLS, VITE_PWA, VITE_REPORT,VITE_CODEINSPECTOR } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // Vue 开发者工具（Vue DevTools）直接内置到你的 Vite 开发服务器中
    VITE_DEVTOOLS && vueDevTools({ launchEditor: 'code' }),
    // esLint 报错信息显示在浏览器界面上
    checker({
      // 开启 TypeScript 检查（使用项目根目录的 tsconfig.json）
      typescript:true,
       // 开启 ESLint 检查，并指定检查命令和范围
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue,js,jsx}"',
      },
        // （可选）如果你的项目有样式规范，可以开启 Stylelint
      // stylelint: {
      //   lintCommand: 'stylelint "./src/**/*.{css,scss,vue}"',
      // },
      // 控制是否在浏览器上显示错误遮罩层，开发时建议开启
      overlay: {
        initialIsOpen: true, // 初始不自动打开，有错误时会在右下角显示一个弹窗
      },
    }),
    // svg 图标
    createSvgIconsPlugin({
      // 指定存放 SVG 图标的文件夹路径
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      // 定义生成 symbol 的 id 格式，[name] 会被替换为文件名
      symbolId: "icon-[dir]-[name]"
    }),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 动态修改 HTML 内容和压缩生产环境的 HTML 代码
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: VITE_APP_TITLE,
        },
      },
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 自动 IDE 并将光标定位到 DOM 对应的源代码位置。see: https://inspector.fe-dev.cn/guide/start.html
    VITE_CODEINSPECTOR && codeInspectorPlugin({
      bundler:'vite',
      editor:'code'
    }),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ open: false, filename: 'stats.html', gzipSize: true, brotliSize: true }) as PluginOption),
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

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: VITE_APP_TITLE,
      short_name: VITE_APP_TITLE,
      description: '一个面向现代前端工程化的前端基础设施项目。',
      theme_color: '#ffffff',

      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },

    devOptions: {
      enabled: true,
    },
  });
};
