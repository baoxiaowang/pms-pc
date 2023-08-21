import axios from 'axios';
import qs from 'query-string';

export function createCodeStore(data: { name: string; describe?: string }) {
  return axios.post('/codeStore/add', {
    ...data,
  });
}
export function getCodeStore() {
  return axios.get('/codeStore/get', {
    params: {},
  });
}
