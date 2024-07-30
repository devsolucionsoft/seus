const routes = [
    {
      path: '/examples',
      name : 'example',
      component: () => import('../components/ss-example/SsExample.vue'),

    },
    {
      path: '/register',
      name : 'register',
      component: () => import('../components/ss-register/SsRegister.vue'),

    },
    {
      path: '/signIn',
      name : 'signIn',
      component: () => import('../pages/auth/Login.vue'),
    },
  ]
  
  export default routes
  