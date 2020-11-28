<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="m-5">
          <div class="form-group">
            <label for="username">Kullanıcı Adı</label>
              <ValidationProvider name="user name" rules="required|alpha_num|min:3|max:40"
              v-slot="{ errors }">
                <input v-model="formData.username" type="text" class="form-control" id="username">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider name="email" rules="required|email"
              v-slot="{ errors }">
              <label for="email">E-posta Adresi</label>
              <input v-model="formData.email" type="email" class="form-control" id="email">
              <small>{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider name="password"
            rules="required|alpha_num|min:8|max:16"
              v-slot="{ errors }">
              <label for="password">Şifre</label>
              <input v-model="formData.password" type="password" class="form-control" id="password">
              <small>{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary">Kayıt Ol</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <h3 v-if="!this.response.ok" class="text-center">
      Bu e-posta veya kullanıcı sistemde kayıtlı!</h3>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4040/signup';

export default {
  name: 'SignUp',
  data: () => ({
    formData: {
      username: '',
      email: '',
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
      }
    },
  },
};
</script>
