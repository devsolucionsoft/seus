const routes = [
    {
      path: '/register',
      name : 'register',
      component: () => import('../components/ss-register/SsRegister.vue'),
    },
    {
      path: '/',
      name : 'signIn',
      component: () => import('../pages/auth/SsLogin.vue'),
    },
    {
      path: '/companies',
      name : 'companies',
      component: () => import('../pages/auth/SsCompanies.vue'),
    },
  
  ]
  
  export default routes
  