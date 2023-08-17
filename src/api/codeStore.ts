import axios from 'axios';
import qs from 'query-string';

export function createCodeStore(data: { name: string; describe?: string }) {
  return axios.post('/api/codeStore/add', {
    ...data,
  });
}
export function getCodeStore() {
  return axios.get('/api/codeStore/get', {
    params: {},
  });
}
