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
            <v-img height="250" cover :src="item.tumb"></v-img>
            <v-card-title>{{ item.name }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0"> </v-row>

              <div>{{ item.description }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <v-row>
                <v-col
                  class="d-flex flex-column"
                  v-for="(option, index) in item.options"
                  :key="index"
                >
                  <span class="subtitle-1 mr-3 mb-3"
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

          <!-- <div id="img">
              <img :src="item.tumb" width="100%" alt="" />
            </div>
            <span class="title">{{ item.name }}</span>
            <p>{{ item.description }}</p>
            <div>
              <span
                class="options mr-10"
                v-for="(option, index) in item.options"
                :key="index"
              >
                <span class="subtitle-1 mr-3 mb-3"
                  ><span class="body-1">size: </span> {{ option.size }}</span
                >
                <span class="subtitle-2">{{ option.price }}$</span>
                <v-btn
                  @click="addToBasket(item, option)"
                  small
                  class="addButton red ml-3"
                  >add</v-btn
                >
              </span>
            </div> -->
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
      basket: []
    };
  },
  computed: {
    ...mapGetters(["getMenuItems", "getBasketItems"])
  },
  methods: {
    async addToBasket(item, option) {
      const pizzaExist = await this.getBasketItems.find(
        pizza => pizza.name === item.name && pizza.size === option.size
      );
      if (pizzaExist) {
        pizzaExist.quantity++;
        return;
      }
      this.getBasketItems.push({
        name: item.name,
        price: option.price,
        size: option.size,
        quantity: 1
      });
      this.$store.commit("addToBasket", this.getBasketItems);
    }
  }
};
</script>

<style lang="scss"></style>
