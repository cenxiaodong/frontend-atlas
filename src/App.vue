<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import { useTheme } from '@/hooks/useTheme';

const userStore = useUserStore();

const { initTheme } = useTheme();
initTheme();

userStore.setToken('bqddxxwqmfncffacvbpkuxvwvqrhln');
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss"></style>
