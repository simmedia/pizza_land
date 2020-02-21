<template>
  <v-app>
    <span class="bg"></span>
    <v-navigation-drawer temporary v-model="drawer" app>
      <v-list dense>
        <v-list-item router style="cursor: pointer">
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="green lighten-1" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          id="logo"
          contain
          src="@/assets/images/pizzaLogo.png"
          transition="scale-transition"
          width="120"
          @click="goToHome"
        />
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/menu" text>
          <span class="mr-2">MENU</span>
        </v-btn>
        <v-btn text>
          <span class="mr-2">ABOUT US</span>
        </v-btn>
        <v-btn text>
          <span class="mr-2">DELIVERY</span>
        </v-btn>
        <v-btn text>
          <span class="mr-2">CONTACT</span>
        </v-btn>
      </v-toolbar-items>

      <v-menu
        transition="scroll-x-reverse-transition"
        v-model="value"
        :close-on-content-click="closeOnContentClick"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </template>
        <v-card class="mx-auto" max-width="400" tile>
          <v-list :two-line="twoLine" :avatar="avatar">
            <v-subheader>
              <h1 class="title">Cart</h1>
            </v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-avatar v-if="avatar">
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-if="twoLine || threeLine"
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-switch
                class="pl-4"
                color="red"
                v-model="takeOut"
                label="Take Out"
                :value="takeOut"
              ></v-switch>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>

    <!-- content -->

    <v-content>
      <v-container class="appContainer" fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    value: false,
    takeOut: false,
    closeOnContentClick: false,
    item: 5,
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      }
    ],
    twoLine: true,
    avatar: true
  }),
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss">
.appContainer {
  padding: 0px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.v-app-bar,
.v-toolbar__content {
  height: 75px !important;

  #logo {
    cursor: pointer;
  }
}

.bg {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url("assets/images/pizza_logo.png") repeat center center;
}
</style>
