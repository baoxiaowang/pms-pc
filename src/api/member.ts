import axios from 'axios';
import qs from 'query-string';

export function createMember(data: { name: string; describe?: string }) {
  return axios.post('/api/member/add', {
    ...data,
  });
}
export function getMemberByPage() {
  if (window.getMemberPromise) {
    return window.getMemberPromise;
  }
  (window as any).getMemberPromise = axios.get('/api/member/get', {
    params: {},
  });
  return window.getMemberPromise;
}
