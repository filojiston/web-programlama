<template>
  <div>
    <div>
      <ul class="list-group mt-5">
        <li v-for="lift in lifts" :key="lift.name" class="list-group-item">
          <b>Lift:</b> {{ lift.name }} <br>
          <span v-if="!isConsumer">
            <b>Ücreti:</b> {{ lift.price }} ₺ <br>
          </span>
          <span v-else>
            <b>Ücreti:</b> {{ lift.consumerPrice }} ₺ <br>
          </span>
          <div class="text-center">
            <button v-on:click="addToCart(lift)" type="button"
            class="btn btn-primary btn-sm">Sepete Ekle</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const LIFTS_URL = 'http://localhost:4040/lifts';

export default {
  name: 'Lifts',
  data: () => ({
    lifts: [],
    isConsumer: true,
  }),
  mounted() {
    if (this.$root.$data.isLoggedIn) {
      if (this.$root.$data.loggedUser.startsWith('bayi')) {
        this.isConsumer = false;
      }
    }
    fetch(LIFTS_URL).then((response) => response.json()).then((result) => {
      this.lifts = result;
    });
  },
  methods: {
    addToCart(lift) {
      if (!this.$root.$data.isLoggedIn) {
        this.$router.push('/login');
      } else {
        this.$root.$data.userCart.push(lift);
      }
    },
  },
};
</script>
