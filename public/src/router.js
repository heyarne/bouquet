import VueRouter from 'vue-router'

// Configure VueRouter
// import all of the components which end up being the main views
import Dashboard from './components/Dashboard.vue'
import TripForm from './components/TripForm.vue'
import TripNotes from './components/TripNotes.vue'
import TripDetail from './components/TripDetail.vue'
import NotFound from './components/NotFound.vue'

// set up the routes and create a router instance
const routes = [
  { path: '/', component: Dashboard },
  { path: '/trip/new', component: TripForm },
  {
    name: 'trip',
    path: '/trip/:tripId',
    redirect: { name: 'tripNotes' },
    component: TripDetail,
    children: [
      { name: 'tripNotes', path: 'notes', component: TripNotes },
      { name: 'tripEdit', path: 'edit', component: TripForm }
    ]
  },
  { path: '*', component: NotFound }
]

export default new VueRouter({ routes })
