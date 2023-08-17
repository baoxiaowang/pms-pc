import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/dict',
  name: 'dict',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '字典管理',
    icon: 'icon-tool',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      path: 'code-store',
      name: 'codeStoreDict',
      component: () => import('@/views/dict/code-store/index.vue'),
      meta: {
        locale: '代码仓库',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;
