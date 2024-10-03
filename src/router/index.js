import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import store from 'store2'; // Supongamos que usas `store2` para manejar el almacenamiento

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const token = store.get('token');
  const roles = store.get('roles');

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!token) {
      // Si no hay token, redirige al login
      return next({ name: 'signIn' });
    }

    // Si se especifica un rol y el usuario no tiene el rol requerido
    if (to.meta.role && (!roles || !roles.includes(to.meta.role))) {
      // Redirigir a la página de acceso denegado o similar
      return next({ name: 'notFound' });
    }
  }

  next(); // Si todo está bien, continúa
});

export default router;
