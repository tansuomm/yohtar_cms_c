// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import NProgress from 'nprogress'
import particles from 'particles.js'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import "babel-polyfill";
import 'nprogress/nprogress.css';
import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(particles)
Vue.use(VueCookies)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== '/login') {
    if (sessionStorage.getItem('token')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
