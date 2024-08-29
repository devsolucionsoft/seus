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
      path: '/configRecruiterProfile',
      name : 'configRecruiterProfile',
      component: () => import('../pages/recruiter/SsConfigRecruiterProfile.vue'),
    },
    {
      path: '/successRegister',
      name : 'successRegister',
      component: () => import('../pages/applicant/SsSuccessRegister.vue'),
      props: route => ({ userType: route.query.userType }),
    },
    {
      path: '/profile',
      name : 'profile',
      component: () => import('../pages/applicant/SsProfile.vue'),
      props: route => ({ userType: route.query.userType || 'person' }),
    },
    {
      path: '/create-offer',
      name: 'createOffer',
      component: () => import('../pages/recruiter/SsCreateOffer.vue'),
    },
    {
      path: '/offers',
      name: 'Offers',
      component: () => import('../pages/recruiter/SsOffers.vue'),
    },
    {
      path: '/offer',
      name: 'Offer',
      component: () => import('../pages/recruiter/SsOffer.vue'),
    },
    {
      path: '/candidates',
      name: 'Candidates',
      component: () => import('../pages/recruiter/SsCandidates.vue'),
    },
    {
      path: '/candidate-details',
      name: 'CandidateDetails',
      component: () => import('../pages/recruiter/SsCandidateDetails.vue'),
    },
    {
      path: '/home-offers',
      name: 'HomeOffers',
      component: () => import('../pages/recruiter/SsHomeOffers.vue'),
    },
  ]
  
  export default routes
  