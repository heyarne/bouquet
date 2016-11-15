// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// then import all the components which end up being the main views
import Hello from './components/Hello.vue'
import Test from './components/Test.vue'

// set up the routes and create a router instance
const routes = [
  { path: '/', component: Hello },
  { path: '/test', component: Test }
]

const router = new VueRouter({ routes })

import App from './App.vue'

new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount('#app')
