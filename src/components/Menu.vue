<template>
  <div class="menu_wrapper">
    <v-container class="mt-10">
      <v-row justify="center" class="mt-10">
        <v-col class="menuItems" cols="8">
          <div v-for="item in getMenuItems" :key="item.name" class="pizza">
            <div id="img">
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
            </div>
          </div>
        </v-col>
        <v-col cols="4">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "menuItems",
  data() {
    return {
      
      basket: []
    };
  },
  computed: {
      ...mapGetters([
          'getMenuItems'
      ])
  },
  methods: {
    async addToBasket(item, option) {
      const pizzaExist = await this.basket.find(
        pizza => pizza.name === item.name && pizza.size === option.size
      );
      if (pizzaExist) {
        pizzaExist.quantity++;
        return;
      }
      this.basket.push({
        name: item.name,
        price: option.price,
        size: option.size,
        quantity: 1
      });
      this.$store.commit('addToBasket', this.basket)
    },
  }
};
</script>

<style lang="scss">
.menuItems {
  display: flex;
}

.pizza {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  margin: 10px;
  padding: 20px 10px;
  border-radius: 20px;
  justify-content: space-between;
  box-shadow: 4px 4px 20px rgba(black, 0.2);

  height: 400px;

  #img {
    border-radius: 30px;
    width: 150px;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .addButton {
      color: white;
    }
  }
}


@media screen and (max-width: 600px) {
  .menuItems {
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
}
</style>
