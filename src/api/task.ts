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
