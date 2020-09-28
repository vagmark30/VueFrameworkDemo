import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Cars from '../components/Cars.vue'
import Persons from '../components/Persons.vue'
import Bookings from '../components/Bookings.vue'
import DatagridDemo from '../components/DatagridDemo.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cars',
    name: 'cars',
    component: Cars
  },
  {
      path:'/persons',
      name:'persons',
      component:Persons
  },
  {
      path:'/bookings',
      name:'bookings',
      component:Bookings
  },
  {
    path:'/datagriddemo',
    name:'datagriddemo',
    component:DatagridDemo
  }
]

const router = new VueRouter({
  routes
})

export default router
