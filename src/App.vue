<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
// import { getMenuList } from '@/api/modules/user';

const userStore = useUserStore();
const authStore = useAuthStore();

console.log(authStore.authMenuList);

const getUser = () => {
  // getMenuList().then((res) => {
  //   console.log(res.data);
  // });
};

userStore.setToken('bqddxxwqmfncffacvbpkuxvwvqrhln');
</script>

<template>
  <el-button type="primary" @click="getUser">获取用户</el-button>
  <router-view></router-view>
</template>

<style lang="scss"></style>
