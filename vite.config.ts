import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/getEnv';
import { createProxy } from './build/proxy';
import { createVitePlugins } from './build/plugins';
import pkg from './package.json';
import dayjs from 'dayjs';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const viteEnv = wrapperEnv(env);
  return {
    plugins: createVitePlugins(viteEnv),
    base: viteEnv.VITE_PUBLIC_PATH,
    server: {
      host: '0.0.0.0', // 确保允许网络访问
      port: viteEnv.VITE_PORT, // 明确指定端口
      open: viteEnv.VITE_OPEN, // 自动打开浏览器
      hmr: {
        overlay: true, // 报错时弹出遮罩层
      },
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    build: {
      outDir: 'dist', // 打包产物输出到 dist/ 目录
      minify: 'terser', //  使用 Terser 作为生产环境的代码压缩工具
      sourcemap: false, // 不生成 source map 文件，减小体积、加快构建
      reportCompressedSize: false, // 构建完成后不计算/打印 gzip 压缩大小报告，略微提速
      // chunkSizeWarningLimit: 2000, // 单个 chunk 超过 2000KB（2MB）才告警，避免大库拆得太碎一直刷屏
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE, // 移除 console.* 调用
          drop_debugger: viteEnv.VITE_DROP_DEBUGGER, // 移除 debugger 语句
        },
      },
      rolldownOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js', // 入口 JS 的命名
          entryFileNames: 'assets/js/[name]-[hash].js', // 代码分包（code splitting）产物的命名。就是 import 语句触发的动态加载、或者通过 manualChunks 手动拆出来的 JS（node_modules 库拆成 vendorchunk 等）。数量可以很多。
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
