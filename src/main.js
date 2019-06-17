import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Authorized from './components/Authorized.vue'
import Auth from './directives/auth.js'
import './config/library.js'

Vue.config.productionTip = false
Vue.component('Authorized', Authorized)
Vue.use(Auth)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
