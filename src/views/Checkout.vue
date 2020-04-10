<template>
  <v-container>
    <div v-if="basket.length">
      <v-row>
        <v-col>
          Your order :
          {{ basket }}
          <hr />
        </v-col>
        <v-col>
          Your info:
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
      No items for order!
    </div>
    <div v-if="orderDelivered">
      ORDER HAS BEEN PLACED SUCCESSFULY :D
    </div>
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
</style>
