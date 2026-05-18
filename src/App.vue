<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';

const userStore = useUserStore();

userStore.setToken('djkfjdhudhfudhfudhufh ');
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss"></style>
