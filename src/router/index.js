import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import HouseDetailsView from '../views/HouseDetailsView.vue'
import HouseEditView from '../views/HouseEditView.vue'
import HouseCreateView from '../views/HouseCreateView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    props: true
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/details/:id',
    name: 'HouseDetailsView',
    component: HouseDetailsView,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'HouseEditView',
    component: HouseEditView,
    props: true
  },
  {
    path: '/create',
    name: 'HouseCreateView',
    component: HouseCreateView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
