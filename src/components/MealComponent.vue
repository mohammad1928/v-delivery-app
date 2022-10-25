<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <v-img
          :src="'http://localhost:8000/storage/' + meal.image"
          height="250"
        ></v-img>
        <v-card-text>
          <h1 class="primary--text text-h6 ml-2">{{ meal.name }}</h1>
          <p class="error ml-2 white--text rounded px-1" style="width: 40px">
            {{ meal.price }} $
          </p>
          <p class="mt-5 ml-1">
            <v-icon>mdi-grid</v-icon> {{ meal.category.name }}
          </p>
        </v-card-text>
        <v-card-title style="margin-top: -36px">
          <v-rating
            :value="rating"
            dense
            color="orange"
            background-color="orange"
            hover
            class="mr-2"
          ></v-rating>
          <span class="primary--text text-subtitle-2"
            >{{ meal.reviews.length }} Reviews</span
          >
        </v-card-title>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <p
              class="text-h6 px-2 d-flex justify-center"
              style="height: 150px; overflow: auto"
            >
              {{ meal.description }}
            </p>
            <v-row class="justify-center mt-1">
              <v-btn
                color="primary"
                title="Add to cart"
                @click="addToCart(meal.id)"
                ><v-icon>mdi-cart-plus</v-icon></v-btn
              >
              <v-btn
                class="ml-2"
                color="error"
                @click="addToFavorites(meal.id)"
                :title="
                  isFavorite(meal.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                "
                ><v-icon>{{
                  isFavorite(meal.id) ? "mdi-heart" : "mdi-heart-outline"
                }}</v-icon>
              </v-btn>
              <v-btn class="ml-2" color="info" title="Add to favorites"
                ><v-icon>mdi-alert-circle-outline </v-icon></v-btn
              >
            </v-row>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
export default {
  name: "MealComponent",
  props: ["meal"],
  computed: {
    rating() {
      let sum = 0;
      this.meal.reviews.forEach((review) => {
        sum += review.rating;
      });

      return Math.floor(sum / this.meal.reviews.length);
    },
  },
  methods: {
    async addToCart(meal_id) {
      let status = await this.$store.dispatch("addToCart", meal_id);
      if (status == 200) {
        this.$store.dispatch("getCartItems");
        this.$emit("addToCart");
      }
    },
    async addToFavorites(meal_id) {
      await this.$store.dispatch("addToFavorites", meal_id);
      await this.$store.dispatch("getMyFavs", localStorage.getItem("user_id"));
    },
    isFavorite(meal_id) {
      let bool = 0;
      this.$store.state.myFavorites.forEach((fav) => {
        if (bool == false && fav.meal.id == meal_id) {
          bool = true;
        }
      });
      return bool;
    },
  },
};
</script>
