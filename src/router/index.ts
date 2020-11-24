import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Location from '../views/Location.vue'
import Traffic from '../views/Traffic.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/location/:id',
    name: 'Location',
    component: Location
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: Traffic
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
