export const userTypeConfig = {
  Company: {
    name: "Carrulla",
    subtitle: "Supermercados",
    image: require('@/assets/images/carulla.png'),
    routes: [
      { path: "/publish-offer", label: "Publicar ofertas" },
      { path: "/my-offers", label: "Mis ofertas" },
      { path: "/search-candidates", label: "Buscar candidatos" }
    ]
  },
  Candidate: {
    name: "Francisco",
    subtitle: "¡Bienvenido!",
    image: require('@/assets/images/person.webp'),
    routes: [
      { path: "/applications", label: "Postulaciones" },
      { path: "/coachs", label: "Coach’s" },
      { path: "/offertsMarket", label: "Buscar ofertas" }
    ]
  },
  Coach: {
    name: "Francisco",
    subtitle: "¡Bienvenido!",
    image: require('@/assets/images/person.webp'),
    routes: [
      { path: "/coachs", label: "Coach's" },
      { path: "/coach/1", label: "Buscar coach’s" },
    ]
  },
};
