<template>
  <div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent>
          <div class="m-5">
            <div class="form-group">
              <label for="liftname">Lift Adı</label>
              <ValidationProvider name="lift name" rules="required" v-slot="{ errors }">
                <input v-model="liftForm.name" type="text" class="form-control" id="liftname">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="price" rules="required|integer" v-slot="{ errors }">
                <label for="price">Bayi Ücreti</label>
                <input v-model="liftForm.price" type="text" class="form-control" id="price">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="consumer price"
              rules="required|integer" v-slot="{ errors }">
                <label for="consumerPrice">Müşteri Ücreti</label>
                <input v-model="liftForm.consumerPrice" type="text"
                class="form-control" id="consumerPrice">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="raw materials" rules="required" v-slot="{ errors }">
                <label for="rawMaterials">Kullanılan Hammaddeler</label>
                <input v-model="liftForm.rawMaterials" type="text"
                class="form-control" id="rawMaterials"
                placeholder="Demir:20,Çelik:5 ... şeklinde yazınız">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="maintenance date" rules="required|integer"
              v-slot="{ errors }">
                <label for="maintenanceDate">Bakım Süresi</label>
                <input v-model="liftForm.maintenanceDate" type="text"
                class="form-control" id="maintenanceDate">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="maintenance price" rules="required|integer"
              v-slot="{ errors }">
                <label for="maintenancePrice">Bakım Ücreti</label>
                <input v-model="liftForm.maintenancePrice" type="text"
                class="form-control" id="maintenancePrice">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="text-center">
              <button v-on:click="handleSubmit(onLiftSubmit)"
              class="btn btn-primary mr-5">Ekle</button>
              <button v-on:click="handleSubmit(onLiftChange)"
              class="btn btn-primary mr-5">Değiştir</button>
              <button  v-on:click="handleSubmit(onLiftRemove)"
              class="btn btn-primary">Sil</button>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <h3 v-if="!this.liftFormResponse.ok" class="text-center">
        Hatalı bilgi girişi yaptınız!</h3>
    </div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent>
          <div class="m-5">
            <div class="form-group">
              <label for="materialname">Materyal Adı</label>
              <ValidationProvider name="material name" rules="required" v-slot="{ errors }">
                <input v-model="materialForm.name" type="text"
                class="form-control" id="materialname">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="quantity" rules="required|integer" v-slot="{ errors }">
                <label for="quantity">Materyal Sayısı</label>
                <input v-model="materialForm.quantity" type="text"
                class="form-control" id="quantity">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="lead time"
              rules="required|integer" v-slot="{ errors }">
                <label for="leadtime">Teslim Süresi</label>
                <input v-model="materialForm.leadTime" type="text"
                class="form-control" id="leadtime"
                placeholder="Ay bazlı; sadece 1, 10 gibi sayı girişi yapınız">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="critical quantity"
              rules="required|integer" v-slot="{ errors }">
                <label for="criticalQuantity">
                  Kritik Sayı (Bu sayıdan az kaldığında firma bilgilendirilecek)
                </label>
                <input v-model="materialForm.criticalQuantity" type="text"
                class="form-control" id="criticalQuantity">
                <small>{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="text-center">
              <button v-on:click="handleSubmit(onMaterialSubmit)"
              class="btn btn-primary mr-5">Ekle</button>
              <button v-on:click="handleSubmit(onMaterialChange)"
              class="btn btn-primary mr-5">Değiştir</button>
              <button  v-on:click="handleSubmit(onMaterialRemove)"
              class="btn btn-primary">Sil</button>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <h3 v-if="!this.materialFormResponse.ok" class="text-center">
        Hatalı bilgi girişi yaptınız!</h3>
    </div>
  </div>
</template>

<script>
const RECIPES_API_URL = 'http://localhost:4040/recipes';
const LIFTS_API_URL = 'http://localhost:4040/lifts';

export default {
  name: 'Recipes',
  data: () => ({
    liftForm: {
      name: '',
      price: '',
      consumerPrice: '',
      rawMaterials: '',
      maintenanceDate: '',
      maintenancePrice: '',
    },
    liftFormResponse: {
      ok: true,
    },
    materialForm: {
      name: '',
      quantity: '',
      leadTime: '',
      criticalQuantity: '',
    },
    materialFormResponse: {
      ok: true,
    },
  }),
  methods: {
    async onLiftSubmit() {
      const materials = this.liftForm.rawMaterials.split(',');
      this.liftForm.rawMaterials = {};
      materials.forEach((material) => {
        const [name, quantity] = material.split(':');
        this.liftForm.rawMaterials[name] = quantity;
      });
      this.liftFormResponse = await fetch(LIFTS_API_URL, {
        method: 'POST',
        body: JSON.stringify(this.liftForm),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.clearLiftForm();
    },
    async onLiftChange() {
      const materials = this.liftForm.rawMaterials.split(',');
      this.liftForm.rawMaterials = {};
      materials.forEach((material) => {
        const [name, quantity] = material.split(':');
        this.liftForm.rawMaterials[name] = quantity;
      });
      this.liftFormResponse = await fetch(LIFTS_API_URL, {
        method: 'PUT',
        body: JSON.stringify(this.liftForm),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.clearLiftForm();
    },
    async onLiftRemove() {
      const materials = this.liftForm.rawMaterials.split(',');
      this.liftForm.rawMaterials = {};
      materials.forEach((material) => {
        const [name, quantity] = material.split(':');
        this.liftForm.rawMaterials[name] = quantity;
      });
      this.liftFormResponse = await fetch(LIFTS_API_URL, {
        method: 'DELETE',
        body: JSON.stringify(this.liftForm),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.clearLiftForm();
    },
    clearLiftForm() {
      this.liftForm.name = '';
      this.liftForm.price = '';
      this.liftForm.consumerPrice = '';
      this.liftForm.rawMaterials = '';
      this.liftForm.maintenanceDate = '';
      this.liftForm.maintenancePrice = '';
    },
    async onMaterialSubmit() {
      this.MaterialFormResponse = await fetch(RECIPES_API_URL, {
        method: 'POST',
        body: JSON.stringify(this.materialForm),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.clearMaterialForm();
    },
    async onMaterialChange() {
      this.materialFormResponse = await fetch(RECIPES_API_URL, {
        method: 'PUT',
        body: JSON.stringify(this.materialForm),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.clearMaterialForm();
    },
    async onMaterialRemove() {
      this.materialFormResponse = await fetch(RECIPES_API_URL, {
        method: 'DELETE',
        body: JSON.stringify(this.materialForm),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.clearMaterialForm();
    },
    clearMaterialForm() {
      this.materialForm.name = '';
      this.materialForm.quantity = '';
      this.materialForm.leadTime = '';
      this.materialForm.criticalQuantity = '';
    },
  },
};
</script>

<style>

</style>
