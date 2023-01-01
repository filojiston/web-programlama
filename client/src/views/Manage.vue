<template>
  <div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="m-5">
            <div class="form-group">
              <label for="startDate">Başlangıç Tarihi</label>
                <ValidationProvider name="start date" rules="required"
                v-slot="{ errors }">
                  <input v-model="startDate" type="text" class="form-control" id="startDate">
                  <small>{{ errors[0] }}</small>
                </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="endDate">Bitiş Tarihi</label>
              <ValidationProvider name="end date" rules="required" v-slot="{ errors }">
                <input v-model="endDate" type="text" class="form-control" id="endDate">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group text-center">
              <button type="submit" class="btn btn-primary btn-sm">Siparişleri Görüntüle</button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="isSubmitted">
      <ul class="list-group mt-5">
        <li v-for="lift in liftsOnRange" :key="lift.name" class="list-group-item">
          <b>Lift:</b> {{ lift[0].name }} <br>
          <b>Satılma Tarihi:</b> {{ lift[0].soldDate }} <br>
          <b>Satılan Ücret:</b> {{ lift[0].soldPrice }} ₺ <br>
          <b>Satın Alan Kullanıcı: </b> {{ lift[1] }} <br>
          <b>Elde Edilen Kâr: </b> {{ lift[0].soldPrice == lift[0].consumerPrice ? lift[0].consumerPrice - lift[0].price : 0 }} ₺ <br>
        </li>
      </ul>
      <div v-if="liftsOnRange.length != 0" class="text-center">
        <b>Toplam Kâr:</b> {{ totalProfit }} ₺
      </div>
    </div>
  </div>
</template>

<script>
const SOLD_LIFTS_URL = 'http://localhost:4040/lifts/soldLifts';

export default {
  name: 'Manage',
  data: () => ({
    orders: [],
    liftsOnRange: [],
    startDate: '',
    endDate: '',
    totalProfit: 0,
    isSubmitted: false,
  }),
  mounted() {
    fetch(SOLD_LIFTS_URL).then((response) => response.json()).then((result) => {
      this.orders = result;
    });
  },
  methods: {
    onSubmit() {
      const sDate = new Date(this.startDate);
      const eDate = new Date(this.endDate);

      for (const order of this.orders) {
        for (const lift of order.lifts) {
          const liftSoldDate = new Date(lift.soldDate);
          if (liftSoldDate >= sDate && liftSoldDate <= eDate) {
            this.liftsOnRange.push([lift, order.buyer]);
            this.totalProfit += lift.soldPrice == lift.consumerPrice ? lift.consumerPrice - lift.price : 0
          }
        }
      }

      this.isSubmitted = true;
    },
  },
};
</script>
