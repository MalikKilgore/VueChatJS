import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chatrooms from '../views/Chatrooms.vue'
import Join from '../views/Join.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import { auth } from '../firebase/firebase.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: {
      /* Needs to pull from usersCollection and create router links based on that. 
        Haave a listener on the collection that automatically updates for each new user account added and rmoved.
        TODO: Get Chatrooms working first*/
    },
  },
  {
    path: '/chatrooms',
    name: 'Chatrooms',
    component: Chatrooms,
    meta: {
      requiresAuth: true
    },
    children: {
      /* 6 Chatroom router links */
    },
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
  }
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
