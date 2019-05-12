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
Vue.use(VueClipboard)

// Vue.use(Fingerprint2);

Vue.http.options.root = 'https://extension.test/api/v1';

Vue.http.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token1');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
