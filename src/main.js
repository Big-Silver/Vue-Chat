/* Twitter Bootstrap JS (this could also be handled in an app.js file) */
require('bootstrap')

/* Vue */
import Vue from 'vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import VueSession from 'vue-session'
import VueChatScroll from 'vue-chat-scroll'
import Autoscroll from 'vue-autoscroll'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueSocketio, socketio('http://localhost:3000'))
Vue.use(VueSession)
Vue.use(VueChatScroll)
Vue.use(Autoscroll)

Vue.config.productionTip = false

/* App sass */
import './assets/style/app.scss'

/* App component */
import App from './components/App'

/* Auth plugin */
import Auth from './services/auth'
import Chat from './services/chat'
import User from './services/user'
Vue.use(Auth)
Vue.use(Chat)
Vue.use(User)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this
  },
  router,
  store,
  render: h => h(App)
})
