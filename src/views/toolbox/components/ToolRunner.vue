<template>
  <div class="tool-runner">
    <div class="tool-runner-bar">
      <el-button v-for="action in tool.actions" :key="action.label" type="primary" plain size="small" @click="run(action)">
        {{ action.label }}
      </el-button>
      <el-button size="small" @click="reset">清空</el-button>
    </div>

    <div v-if="tool.param" class="tool-runner-field">
      <span class="tool-runner-label">{{ tool.param.label }}</span>
      <el-input v-model="param" type="textarea" :rows="tool.param.rows ?? 2" :placeholder="tool.param.placeholder" />
    </div>

    <div class="tool-runner-field">
      <span v-if="tool.inputLabel" class="tool-runner-label">{{ tool.inputLabel }}</span>
      <el-input v-model="input" type="textarea" :rows="6" :placeholder="tool.placeholder" />
    </div>

    <template v-if="output">
      <div class="tool-runner-head">
        <span class="tool-runner-label">输出</span>
        <div class="tool-runner-ops">
          <el-button v-if="tree.ok" link type="primary" size="small" @click="toggleView">
            {{ viewMode === 'tree' ? '看原文' : '看结构' }}
          </el-button>
          <el-button v-copy="output" link type="primary" size="small">复制</el-button>
        </div>
      </div>
      <JsonTree v-if="tree.ok && viewMode === 'tree'" :data="tree.value" />
      <el-input v-else v-model="output" type="textarea" :rows="6" readonly />
    </template>
  </div>
</template>

<script setup lang="ts" name="ToolRunner">
import { computed, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import JsonTree from './JsonTree.vue';
import type { ToolAction, ToolItem } from '../tools';

const props = defineProps<{ tool: ToolItem }>();

const input = ref('');
const param = ref(props.tool.param?.value ?? '');
const output = ref('');
const viewMode = ref<'tree' | 'raw'>('tree');

// 声明了 output: 'json' 的工具，输出能被解析时就用树渲染；解析不了（比如粘了半截 JSON）自动退回文本
const tree = computed<{ ok: boolean; value: unknown }>(() => {
  if (props.tool.output !== 'json' || !output.value) return { ok: false, value: null };
  try {
    return { ok: true, value: JSON.parse(output.value) };
  } catch {
    return { ok: false, value: null };
  }
});

const toggleView = () => {
  viewMode.value = viewMode.value === 'tree' ? 'raw' : 'tree';
};

const reset = () => {
  input.value = '';
  // 参数框回落到工具自带的默认值（正则的 \d+、根字号的 16 之类）
  param.value = props.tool.param?.value ?? '';
  output.value = '';
  viewMode.value = 'tree';
};

const run = (action: ToolAction) => {
  try {
    output.value = action.run(input.value, param.value);
    viewMode.value = 'tree';
  } catch (error) {
    output.value = '';
    ElMessage.error((error as Error).message);
  }
};

// 换成另一个工具时清空，免得上一个工具的输入残留
watch(
  () => props.tool.key,
  () => reset(),
);
</script>

<style lang="scss" scoped>
.tool-runner {
  .tool-runner-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .tool-runner-field {
    margin-bottom: 12px;

    .tool-runner-label {
      display: block;
      margin-bottom: 6px;
    }
  }

  .tool-runner-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0 6px;
  }

  .tool-runner-ops {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .tool-runner-label {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
