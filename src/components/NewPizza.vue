<template>
  <v-row justify="center">
    <v-btn class="my-5" color="green" dark @click.stop="dialog = true">
      New Pizza
    </v-btn>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4">
        <v-card-title class="headline">Add New Pizza</v-card-title>

        <v-card-text>
          <form class="mb-12">
            <v-text-field
              v-model="newPizza.name"
              label="Name"
              required
            ></v-text-field>
            <v-textarea
              v-model="newPizza.description"
              label="Description"
            ></v-textarea>
            <br />
            <span class="subtitle-1">Option 1</span>
            <v-text-field v-model="newPizza.options[0].size" label="Size">
            </v-text-field>
            <v-text-field
              v-model="newPizza.options[0].price"
              type="number"
              label="Price"
            >
            </v-text-field>
            <span class="subitle-1">Option 2</span>
            <v-text-field v-model="newPizza.options[1].size" label="Size">
            </v-text-field>
            <v-text-field
              v-model="newPizza.options[1].price"
              type="number"
              label="Price"
            >
            </v-text-field>
            
          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn color="green darken-1" @click="add">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { dbMenuRef } from "../firebase";

export default {
  name: "addNewPizza",
  data() {
    return {
      dialog: false,
      newPizza: {
        name: "Eg. Margherita",
        description:
          "Eg. A delicious tomato based pizza topped with mozzarella",
        tumb: require("../assets/images/Menu/margarita.jpg"),
        options: [
          {
            size: "M",
            price: 6.95,
          },
          {
            size: "L",
            price: 10.95,
          },
        ],
      },
    };
  },
  methods: {
    add() {
      dbMenuRef.add(this.newPizza);
      this.dialog = false
    },
  },
};
</script>

<style lang="scss" scoped></style>
