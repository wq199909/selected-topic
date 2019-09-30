import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('@/layout/default'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/page/index')
        },
        {
          path: '/group',
          name: 'group',
          component: () => import('@/page/group')
        },
        {
          path: '/suggest',
          name: 'suggest',
          component: () => import('@/page/suggest')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/page/login')
        }
      ]
    }
  ]
})
