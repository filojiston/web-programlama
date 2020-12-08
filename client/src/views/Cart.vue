<template>
  <div>
    <div>
      <ul class="list-group mt-5">
        <li v-for="lift in this.$root.$data.userCart" :key="lift.name" class="list-group-item">
          <b>Lift:</b> {{ lift.name }} <br>
          <span v-if="!isConsumer">
            <b>Ücreti:</b> {{ lift.price }} ₺ <br>
          </span>
          <span v-else>
            <b>Ücreti:</b> {{ lift.consumerPrice }} ₺ <br>
          </span>
          <div class="text-center">
            <button v-on:click="removeFromCart(lift)" type="button"
            class="btn btn-danger btn-sm">Kaldır</button>
          </div>
        </li>
      </ul>
      <div v-if="this.$root.$data.userCart.length" class="text-center mt-5">
        <span class="mr-3"><b>Toplam Ücret:</b> {{ totalFee }} ₺</span>
        <button v-on:click="buyItems()" type="button"
        class="btn btn-primary btn-sm">Satın Al</button>
      </div>
    </div>
  </div>
</template>

<script>
// const LIFTS_URL = 'http://localhost:4040/lifts';

export default {
  name: 'Cart',
  data: () => ({
    isConsumer: true,
    totalFee: 0,
  }),
  mounted() {
    if (this.$root.$data.isLoggedIn) {
      if (this.$root.$data.loggedUser.startsWith('bayi')) {
        this.isConsumer = false;
      }
    }
    this.totalFee = this.$root.$data.userCart.reduce((acc, curr) => {
      // eslint-disable-next-line
      acc += this.isConsumer ? curr.consumerPrice : curr.price;
      return acc;
    }, 0);
  },
  methods: {
    buyItems() {

    },
    removeFromCart(lift) {
      const liftIndex = this.$root.$data.userCart.indexOf(lift);
      this.$root.$data.userCart.splice(liftIndex, 1);
      this.totalFee -= this.isConsumer ? lift.consumerPrice : lift.price;
    },
  },
};
</script>
