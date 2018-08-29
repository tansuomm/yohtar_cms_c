// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import NProgress from 'nprogress'
import particles from 'particles.js'
import VueCookies from 'vue-cookies'
import {
  Dialog,
  Input,
  Button,
  Form,
  FormItem,
  Loading,
  MessageBox,
  Message,
  Checkbox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import './styles/index.scss'
import "babel-polyfill";
Vue.use(particles)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(VueCookies)
// Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
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
