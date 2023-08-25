<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" />
    <a-card class="general-card" title="代码仓库">
      <template #extra>
        <a-link @click="handlerAdd">新增</a-link>
      </template>
      <a-table :columns="columns" :data="tableData" />
    </a-card>
  </div>
  <a-modal
    v-model:visible="codeStoreDictVisible"
    :mask-closable="false"
    title="Modal Form"
    @ok="sendCreateModal"
  >
    <a-form :model="codeStoreDictForm" label-align="left">
      <a-form-item required field="name" label="仓库名称">
        <a-input v-model="codeStoreDictForm.name" />
      </a-form-item>
      <a-form-item field="describe" label="仓库描述">
        <a-input v-model="codeStoreDictForm.describe" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { createCodeStore, getCodeStore } from '@/api/codeStore';
  import { onBeforeMount, reactive, ref } from 'vue';

  const codeStoreDictVisible = ref(false);
  const codeStoreDictForm = reactive({
    name: '',
    describe: '',
  });

  const columns = [
    {
      title: '仓库名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'describe',
    },
    {
      title: '操作',
      dataIndex: 'address',
    },
  ];
  const tableData = ref([]);
  async function fetchTable() {
    const data = await getCodeStore();
    tableData.value = data.data.list;
  }
  onBeforeMount(async () => {
    fetchTable();
  });
  function handlerAdd() {
    //
    codeStoreDictVisible.value = true;
  }
  async function sendCreateModal() {
    //
    await createCodeStore({
      ...codeStoreDictForm,
    });
    fetchTable();
  }
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
