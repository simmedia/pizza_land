<template>
  <div class="home">
    <v-container class="main" mt-12>
      <v-row wrap class="mt-12">
        <v-col xs="12" sm="6" class="jumbotron mt-12 order-sm-1">
          <h1 class="mainText display-2">Delicious and Tasty!</h1>
          <p class="mt-10 text--secondary subtitle-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio rerum
            accusantium qui, obcaecati numquam doloribus neque molestiae
            architecto quia, voluptate asperiores eos placeat error est!
          </p>
          <v-btn color="my-10 red">
            <span class="mr-2 white--text">ORDER NOW</span>
          </v-btn>
        </v-col>
        <v-col align="center" md="6">
          <img
            src="@/assets/images/pizza_chief.png"
            width="300px"
            class="ml-12 chiefImg"
            alt=""
            transition="scale-transition"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container mt-12 fluid class="red">
      <v-row wrap justify="center">
        <v-col md="3" cols="12" class="yellow"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          suscipit.</v-col
        >
        <v-col md="3" cols="12" class="blue"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          suscipit.</v-col
        >
        <v-col md="3" cols="12" class="green"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          suscipit.</v-col
        >
      </v-row>
    </v-container>
    <v-container height="100vh">
      <v-row justify="center">
        <img class="three-icon-pack" width="400px" src="../assets/images/threeIconPack.png" alt="" />
      </v-row>
    </v-container>
    <v-container fluid>
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh !important;
  display: flex;
  align-items: center;

  .mainText {
    color: #424242;
  }
}
@media screen and (max-width: 600px) {
  .chiefImg {
    width: 200px;
    margin-top: -50px;
  }
  .jumbotron {
    text-align: center;
    p {
      text-align: left;
    }
  }
  .three-icon-pack {
    width: 300px;
  }
}
</style>
