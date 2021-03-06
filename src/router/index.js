import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chatrooms from '../views/Chatrooms.vue'
import Direct from '../views/Direct.vue'
import Join from '../views/Join.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ChatMessages from '../components/ChatMessages.vue'
import DirectMessages from '../components/DirectMessages.vue'
import { auth } from '../firebase/firebase.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/direct',
    name: 'Direct',
    component: Direct,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/direct/:directID',
        name: 'DirectMessages',
        component: DirectMessages,
      }
    ]
  },
  {
    path: '/chatrooms',
    name: 'Chatrooms',
    component: Chatrooms,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/chatrooms/:chatID',
        name: 'ChatMessages',
        component: ChatMessages,
      }
    ]
  },

  {
    path: '/join',
    name: 'Join',
    component: Join,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
      },
      {
        path: '/join/register',
        name: 'Register',
        component: Register,
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

// Navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    console.log('User not signed in, redirecting to Login page.')
    next('/join')
  } else {
    next()
  }
})

export default router
