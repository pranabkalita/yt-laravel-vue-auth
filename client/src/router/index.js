import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '../views/SignInView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requireAuth: true },
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: SignInView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const authenticated = store.getters['auth/authenticated']

    if (!authenticated) {
      next({
        name: 'signin',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
