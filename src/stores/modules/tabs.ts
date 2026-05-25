import router from '@/routers';
import { defineStore } from 'pinia';
import { getUrlWithParams } from '@/utils';
import { useKeepAliveStore } from './keepAlive';
import type { TabsState, TabsMenuProps } from '@/stores/interface';
import piniaPersistConfig from '@/stores/helper/persist';

const keepAliveStore = useKeepAliveStore();

export const useTabsStore = defineStore('atlas-tabs', {
  state: (): TabsState => ({
    tabsMenuList: [],
  }),
  actions: {
    // Add Tabs
    async addTabs(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every((item: TabsMenuProps) => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
      // add keepalive
      if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAliveName(tabItem.path);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabsMenuList.forEach((item: TabsMenuProps, index: number) => {
          if (item.path !== tabPath) return;
          const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // remove keepalive
      const tabItem = this.tabsMenuList.find((item: TabsMenuProps) => item.path === tabPath);
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path);
      // set tabs
      this.tabsMenuList = this.tabsMenuList.filter((item: TabsMenuProps) => item.path !== tabPath);
    },
    // Close Tabs On Side
    async closeTabsOnSide(path: string, type: 'left' | 'right') {
      const currentIndex = this.tabsMenuList.findIndex((item: TabsMenuProps) => item.path === path);
      if (currentIndex !== -1) {
        const range = type === 'left' ? [0, currentIndex] : [currentIndex + 1, this.tabsMenuList.length];
        this.tabsMenuList = this.tabsMenuList.filter((item: TabsMenuProps, index: number) => {
          return index < range[0] || index >= range[1] || !item.close;
        });
      }
      // set keepalive
      const KeepAliveList = this.tabsMenuList.filter((item: TabsMenuProps) => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map((item: TabsMenuProps) => item.path));
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item: TabsMenuProps) => {
        return item.path === tabsMenuValue || !item.close;
      });
      // set keepalive
      const KeepAliveList = this.tabsMenuList.filter((item: TabsMenuProps) => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map((item: TabsMenuProps) => item.path));
    },
    // Set Tabs
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
    // Set Tabs Title
    async setTabsTitle(title: string) {
      this.tabsMenuList.forEach((item: TabsMenuProps) => {
        if (item.path == getUrlWithParams()) item.title = title;
      });
    },
  },
  persist: piniaPersistConfig('atlas-tabs'),
});
