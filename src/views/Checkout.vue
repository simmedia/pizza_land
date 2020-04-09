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
            <v-form>
              <v-text-field
                v-model="name"
                label="Full Name"
                required
              ></v-text-field>

              <v-text-field
                v-show="takeOut"
                v-model="address"
                label="Address"
                required
              ></v-text-field>

              <v-text-field
                v-model="phone"
                type="number"
                label="Phone Number"
                required
              ></v-text-field>

              <v-switch
                class="my-3"
                color="red"
                v-model="takeOut"
                label="Take Out"
              ></v-switch>

              <v-btn @click="placeOrder">
                Place Order
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        No items for order!
      </div>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "Checkout",
  data() {
    return {
      name: "",
      address: "",
      phone: null,
      takeOut: false,
      info: "",
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
