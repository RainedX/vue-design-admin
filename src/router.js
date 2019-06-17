import Vue from 'vue'
import Router from 'vue-router'
import forBidden from './views/403.vue'
import NotFound from './views/404.vue'
import { notification } from 'ant-design-vue'
import NProgress from 'nprogress'
import findLast from 'lodash/findLast'
import 'nprogress/nprogress.css'
import { check, isLogin } from './utils/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      name: 'user',
      hideInMenu: true,
      redirect: '/user/login',
      component: () => import(/* webpackChunkName: 'layout' */ './layouts/UserLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: 'login' */ './views/User/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: 'register' */ './views/User/Register.vue')
        }
      ]
    },
    {
      path: '/',
      meta: { authority: ['user', 'admin'] },
      redirect: '/dashboard/analysis',
      component: () => import(/* webpackChunkName: 'layout' */ './layouts/BasicLayout.vue'),
      children: [
        // dashboard
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { icon: 'dashboard', title: '仪表盘' },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: { title: '分析页' },
              component: () => import(/* webpackChunkName: 'dashboard' */ './views/dashBoard/analysis.vue')
            }
          ]
        }

      ]
    },
    // form
    {
      path: '/form',
      name: 'form',
      meta: { icon: 'form', title: '表单', authority: ['admin'] },
      component: () => import(/* webpackChunkName: 'layout' */ './layouts/BasicLayout.vue'),
      children: [
        {
          path: '/form/basic-form',
          name: 'basicform',
          meta: { title: '基础表单' },
          component: () => import(/* webpackChunkName: 'form' */ './views/forms/basicForm.vue')
        },
        {
          path: '/form/step-form',
          name: 'stepform',
          redirect: '/form/step-form/info',
          meta: { title: '分步表单' },
          hideChildrenInMenu: true,
          component: () => import(/* webpackChunkName: 'form' */ './views/forms/stepForm/'),
          children: [
            {
              path: '/form/step-form/info',
              name: 'info',
              component: () => import(/* webpackChunkName: 'form' */ './views/forms/stepForm/step1')
            },
            {
              path: '/form/step-form/confirm',
              name: 'confirm',
              component: () => import(/* webpackChunkName: 'form' */ './views/forms/stepForm/step2')
            },
            {
              path: '/form/step-form/result',
              name: 'result',
              component: () => import(/* webpackChunkName: 'form' */ './views/forms/stepForm/step3')
            }
          ]
        }
      ]
    },
    {
      path: '/403',
      name: '403  ',
      hideInMenu: true,
      component: forBidden
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }

  const record = findLast(to.matched, record => record.meta.authority)

  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '你没有权限访问，请联系管理员咨询。'
      })
      next({
        path: '/403'
      })

      NProgress.done()
    }
  }
  next()
})

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done()
  }
})
export default router
