<template>
  <div class="login-page">
    <svg class="login-defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lg-login-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style="stop-color: var(--el-color-primary-light-4, #818cf8)" />
          <stop offset="1" style="stop-color: var(--el-color-primary-dark-2, #4f46e5)" />
        </linearGradient>
      </defs>
    </svg>

    <span class="orb orb-a" aria-hidden="true"></span>
    <span class="orb orb-b" aria-hidden="true"></span>

    <div class="login-shell">
      <!-- 左侧品牌区 -->
      <aside class="brand">
        <div class="brand-head">
          <span class="brand-mark">
            <svg width="34" height="34" viewBox="0 0 48 48">
              <rect width="48" height="48" rx="13" fill="url(#lg-login-mark)" />
              <path d="M13.5 18 21 24l-7.5 6" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20.6 11 27.4 37" stroke="#fff" stroke-width="3.6" stroke-linecap="round" />
              <path d="M34.5 18 27 24l7.5 6" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div class="brand-name">
            <b>Frontend Atlas</b>
            <span>前端图鉴</span>
          </div>
        </div>

        <div class="brand-body">
          <h2>
            把前端经验<br />
            画成一张<span>地图</span>
          </h2>
          <p class="brand-desc">脚手架、通用组件与踩坑记录，沉淀成随时查阅、随取随用的前端知识图鉴。</p>
        </div>

        <p class="brand-foot">© 2026 Frontend Atlas · 让前端知识有迹可循</p>
      </aside>

      <!-- 右侧表单区 -->
      <main class="form-panel">
        <div class="form-head">
          <span class="mini-mark">
            <svg width="24" height="24" viewBox="0 0 48 48">
              <rect width="48" height="48" rx="13" fill="url(#lg-login-mark)" />
              <path d="M13.5 18 21 24l-7.5 6" fill="none" stroke="#fff" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20.4 12 27.6 36" stroke="#fff" stroke-width="4.4" stroke-linecap="round" />
              <path d="M34.5 18 27 24l7.5 6" fill="none" stroke="#fff" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div class="form-head-text">
            <h3>{{ isLogin ? '欢迎回来' : '创建账号' }}</h3>
          </div>
        </div>

        <div class="mode-switch">
          <button type="button" :class="{ on: isLogin }" @click="switchMode('login')">登 录</button>
          <button type="button" :class="{ on: !isLogin }" @click="switchMode('register')">注 册</button>
        </div>

        <el-form v-if="isLogin" ref="formRef" class="login-form" :model="form" :rules="rules" size="large" @keyup.enter="submit">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名" :prefix-icon="User" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="密码（至少 6 位）" :prefix-icon="Lock" show-password />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="remember">记住账号</el-checkbox>
            <el-link type="primary" underline="hover" @click="onForgot">忘记密码？</el-link>
          </div>

          <el-button class="submit-btn" type="primary" size="large" :loading="loading" @click="submit">
            {{ loading ? '登录中…' : '登 录' }}
          </el-button>
        </el-form>

        <p v-if="isLogin" class="form-foot">
          还没有账号？
          <el-link type="primary" underline="hover" @click="switchMode('register')">去注册</el-link>
        </p>

        <el-form
          v-else
          ref="regRef"
          class="login-form register-form"
          :model="regForm"
          :rules="registerRules"
          size="large"
          @keyup.enter="handleRegister"
        >
          <el-form-item prop="username">
            <el-input v-model="regForm.username" placeholder="用户名" :prefix-icon="User" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="regForm.password" type="password" placeholder="设置密码（至少 6 位）" :prefix-icon="Lock" show-password />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="regForm.confirmPassword"
              type="password"
              placeholder="再次输入密码"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="handleRegister"
            />
          </el-form-item>
          <el-button class="submit-btn" type="primary" size="large" @click="handleRegister">注 册</el-button>
        </el-form>

        <p v-if="!isLogin" class="form-foot">
          已有账号？
          <el-link type="primary" underline="hover" @click="switchMode('login')">去登录</el-link>
        </p>
      </main>
    </div>

    <el-dialog v-model="resetVisible" class="reset-dialog" title="重置密码" width="min(420px, 92vw)" @closed="resetRef?.clearValidate()">
      <div class="reset-tip">忘记密码？输入用户名并设置新密码即可重置。</div>
      <el-form ref="resetRef" :model="resetForm" :rules="resetRules" label-position="top" size="large" @keyup.enter="handleResetPassword">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="resetForm.username" placeholder="请输入用户名" :prefix-icon="User" clearable />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetForm.password" type="password" placeholder="至少 6 位" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="resetForm.confirmPassword"
            type="password"
            placeholder="再次输入新密码"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="handleResetPassword"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetVisible = false" size="large">取消</el-button>
        <el-button type="primary" @click="handleResetPassword" size="large">确认重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="login">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Lock, User } from '@element-plus/icons-vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { HOME_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
// import { loginApi } from '@/api/modules/login';

const REMEMBER_KEY = 'atlas-login-account';

const router = useRouter();
const userStore = useUserStore();
const formRef = ref<FormInstance>();
const loading = ref(false);
const remember = ref(true);

const form = reactive({
  username: '',
  password: '',
});

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6-20 位', trigger: 'blur' },
  ],
};

// 登录 / 注册切换
const mode = ref<'login' | 'register'>('login');
const isLogin = computed(() => mode.value === 'login');
const switchMode = (m: 'login' | 'register') => {
  mode.value = m;
  loading.value = false;
};

// 注册表单
const regRef = ref<FormInstance>();
const regForm = reactive({ username: '', password: '', confirmPassword: '' });
const samePwdValidator = (getPwd: () => string) => (_rule: any, value: string, cb: (err?: Error) => void) => {
  if (!value) cb(new Error('请再次输入密码'));
  else if (value !== getPwd()) cb(new Error('两次输入的密码不一致'));
  else cb();
};
const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度为 2-20 位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6-20 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: samePwdValidator(() => regForm.password), trigger: 'blur' },
  ],
};

// 重置密码弹窗
const resetVisible = ref(false);
const resetRef = ref<FormInstance>();
const resetForm = reactive({ username: '', password: '', confirmPassword: '' });
const resetRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6-20 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: samePwdValidator(() => resetForm.password), trigger: 'blur' },
  ],
};

onMounted(() => {
  const saved = localStorage.getItem(REMEMBER_KEY);
  if (saved) {
    form.username = saved;
    remember.value = true;
  }
});

const rememberAccount = () => {
  if (remember.value && form.username) localStorage.setItem(REMEMBER_KEY, form.username);
  else localStorage.removeItem(REMEMBER_KEY);
};

const submit = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // let { data } = await loginApi({ username: form.username, password: form.password });
      const data = {
        access_token: 'dnfjdjfjdf34',
      };
      userStore.setToken(data.access_token);
      userStore.setUserInfo({ name: form.username });
      rememberAccount();
      ElMessage.success('登录成功，欢迎回来');
      await initDynamicRouter();
      await router.push(HOME_URL);
    } catch {
      // 错误提示由请求拦截器统一处理
    } finally {
      loading.value = false;
    }
  });
};

const onForgot = () => {
  resetForm.username = form.username;
  resetVisible.value = true;
};
const handleRegister = () => {
  regRef.value?.validate((valid) => {
    if (!valid) return;
    // TODO: 注册接口待接入
    ElMessage.info('注册功能待接入');
  });
};
const handleResetPassword = () => {
  resetRef.value?.validate((valid) => {
    if (!valid) return;
    // TODO: 重置密码接口待接入
    ElMessage.info('重置密码接口待接入');
  });
};
</script>

<style scoped lang="scss">
.login-page {
  position: relative;

  .login-defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 32px 20px;
  overflow: hidden;
  background: var(--el-bg-color-page, #f2f3f5);

  // 背景装饰
  .orb {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(100px);

    &.orb-a {
      top: -180px;
      left: -160px;
      width: 520px;
      height: 520px;
      background: var(--el-color-primary, #6366f1);
      opacity: 0.08;
    }

    &.orb-b {
      right: -140px;
      bottom: -200px;
      width: 560px;
      height: 560px;
      background: var(--el-color-primary-light-7, #c7d2fe);
      opacity: 0.5;
    }
  }
}

.login-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(340px, 1fr);
  width: min(940px, 100%);

  // min-height: 600px;
  overflow: hidden;
  background: var(--el-bg-color-overlay, #fff);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 24px;
  box-shadow: 0 24px 70px -24px rgb(0, 0, 0, 0.24);
  animation: login-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

// ===== 左侧品牌 =====
.brand {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 42px 30px;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(
    160deg,
    var(--el-color-primary-light-3, #818cf8) 0%,
    var(--el-color-primary, #6366f1) 55%,
    var(--el-color-primary-dark-2, #4f46e5) 100%
  );

  .brand-head {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 12px;
    align-items: center;

    .brand-mark {
      display: inline-flex;
      padding: 3px;
      background: rgb(255, 255, 255, 0.16);
      border-radius: 12px;
      backdrop-filter: blur(4px);
    }

    .brand-name {
      display: flex;
      flex-direction: column;
      line-height: 1.25;

      b {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 0.02em;
      }

      span {
        font-size: 12.5px;
        color: rgb(255, 255, 255, 0.72);
        letter-spacing: 0.35em;
      }
    }
  }

  .brand-body {
    position: relative;
    z-index: 1;
    margin: 72px 0 0;

    h2 {
      margin: 0;
      font-size: 34px;
      font-weight: 800;
      line-height: 1.4;

      span {
        position: relative;
        z-index: 0;
        margin-left: 4px;

        &::after {
          position: absolute;
          right: -2px;
          bottom: 2px;
          left: -2px;
          z-index: -1;
          height: 14px;
          content: '';
          background: rgb(255, 255, 255, 0.28);
          border-radius: 4px;
          transform: rotate(-2deg);
        }
      }
    }

    .brand-desc {
      max-width: 400px;
      margin: 20px 0 0;
      font-size: 15px;
      line-height: 2;
      color: rgb(255, 255, 255, 0.8);
    }
  }

  .brand-foot {
    position: relative;
    z-index: 1;
    padding-top: 64px;
    margin: auto 0 0;
    font-size: 12px;
    color: rgb(255, 255, 255, 0.55);
    letter-spacing: 0.04em;
  }
}

// ===== 右侧表单 =====
.form-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 48px;

  .form-head {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 18px;

    .mini-mark {
      display: inline-flex;
      flex: none;
    }

    .form-head-text {
      h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        color: var(--el-text-color-primary);
      }
    }
  }

  .mode-switch {
    display: flex;
    gap: 4px;
    padding: 4px;
    margin-bottom: 24px;
    background: var(--el-fill-color-light, #f5f7fa);
    border-radius: 999px;

    button {
      flex: 1;
      height: 36px;
      padding: 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--el-text-color-secondary);
      cursor: pointer;
      background: transparent;
      border: 0;
      border-radius: 999px;
      transition:
        color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;

      &.on {
        color: var(--el-color-primary);
        background: var(--el-bg-color-overlay, #fff);
        box-shadow: 0 2px 6px rgb(0, 0, 0, 0.1);
      }
    }
  }

  .form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px 0 22px;
  }

  .submit-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.2em;
    border-radius: 10px;
    box-shadow: 0 12px 24px -14px var(--el-color-primary, #6366f1);
  }

  .form-foot {
    margin: 20px 0 0;
    font-size: 13.5px;
    color: var(--el-text-color-secondary);
    text-align: center;
  }
}

.reset-tip {
  padding: 10px 12px;
  margin-bottom: 18px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-light, #f5f7fa);
  border-radius: 8px;
}

@media (max-width: 900px) {
  .login-shell {
    grid-template-columns: 1fr;
    width: min(480px, 100%);
  }

  .brand {
    display: none;
  }

  .form-panel {
    padding: 44px 32px;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px 12px;
  }

  .login-shell {
    border-radius: 18px;
  }

  .form-panel {
    padding: 20px 22px;
  }
}

@keyframes login-rise {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-shell {
    animation: none;
  }
}
</style>

<style lang="scss">
// 重置密码弹窗（el-dialog 渲染在 body 下，需要非 scoped 样式）
.reset-dialog.el-dialog,
.reset-dialog .el-dialog {
  border-radius: 16px;
}

.reset-dialog .el-dialog__header {
  padding-bottom: 6px;
}
</style>
