import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../views/Welcome.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Applications from '../views/Applications.vue'
import AddApplication from '../views/AddApplication.vue'
import EditApplication from '../views/EditApplication.vue'
import ApplicationDetails from '../views/ApplicationDetails.vue'
import Calendar from '../views/Calendar.vue'
import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'
import Settings from '../views/Settings.vue'
import Requirements from '../views/Requirements.vue'
import ChangePassword from '../views/ChangePassword.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    meta: { guest: true }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { guest: true }
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true }
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  {
    path: '/applications',
    name: 'applications',
    component: Applications,
    meta: { requiresAuth: true }
  },

  {
    path: '/applications/add',
    name: 'add-application',
    component: AddApplication,
    meta: { requiresAuth: true }
  },

  {
    path: '/applications/:id/edit',
    name: 'edit-application',
    component: EditApplication,
    meta: { requiresAuth: true }
  },

  {
    path: '/applications/:id',
    name: 'application-details',
    component: ApplicationDetails,
    meta: { requiresAuth: true }
  },

  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: { requiresAuth: true }
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },

  {
    path: '/profile/edit',
    name: 'edit-profile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },

  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requiresAuth: true }
  },

  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword,
    meta: { requiresAuth: true }
  },

  {
    path: '/requirements',
    name: 'requirements',
    component: Requirements,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const user = localStorage.getItem('jobtrack_user')

  if (to.meta.requiresAuth && !user) {
    return '/login'
  }

  if (to.meta.guest && user && to.path !== '/dashboard') {
    return '/dashboard'
  }
})

export default router