<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
             <router-link to="/lifts" class="nav-link">Liftler</router-link>
          </li>
          <li v-if="authUser()" class="nav-item">
             <router-link to="/recipes" class="nav-link">Lift Reçetesi</router-link>
          </li>
          <li v-if="authUser()" class="nav-item">
             <router-link to="/manage" class="nav-link">Siparişleri Yönet</router-link>
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <router-link to="/" class="navbar-brand mx-auto">Anasayfa</router-link>
      </div>
      <div v-if="!this.$root.$data.isLoggedIn"
      class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Giriş Yap</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Kayıt Ol</router-link>
          </li>
        </ul>
      </div>
      <div v-if="this.$root.$data.isLoggedIn"
      class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/userHistory" class="nav-link">Satın Alımlarım</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">Sepetim</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link"
            v-on:click.prevent="logout">
              {{this.$root.$data.loggedUser}}
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  }),
  methods: {
    logout() {
      this.$root.$data.isLoggedIn = false;
      this.$root.$data.loggedUser = '';
      this.$root.$data.userCart = [];
      this.$router.push('/');
    },
    authUser() {
      return this.$root.$data.loggedUser.startsWith('admin');
    },
  },
};
</script>
