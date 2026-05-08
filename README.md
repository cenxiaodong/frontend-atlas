# Frontend Atlas

> 企业级前端能力沉淀平台  
> 一个面向现代前端工程化的前端基础设施项目。

---

<p align="center">
  <img src="./public/logo.png" width="160" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.x-42b883" />
  <img src="https://img.shields.io/badge/Vite-5.x-646cff" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6" />
  <img src="https://img.shields.io/badge/ESLint-9.x-4B32C3" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

# ✨ 项目简介

Frontend Atlas 并不是一个简单的“功能集合 Demo”。

它更像是：

```txt
一个企业级前端能力体系仓库
```

目标是将现代前端开发中常见、复杂、可复用的能力：

- 登录体系
- 权限体系
- 请求体系
- UI 体系
- 工程体系
- 插件体系

逐步沉淀为：

```txt
可复用
可扩展
可维护
可演进
```

的现代前端基础设施。

---

# 🚀 核心能力

## 🔐 登录体系

支持：

- 账号密码登录
- 二维码登录
- Chrome 登录
- OAuth 登录
- Token 自动刷新
- 多端会话管理

---

## 🛡 权限体系

支持：

- 动态路由
- RBAC 权限控制
- 按钮权限
- 页面权限
- 菜单权限
- 路由守卫

---

## 🌐 请求体系

支持：

- Axios 二次封装
- 请求拦截器
- 响应拦截器
- Token 自动处理
- 请求取消
- 全局错误处理
- 请求重试机制

---

## 🎨 UI 体系

支持：

- 全局弹窗
- Toast 提示
- Loading 管理
- 主题切换
- 暗黑模式
- 动画体系

---

## ⚙ 工程体系

内置：

- ESLint 9 Flat Config
- Prettier
- Husky
- lint-staged
- Commitlint
- Git Hooks
- Node 多版本管理

实现：

```txt
自动代码检查
自动格式化
自动提交审查
统一代码规范
```

---

# 🧱 技术栈

| 模块         | 技术方案   |
| ------------ | ---------- |
| 前端框架     | Vue 3      |
| 构建工具     | Vite       |
| 开发语言     | TypeScript |
| 状态管理     | Pinia      |
| 路由         | Vue Router |
| 网络请求     | Axios      |
| CSS 预处理器 | Less       |
| 代码检查     | ESLint 9   |
| 代码格式化   | Prettier   |
| Git Hooks    | Husky      |
| Commit 规范  | Commitlint |
| 包管理器     | pnpm       |

---

# 📦 项目结构

```txt
frontend-atlas/
│
├── src/
│   ├── api/             # 请求层
│   ├── assets/          # 静态资源
│   ├── components/      # 公共组件
│   ├── composables/     # 组合式逻辑
│   ├── constants/       # 常量
│   ├── directives/      # 指令
│   ├── hooks/           # hooks
│   ├── layouts/         # 布局系统
│   ├── router/          # 路由系统
│   ├── stores/          # Pinia
│   ├── styles/          # 全局样式
│   ├── types/           # TS 类型
│   ├── utils/           # 工具函数
│   └── views/           # 页面
│
├── .husky/
├── .vscode/
├── eslint.config.js
├── commitlint.config.cjs
├── vite.config.ts
└── package.json
```

---

# 🛠 项目启动

## 安装依赖

```bash
pnpm install
```

---

## 启动项目

```bash
pnpm dev
```

---

## 项目打包

```bash
pnpm build
```

---

# 🧹 工程规范

## ESLint

```bash
pnpm eslint .
```

---

## Prettier

```bash
pnpm format
```

---

## Git 提交审查

项目集成：

- Husky
- lint-staged
- Commitlint

实现：

```txt
提交前自动检查
提交前自动格式化
Commit Message 规范校验
```

---

# 📝 Commit 规范

```bash
feat: 新增登录模块
fix: 修复权限问题
refactor: 重构请求逻辑
docs: 更新 README
```

---

# 🧠 项目理念

Frontend Atlas 更关注：

```txt
工程化
架构化
可维护性
可扩展性
```

而不是：

```txt
简单功能演示页面
```

---

# 🎯 Roadmap

## 第一阶段

- 登录体系
- 权限体系
- 请求体系
- 工程规范体系

---

## 第二阶段

- 插件系统
- 动态布局
- 国际化
- 主题系统

---

## 第三阶段

- 微前端
- Monorepo
- 可视化配置
- 低代码平台

---

# 📌 开发原则

- 单一职责
- 逻辑复用
- 统一请求层
- 类型安全
- 严格 Git 工作流
- 自动化工程规范

---

# 🔥 项目目标

```txt
Frontend Atlas
致力于成为现代企业级前端基础设施平台。
```

---

# 📄 License

MIT License

---

# ⭐ Star

如果这个项目对你有帮助，欢迎点一个 Star ⭐
