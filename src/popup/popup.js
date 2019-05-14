import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import jquery from 'vue-jquery'
import VueResource from  'vue-resource';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faSignOutAlt,faEnvelope,faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Fingerprint2 from 'fingerprintjs2'
// import moment from 'moment-timezone';
import VueClipboard from 'vue-clipboard2'

library.add(faUserSecret,faSignOutAlt,faEnvelope,faCopy);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(jquery);
// Vue.use(moment);
Vue.use(VueResource);
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);

// Vue.use(Fingerprint2);

Vue.http.options.root = 'https://accountrentals.com/api/v1';
// Vue.http.options.credentials = true;

// Vue.http.headers.common['Authorization'] = ;
// Vue.http.headers.common[''] = 'TOKEN';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token1'))
  request.headers.set('Accept', 'application/json')
  request.headers.set('X-CSRF-TOKEN', 'TOKEN')
  request.headers.set('Content-Type', 'application/json;charset=UTF-8');
  request.headers.set('Access-Control-Allow-Origin', '*');
  next();
});
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
// Vue.http.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS';
// Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
