<template>
  <div class="admin_wrapper mt-10">
    <v-container class="mt-12" v-if="!currentUser">
      <Login />
    </v-container>
    <v-container v-else class="mt-10">
      <div class="current_user">
        <span class="body-1"
          >Logged in as:
          <span v-if="currentUser" class="body-2 blue--text">{{
            currentUser.email
          }}</span>
        </span>
        <v-btn small class="ml-3 red" @click.prevent="SignOut">Sign Out</v-btn>
      </div>
      <v-row justify="center">
        <NewPizza />
      </v-row>

      <div class="menu_wrapper">
        <h3>Menu</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Remove From Menu</th>
            </tr>
          </thead>
          <tbody v-for="item in getMenuItems" :key="item.id">
            <tr>
              <td>{{ item.name }}</td>
              <td>
                <v-btn @click="removeMenuItem(item.id)" x-small color="red"
                  >&times;</v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <v-card class="orders_wrapper">
        <v-card-title>Current orders ({{ numberOfOrders }})</v-card-title>

        <v-expansion-panels accordion popout>
          <v-expansion-panel v-for="order in getOrders" :key="order.id">
            <v-expansion-panel-header>
              {{ order.name }} | {{ order.address }} | {{ order.phone }} --

              {{ order.takeOut ? "Delivery" : "Take-out" }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-simple-table fixed-header>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Size</th>
                      <th class="text-left">Quantity</th>
                      <th class="text-left">Price</th>
                      <th class="text-left">
                        <v-btn
                          @click="removeOrder(order.id)"
                          x-small
                          fab
                          class="red white--text"
                          ><v-icon>mdi-delete</v-icon></v-btn
                        >
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="orderItem in order.pizzas" :key="orderItem.id">
                      <td class="text-left">{{ orderItem.name }}</td>
                      <td class="text-left">{{ orderItem.size }}</td>
                      <td class="text-left">{{ orderItem.quantity }}</td>
                      <td class="text-left">{{ orderItem.price }}$</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <v-snackbar :timeout="timeout" v-model="snackbar">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">
          Close
        </v-btn>
        <audio
          v-if="snackbar"
          src="../assets/notification.mp3"
          autoplay
        ></audio>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import NewPizza from "./NewPizza";
import Login from "./Login";
import { mapGetters } from "vuex";

export default {
  name: "Admin",
  components: {
    NewPizza,
    Login,
  },
  data() {
    return {
      name: "Stefan",
      playSound: false,
      snackbar: false,
      text: "New Notification",
      timeout: 1500,
    };
  },
  computed: {
    ...mapGetters([
      "getMenuItems",
      "numberOfOrders",
      "currentUser",
      "getOrders",
      "orderSent",
    ]),
  },
  methods: {
    SignOut() {
      this.$store.dispatch("signOut");
    },
    removeMenuItem(id) {
      this.$store.dispatch("removeMenuItem", id);
    },
    removeOrder(id) {
      this.$store.dispatch("removeOrder", id);
    },
  },

  watch: {
    getOrders() {
      (this.snackbar = true), (this.text = "Orders has been updated!");
    },
  },
};
</script>

<style lang="scss" scoped>
.admin_wrapper {
  margin: 10px;
}
</style>
