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

            <div v-for="(option, index) in newPizza.options" :key="index">
              <span @click="removeOption(option)" class="subtitle-1">Option - {{ index + 1 }}</span>
              <v-text-field
                placeholder="Size"
                v-model="option.size"
              ></v-text-field>
              <v-text-field
                placeholder="Price"
                type="number"
                v-model="option.price"
              ></v-text-field>
            </div>
            <v-btn color="green" text fab small @click="addOption"><v-icon>mdi-plus</v-icon></v-btn>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn class="green white--text" @click="add">
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
        options: [],
      },
    };
  },
  methods: {
    add() {
      dbMenuRef.add(this.newPizza);
      this.dialog = false;
    },
    addOption() {
      this.newPizza.options.push({
        size: "",
        price: Number,
      });
    },
    removeOption(i) {
      const item = this.newPizza.options.indexOf(i)
      this.newPizza.options.splice(item,1)
  
      
    }
  },
};
</script>

<style lang="scss" scoped></style>
