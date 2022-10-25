import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: localStorage.getItem("token") ? true : false,
    cartItems: [],
    myOrders: [],
    myFavorites: [],
    posts: [],
    notifications: [],
    restaurants: [],
  },
  getters: {},
  mutations: {
    SET_LOGIN_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn;
    },

    GET_CART_ITEMS(state, items) {
      state.cartItems = items;
    },
    GET_MY_ORDERS(state, orders) {
      state.myOrders = orders;
    },
    GET_MY_Favs(state, favs) {
      state.myFavorites = favs;
    },
    GET_Posts(state, posts) {
      state.posts = posts;
    },
    GET_Notifications(state, notifications) {
      state.notifications = notifications;
    },
    GET_Restaurants(state, restaurants) {
      state.restaurants = restaurants;
    },
  },
  actions: {
    setLoggedIn(context, loggedIn) {
      context.commit("SET_LOGIN_STATUS", loggedIn);
    },
    async getCartItems(context) {
      await axios
        .get(
          "http://localhost:8000/api/user-cart/" +
            localStorage.getItem("user_id"),
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          context.commit("GET_CART_ITEMS", response.data.cart[0].items);
        });
    },
    async addToCart(context, meal_id) {
      let res = await axios.post(
        "http://localhost:8000/api/add-to-cart",
        {
          user_id: parseInt(localStorage.getItem("user_id")),
          meal_id: meal_id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return res.status;
    },
    async getMyOrders(context, user_id) {
      await axios
        .get("http://localhost:8000/api/my-orders/" + user_id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 200)
            context.commit("GET_MY_ORDERS", response.data.orders);
        });
    },
    async getMyFavs(context, user_id) {
      await axios
        .get("http://localhost:8000/api/favorites/" + user_id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            context.commit("GET_MY_Favs", response.data.favs);
          }
        });
    },

    async addToFavorites(context, meal_id) {
      let response = await axios.post(
        "http://localhost:8000/api/add-to-favorites",
        {
          user_id: localStorage.getItem("user_id"),
          meal_id: meal_id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.status;
    },

    async getPosts(context) {
      await axios
        .get("http://localhost:8000/api/posts", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 200)
            context.commit("GET_Posts", response.data.posts);
        });
    },

    async likePost(context, post_id) {
      let response = await axios.post(
        "http://localhost:8000/api/like-post",
        {
          user_id: localStorage.getItem("user_id"),
          post_id: post_id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.status;
    },

    async getNotifications(context) {
      await axios
        .get(
          "http://localhost:8000/api/notifications/" +
            localStorage.getItem("user_id"),
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          context.commit("GET_Notifications", data.data.notifications);
        });
    },

    async getRestaurants(context) {
      await axios
        .get("http://localhost:8000/api/restaurants", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((data) => {
          context.commit("GET_Restaurants", data.data.restaurants);
        });
    },
  },
  modules: {},
});
