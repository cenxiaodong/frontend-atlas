<template>
  <div class="search-menu">
    <el-tooltip :content="`搜索菜单（${shortcutText}）`" placement="bottom">
      <SvgIcon name="sousuo" size="17px" @click="toggleSearch" />
    </el-tooltip>

    <el-dialog
      class="search-dialog"
      v-model="isShowSearch"
      :width="globalStore.device === 'mobile' ? '85vw' : '40vw'"
      :show-close="false"
      top="10vh"
      append-to-body
      @opened="focusInput"
    >
      <el-input v-model="searchMenu" ref="menuInputRef" placeholder="菜单搜索：支持菜单名称、路径" size="large" clearable :prefix-icon="Search" />
      <div v-if="searchList.length" class="menu-list" ref="menuListRef">
        <div
          v-for="item in searchList"
          :key="item.path"
          :class="['menu-item', { 'menu-active': item.path === activePath }]"
          @mouseenter="mouseoverMenuItem(item)"
          @click="handleClickMenu()"
        >
          <div class="menu-lf">
            <el-icon class="menu-icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="menu-title">{{ item.meta.title }}</span>
          </div>
          <SvgIcon name="huiche" size="26px" @click="toggleSearch" />
        </div>
      </div>
      <el-empty v-else class="mt20 mb20" :image-size="100" description="暂无菜单" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import type { InputInstance } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/modules/auth';
import { useRouter } from 'vue-router';
import { useDebounceFn, useMagicKeys } from '@vueuse/core';
import { useGlobalStore } from '@/stores/modules/global';

const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const menuList = computed(() => authStore.flatMenuListGet.filter((item) => !item.meta.isHide));

const activePath = ref('');
const mouseoverMenuItem = (menu: Menu.MenuOptions) => {
  activePath.value = menu.path;
};

const menuInputRef = ref<InputInstance | null>(null);
const isShowSearch = ref<boolean>(false);
const searchMenu = ref<string>('');

// ==================== 打开 / 关闭 ====================
// 快捷键提示按平台显示，免得 Windows 用户看到 ⌘ 一脸懵
const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const shortcutText = isMac ? '⌘K' : 'Ctrl+K';

const focusInput = () => {
  // 挂在 dialog 的 opened 上：此时打开动画已结束，聚焦不会带着动画一起滚
  menuInputRef.value?.focus();
};

const toggleSearch = () => {
  isShowSearch.value = !isShowSearch.value;
};

// Cmd+K（mac）/ Ctrl+K（win）全局唤起。
// 注意：Ctrl+K 是浏览器自带的「聚焦地址栏」，必须 preventDefault 拦掉，
// 而 preventDefault 要求 useMagicKeys 用非 passive 方式监听。
const keys = useMagicKeys({
  passive: false,
  onEventFired: (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) e.preventDefault();
  },
});

// noUncheckedIndexedAccess 下 Record 取下标可能是 undefined，所以这里用可选链
const commandK = computed(() => keys['Meta+K']?.value || keys['Ctrl+K']?.value);
watch(commandK, (pressed) => {
  if (pressed) toggleSearch();
});

// ==================== 搜索 ====================
watch(isShowSearch, (val) => {
  if (val) {
    document.addEventListener('keydown', keyboardOperation);
  } else {
    document.removeEventListener('keydown', keyboardOperation);
  }
});

const searchList = ref<Menu.MenuOptions[]>([]);
const updateSearchList = () => {
  searchList.value = searchMenu.value
    ? menuList.value.filter(
        (item) =>
          (item.path.toLowerCase().includes(searchMenu.value.toLowerCase()) ||
            item.meta.title.toLowerCase().includes(searchMenu.value.toLowerCase())) &&
          !item.meta?.isHide,
      )
    : [];
  const firstMenu = searchList.value[0];
  activePath.value = firstMenu?.path || '';
};

const debouncedUpdateSearchList = useDebounceFn(updateSearchList, 300);

watch(searchMenu, debouncedUpdateSearchList);

const menuListRef = ref<Element | null>(null);
const keyPressUpOrDown = (direction: number) => {
  const length = searchList.value.length;
  if (length === 0) return;
  const index = searchList.value.findIndex((item) => item.path === activePath.value);
  const newIndex = (index + direction + length) % length;
  const target = searchList.value[newIndex];
  if (!target) return;
  activePath.value = target.path;
  nextTick(() => {
    if (!menuListRef.value?.firstElementChild) return;
    const menuItemHeight = menuListRef.value.firstElementChild.clientHeight + 12 || 0;
    menuListRef.value.scrollTop = newIndex * menuItemHeight;
  });
};

const keyboardOperation = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    keyPressUpOrDown(-1);
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    keyPressUpOrDown(1);
  } else if (event.key === 'Enter') {
    event.preventDefault();
    handleClickMenu();
  }
};

const handleClickMenu = () => {
  const menu = searchList.value.find((item) => item.path === activePath.value);
  if (!menu) return;
  if (menu.meta?.isLink) window.open(menu.meta.isLink, '_blank');
  else router.push(menu.path);
  searchMenu.value = '';
  isShowSearch.value = false;
};
</script>

<style lang="scss" scoped>
.search-menu {
  display: flex;
  align-items: center;
}

// 弹窗加了 append-to-body 后挂在 body 下，内容元素仍带 scoped 标记，所以这些规则放顶层
.menu-list {
  max-height: 515px;
  margin-top: 15px;
  overflow: auto;

  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 20px;
    margin: 10px 0;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    background-color: transparent;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    transition: all 0.2s ease;

    .menu-lf {
      display: flex;
      align-items: center;
    }

    .menu-icon {
      margin-right: 8px;
      font-size: 16px;
    }

    .menu-title {
      font-size: 14px;
    }
  }

  .menu-active {
    color: #fff;
    background-color: var(--el-color-primary);

    .menu-icon {
      font-size: 18px;
    }

    .menu-title {
      font-size: 16px;
    }

    .menu-enter {
      font-size: 19px;
    }
  }
}
</style>

<style lang="scss">
// el-dialog 本体由 Element 渲染且已 teleport 到 body，scoped 选不中，需要全局样式
.search-dialog.el-dialog,
.search-dialog .el-dialog {
  border-radius: 4px;

  .el-dialog__header {
    display: none;
  }
}
</style>
