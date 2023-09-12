import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home.vue')
      },
      {
        path: 'pack',
        name: 'pack',
        component: () => import('../views/pack.vue')
      },
      {
        path: 'presale',
        name: 'presale',
        component: () => import('../views/presale.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/login.vue')
      },
      {
        path: 'assets',
        name: 'assets',
        component: () => import('../views/assets.vue')
      },


    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: '/BIL/',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/assets') {
    if (store.getters.isConnectWallet) {
      next();
    } else {
      // next();
      next('/'); //Open after official login
    }
  } else {
    next();
  }

})

export default router
