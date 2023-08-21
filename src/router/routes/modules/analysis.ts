import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/analysis',
  name: 'analysis',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '数据分析',
    icon: 'icon-bar-chart',
    requiresAuth: true,
    order: 6,
  },
  children: [
    {
      path: 'xiaolv',
      name: 'Xiaolv',
      component: () => import('@/views/analysis/xiaolv/index.vue'),
      meta: {
        locale: '效率统计',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;
