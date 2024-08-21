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
    {
      path: '/persons',
      name : 'persons',
      component: () => import('../pages/auth/SsPersons.vue'),
    },
    {
      path: '/configProfile',
      name : 'configProfile',
      component: () => import('../pages/applicant/SsConfigProfile.vue'),
    },
    {
      path: '/successRegister',
      name : 'successRegister',
      component: () => import('../pages/applicant/SsSuccessRegister.vue'),
    },
  ]
  
  export default routes
  