import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: BasicLayout,
    redirect: '/product/management',
    children: [
      {
        path: '/product/management',
        name: 'ProductManagement',
        component: () => import('@/views/product/management/index.vue'),
        meta: {
          title: '商品管理'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
