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
  
  ]
  
  export default routes
  