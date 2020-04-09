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
      <div class="orders_wrapper">
        <h3>Current orders ({{ numberOfOrders }})</h3>

        <v-expansion-panels accordion popout>
          <v-expansion-panel
            v-for="(order, index) in getOrders"
            :key="order.id"
          >
            <v-expansion-panel-header>
              {{ order.name }} | {{ order.address }} | {{ order.phone }} --

              {{ order.takeOut ? "Delivery" : "Take-out" }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <table>
                <thead>
                  <tr>
                    <th>Pizza</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="order_number">
                    <th colspan="4">
                      <strong>Order Number: {{ index + 1 }}</strong>
                    </th>
                    <v-btn @click="removeOrder(order.id)" x-small color="red"
                      >&times;</v-btn
                    >
                  </tr>
                  <tr v-for="orderItem in order.pizzas" :key="orderItem.id">
                    <td>{{ orderItem.name }}</td>
                    <td>{{ orderItem.size }}</td>
                    <td>{{ orderItem.quantity }}</td>
                    <td>{{ orderItem.price }}$</td>
                  </tr>
                  <th colspan="4">
                    <strong>TOTAL: {{ order.total }}$</strong>
                  </th>
                </tbody>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
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
      this.snackbar = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin_wrapper {
  margin: 10px;
}

.curren_user,
.orders_wrapper,
.menu_wrapper {
  margin: 10px 0;
  padding: 10px;
  border: solid 1px green;
}

table {
  text-align: left;
  width: 70vw;
}

.order_number {
  background: #ddd;
}

.btn_red {
  background: red;
  padding: 10px;
}
</style>
