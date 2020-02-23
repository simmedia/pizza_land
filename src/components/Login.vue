<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <form>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn @click.prevent="login">Login</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { store } from '../store/index'

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signIn", user);
    }
  }
};
</script>

<style lang="scss"></style>
