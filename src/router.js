import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/signin',
      name: 'SignInPage',
      component: () => import('./views/SignInPage.vue')
    }
  ]
})