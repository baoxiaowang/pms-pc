<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.setting']" />
    <a-card title="我的日历">
      <a-calendar v-model="calendar" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  // defineProps<{}>();
  const calendar = ref();
</script>

<script lang="ts">
  export default {
    name: 'Setting',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .wrapper {
    padding: 20px 0 0 20px;
    min-height: 580px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.section-title) {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
  }
</style>
