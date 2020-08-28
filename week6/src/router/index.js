import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/about',
        component: () => import('../views/About.vue'),
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/Products.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'coupon',
        component: () => import('../views/dashboard/Coupon.vue'),
      },
      {
        path: 'images',
        component: () => import('../views/dashboard/Images.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
