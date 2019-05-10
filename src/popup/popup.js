import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import jquery from 'vue-jquery'
import VueResource from  'vue-resource';

Vue.use(BootstrapVue);
Vue.use(jquery);
Vue.use(VueResource);

Vue.http.options.root = 'https://extension.test/api/v1';

Vue.http.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
