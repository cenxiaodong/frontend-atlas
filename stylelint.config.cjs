module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue', 'stylelint-config-standard-scss', 'stylelint-config-recess-order'],

  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],

  rules: {
    'no-empty-source': null, // 允许空 CSS 文件 / 空 style
    'selector-class-pattern': null, //不强制 class 命名规则
    'no-duplicate-selectors': null, // 允许重复 selector
    'import-notation': null, // 不强制 @import 写法
    'media-feature-range-notation': null, //不强制使用新媒体查询语法
    'color-function-notation': null, // 不强制 rgb/rgba 新语法
    'alpha-value-notation': null, //不强制透明度写百分比
    'custom-property-empty-line-before': null,
  },
  // 忽略检查的文件
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/*.js', '**/*.ts', '**/*.json'],
};
