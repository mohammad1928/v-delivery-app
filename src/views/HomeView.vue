<template>
  <v-app class="cont">
    <!--    <HomePageNavbar />-->
    <v-container class="mt-15" style="margin-bottom: 200px">
      <img
        src="../assets/images/5a1ca99d513278.0590432615118278693326.png"
        alt=""
        class="vegetables peeper"
      />
      <img
        src="../assets/images/kisspng-mentha-spicata-patchouli-peppermint-flavor-mint-png-transparent-5a74b396b5ad90.0243187515175975907442.png"
        alt=""
        class="vegetables mint"
      />
      <img
        src="../assets/images/kisspng-cherry-tomato-tomato-sauce-auglis-cut-tomatoes-5a881f34bd59a2.5334349715188703247756.png"
        alt=""
        class="vegetables tomatoes"
      />
      <img
        src="../assets/images/kisspng-basil-italian-cuisine-pesto-pizza-herb-mint-5ac4a402bcacb0.5344562315228364827728.png"
        alt=""
        class="vegetables mint-two"
      />
      <v-row class="justify-center justify-sm-space-around">
        <v-col cols="12" md="6">
          <p class="text-h1 font-weight-bold">
            Enjoy
            <span
              class="red-text text-decoration-underline"
              style="text-decoration-color: #e0a92e !important"
              >Deliciouc Food</span
            >
            In Your Healthy Life
          </p>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            consectetur dicta dignissimos dolor dolores ea earum, eligendi eum
            minima nulla quibusdam repellendus repudiandae sint sunt voluptatem
            voluptates voluptatibus. Assumenda cum excepturi hic neque officiis
            tempore.
          </p>
          <v-btn color="error"
            >Order Now <v-icon>mdi-arrow-right-thick</v-icon></v-btn
          >
        </v-col>
        <v-col cols="6" class="d-none d-md-block">
          <img
            src="../assets/images/5a34bdf89cdde9.7726631315134059446425.png"
            width="100%"
            height="600"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container
      style="
        margin-bottom: 100px;
        padding: 20px;
        border-radius: 50px;
        background-color: #fae7da;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      "
    >
      <v-row>
        <v-col
          cols="4"
          class="d-flex flex-column justify-center text-center"
          v-for="item in foodItems"
          :key="item.id"
        >
          <img :src="item.url" width="75%" height="300px" />
          <h2>{{ item.name }}</h2>
          <p class="text-muted">{{ item.description }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="why-us">
      <v-row>
        <v-col cols="6">
          <img
            src="../assets/images/food_dish.png"
            width="100%"
            height="500px"
          />
        </v-col>
        <v-col cols="6">
          <h1 class="text-h3 mt-15 ml-md-8 font-weight-bold">
            Why People Choose Us?
          </h1>
          <ul class="mt-5">
            <li class="first-list">
              <h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus, laborum?
              </h3>
            </li>
            <li class="second-list">
              <h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus, laborum?
              </h3>
            </li>
            <li class="third-list">
              <h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus, laborum?
              </h3>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <h1 class="text-center">Our Popular Food Items</h1>
      <p class="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, ullam!
      </p>
      <v-row class="food-items">
        <v-col
          class="food-item"
          cols="3"
          v-for="food in popularFood"
          :key="food.id"
        >
          <div
            class="ml-5 px-5 py-1 text-center"
            style="background-color: rgb(227 201 188); border-radius: 25px"
          >
            <img :src="food.url" width="75%" height="150px" />
            <h2 class="text-center mt-3">{{ food.name }}</h2>
            <p class="text-muted text-center">{{ food.description }}</p>
            <p class="red--text">{{ food.price }}$</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mb-10">
      <v-row>
        <v-col cols="6">
          <h1>Customer <span class="red--text">Feedback</span></h1>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet,
            doloribus fugiat harum inventore libero modi mollitia obcaecati
            porro quod, rem tempore vitae? Assumenda autem, cumque ducimus harum
            itaque minima nam nisi quam quo, quod rem similique, soluta velit
            voluptatem.
          </p>
          <v-row class="mt-5 align-center">
            <v-avatar color="primary" size="80"
              ><span class="white--text">M</span></v-avatar
            >
            <v-row class="flex-column ml-3">
              <h3>Mohammad Al-Mahmoud</h3>
              <small class="red--text">Lorem ipsum</small>
            </v-row>
          </v-row>
          <div
            class="mt-5 py-5 d-flex align-center"
            style="
              background-color: rgb(255 185 152);
              border-top-right-radius: 83px;
            "
          >
            <v-icon size="50">mdi-account-outline</v-icon>
            <span class="red--text text-h4 font-weight-bold">100</span>
            <v-row class="flex-column ml-5">
              <span>Loren</span>
              <span>Lorem ipsum.</span>
            </v-row>
            <v-icon size="50">mdi-trophy-outline</v-icon>
            <span class="red--text text-h4 font-weight-bold">1100</span>
            <v-row class="flex-column ml-5">
              <span>Loren</span>
              <span>Lorem ipsum.</span>
            </v-row>
          </div>
        </v-col>
        <v-col cols="6">
          <img src="../assets/images/chef.png" width="100%" height="400px" />
        </v-col>
      </v-row>
      <v-row class="justify-lg-space-around mt-10">
        <v-cols>
          <h1 class="text-h4 font-weight-bold">
            Subscribe <span class="red--text">Newsletter</span>
          </h1>
        </v-cols>
        <v-cols>
          <v-text-field
            label="Filled"
            placeholder="Dense & Rounded"
            filled
            rounded
            dense
          ></v-text-field>
        </v-cols>
      </v-row>
    </v-container>
    <!--    <HomePageFooter />-->
  </v-app>
</template>

<script>
// import HomePageNavbar from "@/components/HomePageNavbar";
// import HomePageFooter from "@/components/HomePageFooter";
export default {
  name: "HomeView",
  components: {
    // HomePageNavbar,
    // HomePageFooter,
  },
  data() {
    return {
      foodItems: [
        {
          id: 1,
          url: require("../assets/images/sushi.png"),
          name: "Tasty Suchi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores idmolestiae placeat! Consectetur dolor fugit nisi recusandae repellatsequi voluptate?",
        },
        {
          id: 2,
          url: require("../assets/images/fries.png"),
          name: "French Fries",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores idmolestiae placeat! Consectetur dolor fugit nisi recusandae repellatsequi voluptate?",
        },
        {
          id: 3,
          url: require("../assets/images/barbecue.png"),
          name: "Hot Barbecue",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores idmolestiae placeat! Consectetur dolor fugit nisi recusandae repellatsequi voluptate?",
        },
      ],
      popularFood: [
        {
          id: 1,
          name: "Chicken",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid cum nemo porro, quisquam sint.",
          price: 25,
          url: require("../assets/images/chicken.png"),
        },
        {
          id: 2,
          name: "Fruit Salad",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid cum nemo porro, quisquam sint.",
          price: 12,
          url: require("../assets/images/fruit_salad.png"),
        },
        {
          id: 3,
          name: "Fish",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid cum nemo porro, quisquam sint.",
          price: 30,
          url: require("../assets/images/fish.png"),
        },
        {
          id: 4,
          name: "Pizza",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid cum nemo porro, quisquam sint.",
          price: 15,
          url: require("../assets/images/pizza.png"),
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped>
.cont {
  background-color: #f6d2bd !important;
}

.red-text {
  color: red;
}
.text-muted {
  color: #757474;
}
.vegetables {
  position: absolute;
  width: 50px;
  height: 50px;
}
.peeper {
  right: 100px;
}
.mint {
  left: 30px;
}
.tomatoes {
  right: 300px;
  top: 800px;
  width: 100px;
  height: 100px;
}
.mint-two {
  right: 600px;
  top: 750px;
  width: 100px;
  height: 100px;
}
.why-us {
  margin-bottom: 50px;
}
.why-us li {
  display: flex;
}
.first-list {
  list-style: none;
  margin-bottom: 30px;
}
.first-list::before {
  content: "";
  display: inline-block;
  height: 60px;
  width: 60px;
  margin-right: 10px;
  background-image: url("../assets/images/5a1d2531eeefd7.4684423715118595059787 (2).png");
}
.second-list {
  margin-bottom: 30px;
}
.second-list::before {
  content: "";
  display: inline-block;
  height: 65px;
  width: 65px;
  margin-right: 10px;
  background-image: url("../assets/images/delivery-list.png");
}
.third-list {
  margin-bottom: 30px;
}
.third-list::before {
  content: "";
  display: inline-block;
  height: 60px;
  width: 60px;
  margin-right: 10px;
  background-image: url("../assets/images/dish-list.png");
}
.food-items {
  background-color: #fae7da;
  border-radius: 40px;
  position: relative;
  margin-top: 150px;
  padding: 0px 50px;
  padding-bottom: 50px;
  margin-bottom: 100px;
}
.food-item {
  margin-top: -120px;
}
</style>
