<template>
  <svg :style="finalStyle" aria-hidden="true">
    <use :href="symbolId" :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

interface SvgProps {
  /** 图标的名称（对应 SVG 文件名） */
  name: string;
  /** 图标的前缀（默认：icon） */
  prefix?: string;
  /** 图标颜色（默认：currentColor） */
  color?: string;
  // 三种尺寸设置方式
  size?: string; // 推荐：同时设置宽高
  width?: string; // 可选：单独设置宽度
  height?: string; // 可选：单独设置高度
  /** 自定义样式（优先级最高） */
  iconStyle?: CSSProperties;
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: 'icon',
  size: '50px',
  iconStyle: () => ({}),
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
// 合并样式：自定义样式会覆盖快捷设置
// const finalStyle = computed<CSSProperties>(() => ({}));
const finalStyle = computed<CSSProperties>(() => {
  // 优先级：width/height > size > 默认值
  let width: string | undefined;
  let height: string | undefined;

  if (props.width && props.height) {
    // 1. 明确指定了宽高
    width = props.width;
    height = props.height;
  } else if (props.width || props.height) {
    // 2. 只指定了一个，另一个等比（保持正方形）
    width = props.width || props.size;
    height = props.height || props.size;
  } else {
    // 3. 使用 size
    width = props.size;
    height = props.size;
  }

  return {
    width,
    height,
    ...props.iconStyle, // 自定义样式优先级最高
  };
});
</script>
