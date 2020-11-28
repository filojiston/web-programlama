import Vue from 'vue';
import VueRouter from 'vue-router';

import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Lifts from '../views/Lifts.vue';
import Recipes from '../views/Recipes.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/lifts',
    name: 'Lifts',
    component: Lifts,
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
