import axios from 'axios';
import qs from 'query-string';

export function createTask(data: {
  projectId: string;
  name: string;
  type: string;
  jira: string;
  expectDate?: string;
  feUserList?: string[];
  beUserList?: string[];
}) {
  return axios.post('/api/task/add', {
    ...data,
  });
}

export function updateTaskById(
  id: string,
  data: {
    name: string;
    type: string;
    jira: string;
    expectDate?: string;
    feUserList?: string[];
    beUserList?: string[];
  }
) {
  return axios.post('/api/task/updateById', {
    ...data,
    id,
  });
}

export function getTaskByPage({ projectId }: { projectId: string }) {
  return axios.get('/api/task/get', {
    params: {
      projectId,
    },
  });
}

export function getTaskById(projectId: string) {
  return axios.get('/api/task/getById', {
    params: {
      projectId,
    },
  });
}

export function getByDevId(devId: string) {
  return axios.get('/api/task/getByDevId', {
    params: {
      devId,
    },
  });
}

export function deleteTaskById(taskId: string) {
  return axios.get('/api/task/deleteById', {
    params: {
      taskId,
    },
  });
}

export function pmConfirmed(taskId: string) {
  return axios.post('/api/task/pmConfirmed', {
    taskId,
  });
}

export function startDev(taskId: string) {
  return axios.post('/api/task/startDev', {
    taskId,
  });
}

export function devDone(taskId: string) {
  return axios.post('/api/task/devDone', {
    taskId,
  });
}
