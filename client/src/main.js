import Vue from 'vue';

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

import App from './App.vue';
import router from './router';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

const state = {
  isLoggedIn: false,
  loggedUser: '',
  userCart: [],
};

new Vue({
  router,
  data: state,
  render(h) { return h(App); },
}).$mount('#app');
