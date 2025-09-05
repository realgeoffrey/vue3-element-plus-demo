<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
      路由切换：
        <RouterLink to="/pagination">Pagination Demo</RouterLink>
        <br>
  </div>
  <hr>

  <RouterView />
</template>

<style scoped></style>
