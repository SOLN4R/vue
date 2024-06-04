import { createRouter, createWebHistory } from 'vue-router';
import Authorization from '../components/Authorization.vue';
import Registration from '../components/Registration.vue';
import ResetPassword from '../components/ResetPassword.vue';
import ServerRules from '../components/ServerRules.vue';
import ConfirmEmail from '../components/ConfirmEmail.vue';

const routes = [
  { path: '/', redirect: '/authorization' }, // Перенаправление на /login
  { path: '/authorization', component: Authorization },
  { path: '/registration', component: Registration },
  { path: '/reset-password', component: ResetPassword },
  { path: '/server-rules', component: ServerRules },
  { path: '/confirm-email', component: ConfirmEmail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
