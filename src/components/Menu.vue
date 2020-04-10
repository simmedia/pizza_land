<template>
  <div class="menu_wrapper">
    <v-container class="mt-10">
      <v-row justify="center" wrap class="mt-10">
        <v-col
          cols="10"
          sm="4"
          v-for="item in getMenuItems"
          :key="item.name"
          class="pizza"
        >
          <v-card max-width="320">
            <v-hover v-slot:default="{ hover }">
              <v-img width="100%" contain :src="item.tumb">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out red darken-4 v-card--reveal display-3"
                    style="height: 100%;"
                  >
                    <v-card-text class="py-2">
                      <v-row align="center" class="mx-0"> </v-row>

                      <span class="title white--text">{{ item.description }}</span>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
            <v-card-title class="py-2">{{ item.name }}</v-card-title>

            <v-divider class="mx-4"></v-divider>

            <v-card-text class="py-0">
              <v-row>
                <v-col
                  class="d-flex flex-column"
                  v-for="(option, index) in item.options"
                  :key="index"
                >
                  <span class="subtitle-1 mr-3 mb-1"
                    ><span class="body-1">size: </span> {{ option.size }}</span
                  >
                  <span class="headline mb-2">{{ option.price }}$</span>
                  <v-btn
                    @click="addToBasket(item, option)"
                    class="addButton white--text red"
                    fab
                    x-small
                    dark
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "menuItems",
  data() {
    return {
      basket: [],
    };
  },
  computed: {
    ...mapGetters(["getMenuItems", "getBasketItems"]),
  },
  methods: {
    async addToBasket(item, option) {
      const pizzaExist = await this.getBasketItems.find(
        (pizza) => pizza.name === item.name && pizza.size === option.size
      );
      if (pizzaExist) {
        pizzaExist.quantity++;
        return;
      }
      this.getBasketItems.push({
        name: item.name,
        price: option.price,
        size: option.size,
        quantity: 1,
      });
      this.$store.commit("addToBasket", this.getBasketItems);
    },
  },
};
</script>

<style lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
