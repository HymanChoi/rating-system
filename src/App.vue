<template>
  <n-message-provider>
    <n-config-provider :theme="darkTheme">
      <router-view />
    </n-config-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  color: #eeeeee;
  background-color: #18181c;
}

body {
  margin: 0;
  padding: 0;
}
</style>
