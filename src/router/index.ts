import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import('../views/DishDetails.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue')
    },
    {
      path: '/order/:id',
      name: 'orderDetail',
      component: () => import('../views/OrderDetails.vue')
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: () => import('../views/Purchase.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'register', 'item', 'home', 'notFound'];
  const authRequired = !publicPages.includes(to.name!.toString());
  const loggedIn = localStorage.getItem('jwt');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
