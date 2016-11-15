// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
const DEBUG = true

import Vue from 'vue'
if (DEBUG) window.Vue = Vue

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)

// Configure VueResource
Vue.http.options = {
  root: '/api/v1'
}

function debugLog (req, next) {
  if (DEBUG) console.log(req)
  next()
}

function addCredentials (req, next) {
  req.credentials = true
  next()
}

Vue.http.interceptors.push(debugLog)
Vue.http.interceptors.push(addCredentials)

// Configure VueRouter
// import all of the components which end up being the main views
import Dashboard from './components/Dashboard.vue'
import Hello from './components/Hello.vue'

// set up the routes and create a router instance
const routes = [
  { path: '/', component: Dashboard },
  { path: '/info', component: Hello }
]

const router = new VueRouter({ routes })

import App from './App.vue'

new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount('#app')
