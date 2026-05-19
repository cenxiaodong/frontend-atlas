<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import { getMenuList } from '@/api/modules/user';

const userStore = useUserStore();
// import { ref } from 'vue';

// const loading = ref(false);

// const tableData = [
//   {
//     date: '2016-05-02',
//     name: 'John Smith',
//     address: 'No.1518,  Jinshajiang Road, Putuo District',
//   },
//   {
//     date: '2016-05-04',
//     name: 'John Smith',
//     address: 'No.1518,  Jinshajiang Road, Putuo District',
//   },
//   {
//     date: '2016-05-01',
//     name: 'John Smith',
//     address: 'No.1518,  Jinshajiang Road, Putuo District',
//   },
// ];

const getUser = () => {
  getMenuList().then((res) => {
    console.log(res.data);
  });
};

userStore.setToken('bqddxxwqmfncffacvbpkuxvwvqrhln');
</script>

<template>
  <!-- <el-table v-loading="loading" :data="tableData">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table> -->
  <el-button type="primary" @click="getUser">获取用户</el-button>
  <router-view></router-view>
</template>

<style lang="scss"></style>
