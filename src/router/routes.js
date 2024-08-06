const routes = [
    {
      path: '/register',
      name : 'register',
      component: () => import('../components/ss-register/SsRegister.vue'),
    },
    {
      path: '/signIn',
      name : 'signIn',
      component: () => import('../pages/auth/SsLogin.vue'),
    },
    {
      path: '/companies',
      name : 'companies',
      component: () => import('../pages/auth/SsCompanies.vue'),
    },
    {
      path: '/signIn',
      name : 'signIn',
      component: () => import('../pages/auth/Login.vue'),
    },
  ]
  
  export default routes
  