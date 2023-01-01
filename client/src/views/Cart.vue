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
      <h5 v-if="this.lowOnMaterial" class="ml-4 mt-4">
        Yetersiz hammadde sebebiyle siparişinizi tamamlayamıyoruz.
        Stoklarımız {{this.leadDate}} ay içerisinde yenilenecektir.
      </h5>
      <h5 v-if="this.done" class="ml-4 mt-4">
        Siparişiniz tamamlanmıştır.
      </h5>
    </div>
  </div>
</template>

<script>
const RECIPES_URL = 'http://localhost:4040/recipes';
const USERS_URL = 'http://localhost:4040/users';
const SOLD_LIFTS_URL = 'http://localhost:4040/lifts/soldLifts';

export default {
  name: 'Cart',
  data: () => ({
    isConsumer: true,
    userUrl: '',
    totalFee: 0,
    rawMaterials: [],
    totalRawMaterials: new Map(),
    lowOnMaterial: false,
    done: false,
    leadDate: '',
    order: {
      lifts: [],
      buyer: '',
    },
    response: {
      ok: true,
    },
    user: {
    },
  }),
  mounted() {
    if (this.$root.$data.isLoggedIn) {
      if (this.$root.$data.loggedUser.startsWith('bayi')) {
        this.isConsumer = false;
      }
    }
    this.totalFee = this.$root.$data.userCart.reduce((acc, curr) => {
      // eslint-disable-next-line
      acc += this.isConsumer ? +curr.consumerPrice : +curr.price;
      return acc;
    }, 0);
    this.userUrl = `http://localhost:4040/users/${this.$root.$data.loggedUser}`;
  },
  methods: {
    async buyItems() {
      // check if there is enough raw materials
      this.response = await fetch(RECIPES_URL).then((response) => response.json())
        .then((result) => {
          this.rawMaterials = result;
        });

      this.$root.$data.userCart.forEach((lift) => {
        const materials = Object.entries(lift.rawMaterials);
        materials.forEach((material) => {
          if (!this.totalRawMaterials.has(material[0])) {
            this.totalRawMaterials.set(material[0], +material[1]);
          } else {
            const quantity = this.totalRawMaterials.get(material[0]);
            this.totalRawMaterials.set(material[0], quantity + +material[1]);
          }
        });
      });

      // else, tell user we cant afford raw materials now. they should check in supplydate time.
      this.rawMaterials.forEach((material) => {
        const quantity = this.totalRawMaterials.get(material.name) || 0;
        if (material.quantity < quantity) {
          this.lowOnMaterial = true;
          if (+material.leadTime > +this.leadDate) this.leadDate = material.leadTime;
        }
      });

      if (!this.lowOnMaterial) {
        await fetch(this.userUrl).then((response) => response.json())
          .then((result) => {
            this.user = result;
          });

        // set all lifts sold date to today and prices to correct prices
        for (let lift of this.$root.$data.userCart) {
          lift.soldDate = new Date().toLocaleDateString();
          lift.soldPrice = this.isConsumer ? lift.consumerPrice : lift.price;
        }

        this.order.lifts = [...this.$root.$data.userCart];
        this.order.buyer = this.$root.$data.loggedUser;

        // also add all lifts to sold lifts
        await fetch(SOLD_LIFTS_URL, {
          method: 'POST',
          body: JSON.stringify(this.order),
          headers: {
            'content-type': 'application/json',
          },
        });

        // if so, add lifts to user's boughtlifts array and say it's done
        this.user.boughtLifts = this.user.boughtLifts.concat(this.$root.$data.userCart);
        // eslint-disable-next-line
        delete this.user._id;
        await fetch(USERS_URL, {
          method: 'PUT',
          body: JSON.stringify(this.user),
          headers: {
            'content-type': 'application/json',
          },
        });

        // eslint-disable-next-line
        for (const material of this.rawMaterials) {
          const quantity = this.totalRawMaterials.get(material.name) || 0;
          const realQuantity = material.quantity - quantity;
          material.quantity = -quantity;
          if (realQuantity <= material.criticalQuantity) {
            // send an email
            // eslint-disable-next-line
            await fetch(RECIPES_URL + `/${material.name}`, {
              method: 'PUT',
              body: JSON.stringify(material),
              headers: {
                'content-type': 'application/json',
              },
            });
          }
          // eslint-disable-next-line
          delete material._id;
          // eslint-disable-next-line
          await fetch(RECIPES_URL, {
            method: 'PUT',
            body: JSON.stringify(material),
            headers: {
              'content-type': 'application/json',
            },
          });
        }
      }
    },
    removeFromCart(lift) {
      const liftIndex = this.$root.$data.userCart.indexOf(lift);
      this.$root.$data.userCart.splice(liftIndex, 1);
      this.totalFee -= this.isConsumer ? lift.consumerPrice : lift.price;
    },
  },
};
</script>
