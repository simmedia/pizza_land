import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueProgressBar from 'vue-progressbar'
 

const options = {
  color: '#F44437',
  failedColor: '#874b4b',
  thickness: '7px',
  transition: {
    speed: '0.3s',
    opacity: '0.6s',
    termination: 610
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}


Vue.use(VueProgressBar, options)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
