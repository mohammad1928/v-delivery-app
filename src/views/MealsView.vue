<template>
  <v-container class="mt-10">
    <v-row class="justify-start align-center">
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            class="mx-5 mb-7 py-4"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-filter-outline</v-icon> Filtering
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Select Food Category</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px">
            <v-checkbox
              v-model="checkFilter"
              label="All"
              value="all"
              color="orange"
              ref="allCheckBox"
            ></v-checkbox>
            <v-checkbox
              v-for="category in categories"
              v-model="checkFilter"
              :label="category.name"
              :value="category.name"
              color="orange"
              :key="category.id"
              @change="filtering"
            ></v-checkbox>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
      <v-text-field
        type="text"
        placeholder="Search"
        outlined
        dense
        label="Search"
        v-model="searchQuery"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="meal in allMeals" :key="meal.id">
        <MealComponent @addToCart="showAddedItem = true" :meal="meal" />
      </v-col>
    </v-row>

    <v-snackbar v-model="showAddedItem">
      Item added to cart successfully

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="showAddedItem = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from "axios";
import MealComponent from "@/components/MealComponent";
export default {
  name: "MealsView",
  components: {
    MealComponent,
  },
  data: () => ({
    reveal: [],
    dialog: false,
    dialogm1: "",
    categories: [],
    searchQuery: "",
    checkFilter: ["all"],
    meals: [],
    showAddedItem: false,
  }),
  async created() {
    await this.$store.dispatch("getMyFavs", localStorage.getItem("user_id"));
    await axios
      .get("http://localhost:8000/api/categories", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.categories = response.data.categories;
      });
    await axios
      .get("http://localhost:8000/api/meals", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.meals = response.data.meals;
        this.meals.forEach(() => {
          this.reveal.push(false);
        });
      });
  },
  computed: {
    allMeals() {
      if (this.checkFilter.includes("all")) {
        return this.meals.filter((meal) => {
          if (
            meal.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
          )
            return meal;
        });
      } else {
        return this.meals.filter((meal) => {
          if (
            this.checkFilter.includes(meal.category.name) &&
            meal.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
          )
            return meal;
        });
      }
    },
  },
  methods: {
    // handleSearch() {
    //   this.allMeals.filter((meal) => {
    //     if (meal.name.startsWith(this.searchQuery)) return meal;
    //   });
    // },
    filtering() {
      this.$refs.allCheckBox.color = "error";
    },
  },
};
</script>
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
