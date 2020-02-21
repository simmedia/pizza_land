<template>
  <div class="menu_wrapper">
    <v-container class="mt-10">
      <v-row justify="center" class="mt-10">
        <v-col class="menuItems" cols="8">
          <div v-for="item in menuItems" :key="item.name" class="pizza">
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
          <div v-if="basket.length > 0">
            <div
              v-for="(item, index) in basket"
              :key="index"
              class="mb-3 basketItem"
            >
              <div>
                <v-btn @click="decreaseQuantity(item)" fab x-small>-</v-btn>
                <span class="pa-2">{{ item.quantity }}</span>
                <v-btn @click="increaseQuantity(item)" fab x-small>+</v-btn>
              </div>
              <span class="">{{ item.name }}</span>
              <div style="width: 70px;">
                <span class="mr-5">{{ item.size }}</span>
                <span style="text-align: right">{{ item.price * item.quantity }}$</span>
              </div>
            </div>
            <span class="total">Total: <span>248</span>$</span> <br />
            <v-btn class="mt-5 primary">Order</v-btn>
          </div>
          <div v-else>
            {{ basketText }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "menuItems",
  data() {
    return {
      basketText: "Your basket is emtpty",
      basket: [],
      menuItems: [
        {
          name: "Margherita",
          description: "A delicious tomato based pizza topped with mozzarella",
          tumb: require("../assets/images/Menu/margarita.jpg"),
          options: [
            {
              size: "M",
              price: 6.95
            },
            {
              size: "L",
              price: 10.95
            }
          ]
        },
        {
          name: "Mexicana",
          description: "A delicious tomato based pizza topped with mozzarella",
          tumb: require("../assets/images/Menu/mexicana.jpg"),
          options: [
            {
              size: "M",
              price: 5.95
            },
            {
              size: "L",
              price: 9.95
            }
          ]
        },
        {
          name: "Cappricossa",
          description: "A delicious tomato based pizza topped with mozzarella",
          tumb: require("../assets/images/Menu/kapricoza.jpg"),
          options: [
            {
              size: "M",
              price: 6.95
            },
            {
              size: "L",
              price: 8.95
            }
          ]
        }
      ]
    };
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
      console.log(this.basket);
    },
    removefromBasket(item) {
        this.basket.splice(this.basket.indexOf(item), 1)
    },
    increaseQuantity(item) {
        item.quantity++
    },
    decreaseQuantity(item) {
        item.quantity--  
        if(item.quantity === 0) {
            this.removefromBasket(item)
        }
    }
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
.basketItem {
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  span:nth-child(2) {
  }
}

.total {
  font-size: 20px;
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
