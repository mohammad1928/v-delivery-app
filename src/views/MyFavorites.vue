<template>
  <v-container class="my-10">
    <v-row v-if="myFavs.length > 0">
      <v-col cols="3" v-for="fav in myFavs" :key="fav.meal.id">
        <MealComponent :meal="fav.meal" />
      </v-col>
    </v-row>
    <v-row style="height: 50vh" class="align-center justify-center" v-else>
      <h1 class="text-h2">No Favorites Meals</h1>
    </v-row>
  </v-container>
</template>
<script>
import MealComponent from "@/components/MealComponent";
export default {
  name: "MyFavorites",
  components: {
    MealComponent,
  },
  computed: {
    myFavs() {
      return this.$store.state.myFavorites;
    },
  },
  async created() {
    await this.$store.dispatch("getMyFavs", localStorage.getItem("user_id"));
  },
};
</script>
