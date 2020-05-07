<template>
  <v-container>
    <div v-if="basket.length">
      <v-row>
        <v-col cols="10" md="6">
          <span class="d-block title mb-10">Your order</span> :
          {{ basket }}
          <hr />
        </v-col>
        <v-col cols="10" md="6">
          <span class="d-block title mb-10">Your info</span> :
          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              label="Full Name"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              v-if="!takeOut"
              v-model="address"
              label="Address"
              :rules="addressRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="phone"
              type="number"
              label="Phone Number"
              :rules="phoneRules"
              required
            ></v-text-field>

            <v-switch
              class="my-3"
              color="red"
              v-model="takeOut"
              label="Take Out"
            ></v-switch>

            <v-btn
              class="green white--text"
              :disabled="!valid"
              @click="placeOrder"
            >
              Place Order
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="!orderDelivered">
      <v-row justify="center" class="mt-12">
        <v-col class="text-center">
          <span class="headline">No pizza for order!</span>
        </v-col>
      </v-row>
    </div>
    <v-row class="mt-10" justify="center" v-if="orderDelivered">
      <v-col align="center" cols="10" md="6">
        <img class="pizza-guy mb-5" src="../assets/images/pizzaguy.png" width="50%">
      <span style="display:block;" class="display-1 secondary--text">Order has been placed!</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "Checkout",
  data() {
    return {
      valid: true,
      nameRules: [(v) => !!v || "Name is required"],
      phoneRules: [(v) => !!v || "Phone is required"],
      addressRules: [(v) => !!v || "Address is required for delivery"],
      name: "",
      address: "",
      phone: null,
      takeOut: false,
      info: "",
      orderDelivered: false,
    };
  },
  computed: {
    basket() {
      return this.$store.getters.getBasketItems;
    },
    getTotal() {
      return this.basket.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);
    },
  },
  methods: {
    placeOrder() {
      const order = {
        createdAt: moment(new Date()).format("lll"),
        name: this.name,
        address: this.address,
        phone: this.phone,
        takeOut: this.takeOut,
        pizzas: this.basket,
        info: this.info,
        total: this.getTotal,
      };
      this.$store.dispatch("addNewOrder", order);
      this.$store.commit("clearBasket");
      this.orderDelivered = true;
    },
    deliveryInfo() {
      this.orderDelivered = true;
    },
  },

  //   beforeRouteEnter(to, from, next) {
  //     console.log(to, from);

  //     next();
  //   },
};
</script>

<style>
/* style goes here */
.pizza-guy {
  transform: translateX(-100px);
  opacity: 0;
  animation: slideIn .6s ease;
  animation-fill-mode: forwards;
}

@keyframes slideIn {
  to {
  transform: translateX(-0px);
  opacity: 1;

  }
}
</style>
