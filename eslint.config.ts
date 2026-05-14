import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from 'eslint-config-prettier/flat';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  // 忽略规则工具（告诉 ESLint 哪些文件不检查）
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...(pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json') as any),

  skipFormatting,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
    rules: {
      // eslint (http://eslint.cn/docs/rules)
      'no-debugger': 'error', /// 禁止 debugger
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
      'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们

      // typeScript (https://typescript-eslint.io/rules)
      '@typescript-eslint/no-empty-function': 'error', // 禁止空函数
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
      '@typescript-eslint/ban-ts-comment': 'error', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
      '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
      '@typescript-eslint/no-var-requires': 'off', // 允许使用 require() 函数导入模块
      '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
      'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
      'vue/no-mutating-props': 'error', // 不允许改变组件 prop
      'vue/custom-event-name-casing': 'error', // 为自定义事件名称强制使用特定大小写
      'vue/html-closing-bracket-newline': 'error', // 在标签的右括号之前要求或禁止换行
      'vue/attribute-hyphenation': 'error', // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
      'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
      'vue/no-v-html': 'off', // 禁止使用 v-html
      'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'vue/no-setup-props-destructure': 'off', // 禁止解构 props 传递给 setup
      'no-inline-comments': 'off', // 允许行内注释
      'multiline-comment-style': 'off', // 允许任意多行注释格式
      'spaced-comment': 'off', // 注释前后可以不加空格（如 //注释 不报错）
      'no-comment': 'off', // 允许所有注释（防止误启用该规则）
      // 禁止定义未使用的变量
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
          caughtErrors: 'none', // 完全忽略 catch 参数（v6+ 支持）
        },
      ],
    },
    ignores: [
      '*.sh',
      'node_modules',
      '*.md',
      '*.woff',
      '*.ttf',
      '.vscode',
      '.idea',
      'dist',
      '/public',
      '/docs',
      '.husky',
      '.local',
      '/bin',
      '/src/mock/*',
      'stats.html',
    ],
  },
);
