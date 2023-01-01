<template>
  <div>
    <div>
      <ul class="list-group mt-5">
        <li v-for="lift in lifts" :key="lift.name" class="list-group-item">
          <b>Lift:</b> {{ lift.name }} <br>
          <span>
            <b>Bakım Ücreti:</b> {{ lift.maintenancePrice }} ₺ <br>
            <b>Bakım Tarihi:</b>  {{ calculateMaintenance(lift) }}  <br>
          </span>
          <div v-if="canMaintenance" class="text-center">
            <button type="button"
            class="btn btn-primary btn-sm">Bakım Yaptır</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let USER_URL = 'http://localhost:4040/users';

export default {
  name: 'History',
  data: () => ({
    lifts: [],
    userUrl: '',
    canMaintenance: false,
  }),
  mounted() {
    this.userUrl = `${USER_URL}/${this.$root.$data.loggedUser}`;
    fetch(this.userUrl).then((response) => response.json()).then((result) => {
      this.lifts = result.boughtLifts;
    });
  },
  methods: {
    calculateMaintenance(lift) {
        let boughtDate = new Date(lift.soldDate);
        let d = boughtDate.getDate();
        boughtDate.setMonth(boughtDate.getMonth() + lift.maintenanceDate);
        if (boughtDate.getDate() != d) {
            boughtDate.setDate(0);
        }

        let today = new Date();
        if (today == boughtDate) {
          canMaintenance = true;
        }
        return boughtDate.toLocaleDateString();
    }
  },
};
</script>
