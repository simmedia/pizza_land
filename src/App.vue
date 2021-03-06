<template>
  <v-app>
    <span class="bg"></span>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group active-class="red--text text--accent-4">
          <v-list-item>
            <v-list-item-title @click="goTo('/')">
              <span class="body-1">Home</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="goTo('/menu')">
              <span class="body-1">Menu</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="goTo('/about')">
              <span class="body-1">About Us</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="goTo('/contact')">
              <span class="body-1">Contact</span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <v-app-bar app color="green lighten-1" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            id="logo"
            contain
            src="@/assets/images/pizzaLogo.png"
            transition="scale-transition"
            width="120"
            @click="goTo('/')"
          />
        </div>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn to="/menu" text>
            <span class="mr-2">MENU</span>
          </v-btn>
          <v-btn to="/about" text>
            <span class="mr-2">ABOUT US</span>
          </v-btn>
          <v-btn to="/contact" text>
            <span class="mr-2">CONTACT</span>
          </v-btn>
        </v-toolbar-items>

        <!-- BASKET -->

        <v-navigation-drawer
          v-model="drawerRight"
          class="cartDrawer"
          height="500px"
          width="400px"
          fixed
          light
          hide-overlay
          app
          temporary
          right
        >
          <v-subheader class="headline my-5">
            Cart
          </v-subheader>
          <v-list>
            <div class="basket-list" v-if="this.basket.length > 0">
              <v-list-item
                class="basket-item"
                v-for="(item, index) in basket"
                :key="index"
              >
                <span>
                  <v-btn @click="decreaseQuantity(item)" x-small fab>-</v-btn>
                  <span class="pa-2">{{ item.quantity }}</span>
                  <v-btn @click="increaseQuantity(item)" x-small fab>+</v-btn>
                </span>
                <span>{{ item.name }}</span>
                <span>{{ item.size }}</span>
                <span>{{ (item.price * item.quantity).toFixed(2) }}</span>
                <span
                  ><v-btn
                    @click="removefromBasket(item)"
                    class="red white--text"
                    x-small
                    >&times;</v-btn
                  ></span
                >
              </v-list-item>

              <v-list-item class="mt-5">
                Total:
                <span class="ma-2 title">{{ getTotal.toFixed(2) }}$</span>
              </v-list-item>
              <v-btn
                @click="checkout"
                small
                class="mt-5 ml-4 green lighten-2 white--text"
                >Checkout</v-btn
              >
            </div>

            <span class="body-1 ml-4" v-else>{{ basketText }}</span>
          </v-list>
        </v-navigation-drawer>

        <v-btn @click.stop="drawerRight = !drawerRight" text>
          <v-icon>mdi-cart</v-icon>
          <span>{{ getTotalQuantity }}</span>
        </v-btn>

        <v-app-bar-nav-icon
          class="hidden-sm-and-up"
          @click.stop="drawer = !drawer"
        />
      </v-app-bar>
    </v-container>
    <!-- content -->

    <v-content>
      <v-container class="appContainer" fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>

    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
import { dbMenuRef } from "./firebase";
import { dbOrdersRef } from "./firebase";

export default {
  name: "App",

  components: {},
  created() {
    this.$store.dispatch("setMenuRef", dbMenuRef);
    this.$store.dispatch("setOrdersRef", dbOrdersRef);
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },

  data: () => ({
    drawer: false,
    takeOut: false,
    drawerRight: false,
    basketText: "Your basket is emtpty"
  }),
  methods: {
    goTo(path) {
      this.$router.push(path);
    },

    checkout() {
      this.$router.push("/checkout");
    },

    // addNewOrder() {
    //   const order = {
    //     pizzas: { ...this.basket },
    //     createdAt: new Date(),
    //     total: this.getTotal
    //   };
    //   this.$store.dispatch("addNewOrder", order);
    //   this.$store.commit("clearBasket");
    //   this.basketText = "Thank your, your order has been placed!";
    // },

    removefromBasket(item) {
      this.basket.splice(this.basket.indexOf(item), 1);
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.removefromBasket(item);
      }
    }
  },
  computed: {
    basket() {
      return this.$store.getters.getBasketItems;
    },
    getTotalQuantity() {
      return this.basket.reduce((acc, item) => {
        acc += item.quantity;
        return acc;
      }, 0);
    },
    getTotal() {
      return this.basket.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);
    }
  }
};
</script>

<style lang="scss">
.appContainer {
  padding: 0px !important;
}

.cartDrawer {
  margin-top: 75px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.v-app-bar,
.v-toolbar__content {
  height: 75px !important;

  #logo {
    cursor: pointer;
  }
}

.total {
  font-size: 20px;
}

.bg {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url("assets/images/pizza_logo.png") repeat center center;
}

.basket-item {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 600px) {
  .cartDrawer {
    width: 85% !important;
  }
}
</style>
