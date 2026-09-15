# Frontend Atlas · 前端图鉴

> 把平时觉得好用的前端能力，收进一个随手可查的后台里。

<p align="center">
  <img src="./public/logo.png" width="140" alt="Frontend Atlas" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-42b883" />
  <img src="https://img.shields.io/badge/Vite-8-646cff" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178c6" />
  <img src="https://img.shields.io/badge/Element%20Plus-2.14-409eff" />
  <img src="https://img.shields.io/badge/Pinia-3-ffd859" />
</p>

## 这是什么

Frontend Atlas（前端图鉴）是一个**个人自用**的前端知识 / 能力整合项目：把日常反复用到的工程能力（权限、请求、主题、图标、错误页、PWA……）沉淀成一套开箱即用的后台底座，同时把脚手架、通用组件和踩坑记录集中整理，需要时随手就能查到。

## 为什么要做

- **自用优先**：平时自己觉得好用的功能，就直接整合进来，不用再到处翻代码片段。
- **一处沉淀**：权限方案、请求封装、主题体系、常用 Hooks 与组件，统一放在一个地方维护和演进。
- **保持更新**：始终基于较新的技术栈，顺便把新学到的东西在项目里实践一遍。

## 功能概览

- **登录**：品牌化登录页，含登录 / 注册 / 重置密码界面
- **权限**：动态路由注册 + 菜单级、按钮级权限控制（当前使用本地 JSON 模拟菜单数据）
- **请求**：Axios 二次封装，支持重复请求取消、全屏 Loading、Token 注入、统一错误码处理
- **主题**：主题色可切换（与 Element CSS 变量联动）、暗黑模式、灰色 / 弱色模式、侧边栏与顶栏反色
- **布局**：纵向布局 + 顶部工具栏 + 多标签页
- **组件与 Hooks**：SVG 图标、开屏 SplashScreen、统一错误页（403 / 404 / 500）、文件下载、表格与操作封装等
- **国际化**：内置 vue-i18n，语言包集中在 `src/languages`
- **PWA**：manifest + Service Worker，通过 `.env` 中的 `VITE_PWA` 开关
- **工程化**：提交前自动检查与格式化，Commit Message 规范校验

## 技术栈

| 分类     | 方案                                                      |
| -------- | --------------------------------------------------------- |
| 框架     | Vue 3.5 + TypeScript 6                                    |
| 构建     | Vite 8                                                    |
| UI       | Element Plus 2.14                                         |
| 状态     | Pinia 3（配合持久化插件）                                 |
| 路由     | Vue Router 5（静态路由 + 动态路由）                       |
| 请求     | Axios                                                     |
| 样式     | Sass / SCSS + Element CSS 变量                            |
| 国际化   | vue-i18n 11                                               |
| 常用库   | VueUse、dayjs、nprogress、screenfull、sortablejs、qs      |
| 代码质量 | ESLint 10 + oxlint + stylelint + Prettier 3               |
| 提交规范 | Husky + lint-staged + commitlint                          |
| 构建插件 | vite-plugin-pwa / svg-icons / compression / visualizer 等 |
| 包管理   | pnpm（Node `^20.19.0 \|\| >=22.12.0`）                    |

## 快速开始

```bash
pnpm install

pnpm dev          # 开发模式，默认 http://localhost:5555
pnpm build        # 类型检查 + 生产构建，输出到 dist
pnpm preview      # 本地预览构建产物，默认 http://localhost:4173
```

其他常用脚本：

```bash
pnpm type-check   # vue-tsc 类型检查
pnpm lint         # oxlint + eslint
pnpm lint:css     # stylelint 样式检查
pnpm format       # prettier 格式化
```

环境变量位于 `.env` / `.env.development` / `.env.production`：接口地址 `VITE_API_URL`（开发环境通过 `VITE_PROXY` 代理到 mock）、站点标题 `VITE_APP_TITLE`、端口 `VITE_PORT`、PWA 开关 `VITE_PWA`。

## 目录结构

```txt
frontend-atlas/
├── build/            # Vite 插件与构建配置
├── public/           # 静态资源（logo、favicon、PWA 图标）
├── scripts/          # 图标生成脚本（SVG -> PNG / ICO）
└── src/
    ├── api/          # 请求封装与接口定义
    ├── assets/       # 图片、图标、JSON 数据
    ├── components/   # 公共组件
    ├── config/       # 全局常量与默认配置
    ├── enums/        # 枚举
    ├── hooks/        # 组合式函数
    ├── languages/    # i18n 语言包
    ├── layouts/      # 布局系统
    ├── routers/      # 路由与守卫
    ├── stores/       # Pinia 状态
    ├── styles/       # 全局样式与主题
    ├── typings/      # 类型声明
    ├── utils/        # 工具函数
    └── views/        # 页面
```

## 说明

- 项目基于开源后台模板 [Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin)（MIT License）二次开发起步，沿用了其整体架构与权限、请求、主题等基础实现，并逐步替换为自有品牌、页面与内容。感谢原作者的开源与分享。
- 登录目前对接公开 mock 接口，仅用于本地体验；注册与重置密码界面已就绪，接口待接入。
- 个人自用项目，暂未附带许可证文件；因沿用 Geeker-Admin（MIT）的实现，需保留其原始版权声明。
