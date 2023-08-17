<template>
  <a-card :title="project.name" class="project-card" @click="goProDetail">
    <a-space direction="vertical" fill>
      <a-row>
        <a-col :span="7">项目 pm:</a-col>
        <a-col :span="5">
          <!-- <a-tag color="blue" size="small">
            <template #icon>
              <icon-user />
            </template>
            {{ project.pmMember?.name }}
          </a-tag> -->
          <UserTag
            :id="project.pmMember._id"
            :name="project.pmMember?.name"
          ></UserTag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">项目待办:</a-col>
        <a-col :span="5">{{ project.taskList?.length || 0 }}</a-col>
        <a-col :span="7">需求总量:</a-col>
        <a-col :span="5">{{ project.taskList?.length || 0 }}</a-col>
      </a-row>

      <a-row>
        <a-col :span="7">前端负责人:</a-col>
        <a-col :span="5">{{ project.feOwnerMember?.name }}</a-col>
        <a-col :span="7">后端负责人:</a-col>
        <a-col :span="5">黄帆</a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
  import router from '@/router';

  const props = defineProps<{
    project: any;
  }>();
  function goProDetail() {
    router.push({
      name: 'projectDetail',
      params: {
        // eslint-disable-next-line no-underscore-dangle
        id: props.project.id,
      },
    });
  }
</script>

<style lang="less" scoped>
  .project-card {
    cursor: pointer;
    :deep(.arco-card-header) {
      border: none;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
