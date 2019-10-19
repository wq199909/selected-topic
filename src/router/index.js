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
          path: '/addTopic',
          name: 'addTopic',
          component: () => import('@/page/addTopic')
        },
        {
          path: '/end',
          name: 'end',
          component: () => import('@/page/end')
        },
        {
          path: '/userList',
          name: 'userList',
          component: () => import('@/page/userList')
        },
        {
          path: '/personal',
          name: 'personal',
          component: () => import('@/page/personal')
        },
        {
          path: '/addAccount',
          name: 'addAccount',
          component: () => import('@/page/addAccount')
        }
      ]
    }
  ]
})
