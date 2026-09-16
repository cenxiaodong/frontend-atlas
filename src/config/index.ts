// 全局默认配置项

// 应用名称，统一从 .env 读取，改项目名时只需要改 .env
// 中文名：浏览器标签、PWA、侧边栏 logo 文案
export const APP_TITLE: string = import.meta.env.VITE_APP_TITLE;

// 英文名：登录页品牌区、页脚等处
export const APP_TITLE_EN: string = import.meta.env.VITE_APP_TITLE_EN;

// 首页地址（默认）
// export const HOME_URL: string = '/403';
export const HOME_URL: string = '/home/index';

// 登录页地址（默认）
export const LOGIN_URL: string = '/login';

// 默认主题颜色
export const DEFAULT_PRIMARY: string = '#6366f1';

// 路由白名单地址
export const ROUTER_WHITE_LIST: string[] = ['/500', '/403', '/404'];

// 高德地图 key
export const AMAP_MAP_KEY: string = '';

// 百度地图 key
export const BAIDU_MAP_KEY: string = '';

// Element Plus 弹层（对话框/抽屉/MessageBox 等）的起始层级，需大于布局层（见 src/styles/z-index.scss）
export const ELEMENT_Z_INDEX: number = 2000;

// 移动端屏幕宽度
export const MOBILE_WIDTH: number = 768;
