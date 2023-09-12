import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/sass/reset.scss";
import Router from "vue-router";
import "@/components/_global.js";
import bus from '@/plugins/eventBus/index';
import {Form,FormItem,Input,Message,Button,Progress} from 'element-ui';
import Clipboard from 'v-clipboard'
import 'element-ui/lib/theme-chalk/index.css';
import $popup from '@/utils/popup.js';
import VueFullpage from 'vue-fullpage.js';

Vue.prototype.$bus=bus;
Vue.config.productionTip = false
Vue.prototype.$message = Message;

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Progress);
Vue.use(Clipboard);
Vue.use($popup);
Vue.use(VueFullpage);

// localStorage.setItem('wallet', "Metamask")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
