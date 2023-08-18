import axios from 'axios';
import qs from 'query-string';

export function createProject(data: {
  name: string;
  pmUser: string;
  feUser?: string;
  beUser?: string;
  envLink?: string;
}) {
  return axios.post('/api/project/add', {
    ...data,
  });
}

export function updateProjectById(
  id: string,
  data: {
    name: string;
    pmUser: string;
    feUser?: string;
    beUser?: string;
    envLink?: string;
  }
) {
  return axios.post('/api/project/updateById', {
    ...data,
    id,
  });
}

export function addCodeStoreById(data: {
  projectId: string;
  codeStoreItem: {
    storeName: string;
    storeAddress: string;
    mainBranch: string;
  };
}) {
  return axios.post('/api/project/addCodeStoreById', {
    ...data,
  });
}

export function getProjectById(projectId: string) {
  return axios.get('/api/project/getById', {
    params: {
      projectId,
    },
  });
}

export function getProjectPageList() {
  return axios.get('/api/project/get', {
    params: {},
  });
}
