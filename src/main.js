import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
