<template>
  <span>Componente de registro</span>
  <el-button @click="navigateTo">Default</el-button>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const navigateTo = () => {
  router.push({
    name: "example",
  });
};
</script>
