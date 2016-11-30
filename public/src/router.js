import VueRouter from 'vue-router'

// Configure VueRouter
// import all of the components which end up being the main views
import Dashboard from './components/Dashboard.vue'
import TripCreation from './components/TripCreation.vue'
import Hello from './components/Hello.vue'
import NotFound from './components/NotFound.vue'

// set up the routes and create a router instance
const routes = [
  { path: '/', component: Dashboard },
  { path: '/trip/new', component: TripCreation },
  { path: '/info', component: Hello },
  { path: '*', component: NotFound }
]

export default new VueRouter({ routes })
