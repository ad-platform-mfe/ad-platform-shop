<template>
  <t-layout class="basic-layout">
    <t-content class="basic-layout__content">
      <router-view />
    </t-content>
  </t-layout>
</template>

<script setup lang="ts">
import { Layout as TLayout, Content as TContent } from 'tdesign-vue-next'
</script>

<style lang="less" scoped>
.basic-layout {
  height: 100vh;

  &__content {
    padding: 24px;
    background-color: #f0f2f5;
  }
}
</style>
