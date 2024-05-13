import { createRouter, createWebHistory } from 'vue-router';
import SignUpStep1 from '../views/SignUpStep1.vue';
import SignUpStep2 from '../views/SignUpStep2.vue';
import SignUpStep3 from '../views/SignUpStep3.vue';
import SignUpComplete from '../views/SignUpComplete.vue';

const routes = [
  { path: '/', redirect: '/signup/step1' },
  { path: '/signup/step1', component: SignUpStep1 },
  { path: '/signup/step2', component: SignUpStep2 },
  { path: '/signup/step3', component: SignUpStep3 },
  { path: '/signup/complete', component: SignUpComplete },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
