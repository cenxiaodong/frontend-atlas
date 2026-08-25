import type { App, Component } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import SplashScreen from '@/components/SplashScreen/index.vue';

interface GlobalComponents {
  [key: string]: Component;
}

const globalComponents: GlobalComponents = {
  SvgIcon,
  SplashScreen,
};

export function registerGlobalComponents(app: App) {
  Object.entries(globalComponents).forEach(([name, component]) => {
    app.component(name, component);
  });
}
