<template>
  <div class="container">
    <Breadcrumb :items="['项目 A', '任务详情']" />
    <div class="task-container-body">
      <a-card class="general-card" title="任务详情">
        <template #title>
          <div class="task-title-block">
            <div class="task-name">
              任务详情
              <a-button type="text">
                <icon-edit />
              </a-button>
            </div>
            <div class="task-action"> </div>
          </div>
        </template>
        <template #extra>
          <a-space>
            <a-button>转 交</a-button>
            <a-button type="outline">开始开发</a-button>
            <a-button type="primary">开发完成</a-button>
            <a-button type="primary">上线完成</a-button>
          </a-space>
        </template>
        <a-space>
          <div> 任务名称: {{ taskDetail.name }} </div>
          <a-divider direction="vertical" />
          <div>
            前端开发:
            <a-space>
              <UserTag
                v-for="item in taskDetail.feMemberList"
                :id="item._id"
                :key="item._id"
                :name="item.name"
              ></UserTag>
            </a-space>
          </div>
          <a-divider direction="vertical" />
          <div>
            后端开发:<a-space>
              <UserTag
                v-for="item in taskDetail.beMemberList"
                :id="item._id"
                :key="item._id"
                :name="item.name"
              ></UserTag>
            </a-space>
          </div>
        </a-space>
      </a-card>

      <a-card class="general-card task-info-card" title="任务明细">
        <template #extra>
          <a-link @click="addTaskInfo">新建</a-link>
        </template>
        <div class="task-info-detail">
          <div
            v-for="item in ['todo', 'doing', 'done']"
            :key="item"
            class="task-todo-list"
          >
            <div class="task-info-header"> {{ item }} </div>
            <!-- <div class="task-info-body"> -->
            <VueDraggable
              v-model="listMap[item]"
              class="task-info-body"
              group="task"
              item-key="id"
              @add="(arg) => taskInfoChange(arg, item as any)"
            >
              <template #item="{ element: item }">
                <div class="task-info-item">
                  <div class="task-info-item-left">
                    <div class="task-info-name"> {{ item.name }} </div>
                    <div class="task-info-desc"> {{ item.desc }}</div>
                  </div>
                  <div class="task-info-item-right">
                    <div class="task-info-item-time"> {{ item.time }}h </div>
                  </div>
                </div>
              </template>
            </VueDraggable>
            <!-- </div> -->
          </div>
        </div>
      </a-card>
    </div>
  </div>
  <a-modal
    v-model:visible="taskInfoModalVisible"
    title="创建任务明细"
    @ok="sendCreateTaskInfo"
  >
    <a-form auto-label-width :model="taskInfoForm" label-align="left">
      <a-form-item asterisk-position="end" required field="name" label="名称">
        <a-input v-model="taskInfoForm.name" />
      </a-form-item>

      <a-form-item asterisk-position="end" required field="time" label="时间">
        <a-input-number
          v-model="taskInfoForm.time"
          :max="8"
          :min="0.5"
          mode="button"
          :step="0.5"
          style="width: 100%"
        >
          <template #suffix> h </template>
        </a-input-number>
      </a-form-item>
      <a-form-item field="desc" label="备注">
        <a-textarea v-model="taskInfoForm.desc"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  //
  import { getTaskById } from '@/api/task';
  import {
    createTaskInfo,
    getTaskInfoByTaskId,
    updateTaskInfoById,
  } from '@/api/taskInfo';
  import { watch, computed, reactive, onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import VueDraggable from 'vuedraggable';

  const route = useRoute();
  const taskId = route.params.id.toString();
  const listMap = reactive<any>({
    todo: [],
    doing: [],
    done: [],
  });

  const taskDetail = ref<any>({});
  const taskInfoModalVisible = ref(false);
  const taskInfoList = ref<any[]>([]);

  watch(taskInfoList, (val = []) => {
    const todo: any[] = [];
    const doing: any[] = [];
    const done: any[] = [];
    val.forEach((item) => {
      if (item.status === 'done') {
        done.push(item);
      } else if (item.status === 'doing') {
        doing.push(item);
      } else {
        todo.push(item);
      }
    });
    listMap.todo = todo;
    listMap.doing = doing;
    listMap.done = done;
  });

  const taskInfoForm = reactive({
    taskId,
    name: '',
    desc: '',
    time: 1,
  });

  async function fetchTaskDetail() {
    const { data } = await getTaskById(taskId);
    taskDetail.value = data;
  }

  async function fetchTaskInfoList() {
    const { data } = await getTaskInfoByTaskId(taskId);
    taskInfoList.value = data;
  }

  async function addTaskInfo() {
    //
    taskInfoModalVisible.value = true;
  }
  async function sendCreateTaskInfo() {
    //
    await createTaskInfo({
      ...taskInfoForm,
      taskId,
    });
    fetchTaskInfoList();
  }
  function taskInfoChange(arg: any, status: 'todo' | 'doing' | 'done') {
    // eslint-disable-next-line no-underscore-dangle
    const item: any = arg.item.__draggable_context.element;
    // eslint-disable-next-line no-underscore-dangle
    updateTaskInfoById(item._id, {
      status,
    });
  }
  onBeforeMount(() => {
    fetchTaskDetail();
    fetchTaskInfoList();
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px 20px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .task-info-detail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    min-height: calc(100% - 200px);
    column-gap: 20px;
  }
  .task-container-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .task-info-card {
    margin-top: 20px;
    // flex: 1;
    min-height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    :deep(.arco-card-body) {
      flex: 1;
    }
  }

  .task-info-detail {
    height: 100%;
  }
  .task-todo-list {
    height: 100%;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
  }
  .task-info-header {
    // line-height: 20px;
    margin-bottom: 10px;
    padding-left: 20px;
  }
  .task-info-body {
    flex: 1;
    border-radius: 6px;
    background-color: var(
      --color-fill-2
    ); //rgba(#eee, 0.2); //var(--color-fill-2);
    padding: 10px;
  }
  .task-info-item {
    border-radius: 6px;
    padding: 10px 12px;
    background-color: #e3e3e3;
    display: flex;
    margin-bottom: 10px;
    cursor: move;
    .task-info-name {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .task-info-item-left {
      flex: 1;
    }
    .task-info-item-right {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
  .task-title-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
