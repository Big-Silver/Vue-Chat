import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/',
      name: 'login',
      component: function (resolve) {
        require(['@/components/login/Login.vue'], resolve)
      },
      beforeEnter: authRoute
    },
    {
      path: '/login',
      name: 'login1',
      component: function (resolve) {
        require(['@/components/login/Login.vue'], resolve)
      },
      beforeEnter: authRoute
    },
    {
      path: '/signup',
      name: 'signup',
      component: function (resolve) {
        require(['@/components/signup/Signup.vue'], resolve)
      }
    },
    {
      path: '/home',
      name: 'dashboard',
      component: function (resolve) {
        require(['@/components/dashboard/Dashboard.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})

function guardRoute (to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const auth = router.app.$options.store.state.auth

  if (!auth.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function authRoute (to, from, next) {
  console.log('authRoute')
  const auth = router.app.$options.store.state.auth

  if (auth.isLoggedIn) {
    next({
      path: '/home'
    })
  } else {
    next()
  }
  next()
}

export default router
