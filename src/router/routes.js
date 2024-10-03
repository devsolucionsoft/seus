const routes = [
  //No auth pages
    {
      path: '/',
      name: 'signIn',
      component: () => import('../pages/auth/SsLogin.vue'),
    },

    {
      path: '/forgotten-password',
      name: 'forgottenPassword',
      component: () => import('../pages/auth/SsForgottenPassword.vue'),
    },

    {
      path: '/companies',
      name: 'companies',
      component: () => import('../pages/auth/SsCompanies.vue'),
    },

    {
      path: '/persons',
      name: 'persons',
      component: () => import('../pages/auth/SsPersons.vue'),
    },
    
    // Página no encontrada (404)
    {
      path: '/:pathMatch(.*)*', // Captura rutas no encontradas
      name: 'notFound',
      component: () => import('../pages/NotFound.vue'),
    },

  // Candidate Pages
    {
      path: '/config-profile',
      name: 'configProfile',
      component: () => import('../pages/applicant/SsConfigProfile.vue'),
      meta: { requiresAuth: true, role: 'Candidate' }, // Protegida por autenticación
    },

    {
      path: '/my-applications',
      name: 'myApplications',
      component: () => import('../pages/applicant/SsMyApplications.vue'),
      meta: { requiresAuth: true },
    },

  // Recruiter Pages
    {
      path: '/config-recruiter-profile',
      name: 'configRecruiterProfile',
      component: () => import('../pages/recruiter/SsConfigRecruiterProfile.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
    },

    {
      path: '/create-offer',
      name: 'createOffer',
      component: () => import('../pages/recruiter/SsCreateOffer.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
    },

    {
      path: '/offers',
      name: 'offers',
      component: () => import('../pages/recruiter/SsOffers.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
    },
    
    {
      path: '/offer/:id',
      name: 'offer',
      component: () => import('../pages/recruiter/SsOffer.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
      props: true, // Habilitar recibir el ID como prop
    },

    {
      path: '/candidates',
      name: 'candidates',
      component: () => import('../pages/recruiter/SsCandidates.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
    },

    {
      path: '/candidate-details/:id',
      name: 'candidateDetails',
      component: () => import('../pages/recruiter/SsCandidateDetails.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
      props: true,
    },

    {
      path: '/home-offers',
      name: 'homeOffers',
      component: () => import('../pages/recruiter/SsHomeOffers.vue'),
      meta: { requiresAuth: true, role: 'Admin' },
    },

  //Candidate and Companie Pages
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/applicant/SsProfile.vue'),
      meta: { requiresAuth: true, role: 'Candidate' },
    },
 
    {
      path: '/opportunity-market',
      name: 'opportunityMarket',
      component: () => import('../pages/applicant/SsOpportunityMarket.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/offer-detail/:id',
      name: 'offerDetail',
      component: () => import('../pages/applicant/SsOfferDetail.vue'),
      meta: { requiresAuth: true },
      props: true,
    },

    {
      path: '/successRegister',
      name : 'successRegister',
      component: () => import('../pages/applicant/SsSuccessRegister.vue'),
    },

  // Coaching
    {
      path: '/coach/:id',
      name: 'coach',
      component: () => import('../pages/coach/SsCoach.vue'),
      meta: { requiresAuth: true },
      props: true,
    },

    {
      path: '/coachs',
      name: 'coachs',
      component: () => import('../pages/coach/SsCoachs.vue'),
      meta: { requiresAuth: true },
    },
];

export default routes;
