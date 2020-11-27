<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="m-5">
          <div class="form-group">
            <label for="username">Kullanıcı Adı</label>
              <ValidationProvider name="user name" rules="required"
              v-slot="{ errors }">
                <input v-model="formData.username" type="text" class="form-control" id="username">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider name="password" rules="required" v-slot="{ errors }">
              <label for="password">Şifre</label>
              <input v-model="formData.password" type="password" class="form-control" id="password">
              <small>{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary">Giriş Yap</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <h3 v-if="!this.response.ok" class="text-center">
      Kullanıcı adı veya şifre hatalı!</h3>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4040/login';

export default {
  name: 'Login',
  data: () => ({
    formData: {
      username: '',
      password: '',
    },
    response: {
      ok: true,
    },
  }),
  methods: {
    async onSubmit() {
      this.response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.formData),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (this.response.ok) {
        this.$router.push('/');
        this.$root.$data.isLoggedIn = true;
        this.$root.$data.loggedUser = this.formData.username;
      }
    },
  },
};
</script>
