import Vue from 'vue';
import Router from 'vue-router';
import NoFound from './views/404';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "layouts" */ './layouts/UserLayout'),
      children: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ './views/User/Login'),
        },
        {
          path: '/user/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "user" */ './views/User/Register'),
        },
      ],
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layouts" */ './layouts/BasicLayout'),
      children: [
        // dashboard
        {
          path: '/',
          redirect: '/dashboard/analysis',
        },
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
              component: () => import(/* webpackChunkName: "user" */ './views/Dashboard/Analysis'),
            },
          ],
        },
        // form
        {
          path: '/form',
          name: 'form',
          meta: { icon: 'form', title: '表单' },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/from/basic-from',
              name: 'basicfrom',
              meta: { title: '基础表单' },
              component: () => import(/* webpackChunkName: "user" */ './views/Forms/BasicForm'),
            },
            {
              path: '/from/step-from',
              name: 'stepfrom',
              meta: { title: '分布表单' },
              hideChildrenInMenu: true,
              component: () => import(/* webpackChunkName: "user" */ './views/Forms/StepForm'),
              children: [
                {
                  path: '/from/step-from',
                  redirect: '/from/step-from/info',
                },
                {
                  path: '/from/step-from/info',
                  name: 'indo',
                  component: () =>
                    import(/* webpackChunkName: "user" */ './views/Forms/StepForm/Step1'),
                },
                {
                  path: '/from/step-from/confirm',
                  name: 'confirm',
                  component: () =>
                    import(/* webpackChunkName: "user" */ './views/Forms/StepForm/Step2'),
                },
                {
                  path: '/from/step-from/result',
                  name: 'result',
                  component: () =>
                    import(/* webpackChunkName: "user" */ './views/Forms/StepForm/Step3'),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NoFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
