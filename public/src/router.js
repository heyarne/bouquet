import VueRouter from 'vue-router'

// Configure VueRouter
// import all of the components which end up being the main views
import Dashboard from './components/Dashboard.vue'
import TripCreation from './components/TripCreation.vue'
import TripDetail from './components/TripDetail.vue'
import TripStatus from './components/TripStatus.vue'
import TripForm from './components/TripForm.vue'
import NotFound from './components/NotFound.vue'

// set up the routes and create a router instance
const routes = [
  { path: '/', component: Dashboard },
  { path: '/trip/new', component: TripCreation },
  {
    name: 'trip',
    path: '/trip/:tripId',
    redirect: { name: 'tripStatus' },
    component: TripDetail,
    children: [
      { name: 'tripStatus', path: 'status', component: TripStatus },
      { name: 'tripEdit', path: 'edit', component: TripForm }
    ]
  },
  { path: '*', component: NotFound }
]

export default new VueRouter({ routes })
