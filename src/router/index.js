import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: resolve => require(['./../pages/Login.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['./../pages/Home.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['./../pages/Layout.vue'], resolve),
      children: [
        {
          path: 'book',
          name: 'book',
          component: resolve => require(['./../pages/Book.vue'], resolve),
        }
      ]
    }
  ]
})
