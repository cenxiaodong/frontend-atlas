import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloJsx',
  setup() {
    return () => (
      <div style={{ color: 'red', padding: '20px' }}>
        <h1>JSX 插件安装成功！🎉</h1>
        <p>如果你能看到这段文字，说明插件正常工作</p>
      </div>
    );
  },
});
