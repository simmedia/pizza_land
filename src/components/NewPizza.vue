<template>
  <form class="mb-12">
    <div class="headline">Add New Pizza</div>
    <v-text-field v-model="newPizza.name" label="Name" required></v-text-field>
    <v-textarea v-model="newPizza.description" label="Description"></v-textarea>
    <br />
    <span class="subtitle-1">Option 1</span>
    <v-text-field v-model="newPizza.options[0].size" label="Size"> </v-text-field>
    <v-text-field v-model="newPizza.options[0].price" type="number" label="Price"> </v-text-field>
    <span class="subitle-1">Option 2</span>
    <v-text-field v-model="newPizza.options[1].size" label="Size"> </v-text-field>
    <v-text-field v-model="newPizza.options[1].price" type="number" label="Price"> </v-text-field>
    <v-checkbox></v-checkbox>

    <v-btn class="mr-4" @click="add">Add pizza</v-btn>
  </form>
</template>

<script>
import { dbMenuRef } from '../firebase';

export default {
  name: "addNewPizza",
  data() {
    return {
      newPizza: {
        name: "Eg. Margherita",
        description: "Eg. A delicious tomato based pizza topped with mozzarella",
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
      }
    };
  },
  methods: {
      add() {
          dbMenuRef.add(this.newPizza)
      }
  }
};
</script>

<style lang="scss" scoped></style>
