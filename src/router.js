import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/404.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
      meta: { icon: 'form', title: '表单' },
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
  next()
})

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done()
  }
})
export default router
