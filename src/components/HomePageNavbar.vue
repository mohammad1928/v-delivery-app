<template>
  <nav
    class="px-2 py-3 d-flex flex-column justify-center align-center"
    style="background-color: #f6d2bd"
  >
    <div class="logo">
      <img
        src="../assets/images/kisspng-chicken-meat-chef-cartoon-chinese-new-year-of-the-rooster-food-posters-5a96c614addb90.3641362415198305487121.png"
        width="50"
        height="50"
        alt=""
      />
      <router-link to="/"
        ><span class="red--text font-weight-bold logo-text"
          >FOODIES</span
        ></router-link
      >
    </div>
    <ul>
      <li><router-link to="/">HOME</router-link></li>
      <li><router-link to="/meals">FOOD</router-link></li>
      <li><router-link to="/my-orders">MY ORDERS</router-link></li>
      <li><router-link to="/blog">BLOG</router-link></li>
      <li><a href="#">ABOUT</a></li>
    </ul>
    <div class="left-icons">
      <div v-if="loggedIn">
        <v-btn text color="primary" @click="showCart = !showCart">
          <v-icon>mdi-cart-outline</v-icon>
          <v-badge
            color="error"
            :content="cartItems.length"
            class="mb-2"
            v-if="cartItems.length > 0"
          ></v-badge>
        </v-btn>
        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              class="mx-2"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-badge :content="notifications.length" color="red" overlap>
                <v-icon large> mdi-bell-outline </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-list class="pa-2">
            <h2>
              <v-icon class="mb-1">mdi-bell</v-icon> Notifications ({{
                notifications.length
              }})
            </h2>
            <v-list-item
              v-for="notification in notifications"
              :key="notification.id"
            >
              <v-list-item-title class="pa-4">
                <h3 class="mb-2">{{ notification.title }}</h3>
                <p>{{ notification.body }}</p>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          text
          class="text-center ml-3"
          title="Favorites"
          to="/my-favorites"
          ><v-icon color="error">mdi-heart-outline</v-icon>
          <v-badge
            v-show="$store.state.myFavorites.length > 0"
            :content="$store.state.myFavorites.length"
          ></v-badge
        ></v-btn>
        <v-icon class="ml-7" @click="logout">mdi-logout</v-icon>
      </div>
      <div v-else>
        <v-btn to="/login" style="background-color: #f1824b">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
    </div>
    <hr />
    <div class="cart" v-show="showCart" v-click-outside="closeCart">
      <div v-if="cartItems.length > 0">
        <v-row
          class="align-center justify-center"
          v-for="item in cartItems"
          :key="item.id"
        >
          <v-col class="d-flex align-center">
            <img
              src="../assets/images/pizza.png"
              width="75"
              height="75"
              alt=""
            />
            <h3 class="text-h6 ml-3 mt-3">{{ item.meal.name }}</h3>
          </v-col>
          <v-col class="d-flex flex-column align-center">
            <input
              type="number"
              min="0"
              v-model="item.quantity"
              style="background-color: white"
            />
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              color="error"
              title="Remove from cart"
              @click="removeItem(item.id)"
              ><v-icon>mdi-cart-minus</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <div class="text-center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Confirm Order
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Confirm Order</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="10">
                          <v-text-field
                            label="Your Location"
                            required
                            outlined
                            maxlength="50"
                            counter="40"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-btn
                            color="primary py-7"
                            title="Detect Your Location Automatically"
                            :loading="loading"
                            @click="getLocation"
                            ><v-icon>mdi-map-marker-circle</v-icon></v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Notes"
                        outlined
                        placeholder="Enter some edits for meals you like to do"
                        hint="Enter some edits for meals you like to do"
                        maxlength="150"
                        counter="150"
                        v-model="notes"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="confirmOrder">
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <v-row class="justify-center align-center" v-else>
        <p>No items in your card</p>
      </v-row>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
import Pusher from "pusher-js";

export default {
  name: "HomePageNavbar",
  data() {
    return {
      showCart: false,
      dialog: false,
      lat: null,
      lng: null,
      notes: "",
      loading: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    cartItems() {
      return this.$store.state.cartItems;
    },
    notifications() {
      return this.$store.state.notifications;
    },
  },
  mounted() {
    let pusher = new Pusher("103c12c17ab1a12e15b6", {
      encrypted: true,
      cluster: "ap2",
    });
    let channel = pusher.subscribe("worker-" + localStorage.getItem("user_id"));
    channel.bind("worker-selected", async () => {
      await this.$store.dispatch("getNotifications");
    });
  },
  async created() {
    await this.$store.dispatch("getCartItems");
    await this.$store.dispatch("getNotifications");
  },
  methods: {
    async logout() {
      await axios
        .post("http://localhost:8000/api/logout", {
          id: localStorage.getItem("user_id"),
        })
        .then((res) => {
          if (res.data.message) {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            this.$store.dispatch("setLoggedIn", false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async removeItem(item_id) {
      await axios
        .post("http://localhost:8000/api/remove-from-cart/" + item_id, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 200) this.$store.dispatch("getCartItems");
        });
    },
    closeCart() {
      if (!this.showCart) this.showCart = false;
    },
    async confirmOrder() {
      await axios
        .post(
          "http://localhost:8000/api/confirm-order",
          {
            user_id: localStorage.getItem("user_id"),
            cart_items: this.cartItems,
            lng: this.lng,
            lat: this.lat,
            notes: this.notes,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) this.$store.dispatch("getCartItems");
          this.dialog = false;
        });
    },
    getLocation() {
      this.loading = true;
      this.$getLocation()
        .then((coordinates) => {
          this.lat = coordinates.lat;
          this.lng = coordinates.lng;
          console.log(coordinates.lat);
          this.loading = false;
        })
        .catch((error) => {
          alert(error);
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
nav {
  position: relative;
}
nav ul {
  list-style: none;
  margin-bottom: 40px;
  margin-top: 39px;
}
nav ul li {
  display: inline;
  margin: 0px 15px;
}
a {
  text-decoration: none;
  color: black !important;
  font-weight: bold;
  transition: all 0.1s linear;
}
nav ul li a:hover {
  font-size: 1.1rem;
}
hr {
  width: 75%;
  height: 1px;
  background-color: #ffa073;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 150px;
}
.logo-text {
  letter-spacing: 20px;
  margin-left: 20px;
  font-size: 24px;
  font-weight: bolder;
}
.left-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 150px;
}
.cart {
  position: absolute;
  right: 53px;
  top: 100px;
  background-color: whitesmoke;
  width: 600px;
  z-index: 999;
  padding: 20px;
  transition: all 1s linear;
  display: flex;
  flex-direction: column;
}
.cart::before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: whitesmoke;
  display: flex;
  position: absolute;
  top: -10px;
  right: 41%;
  transform: rotate(45deg);
}
</style>
