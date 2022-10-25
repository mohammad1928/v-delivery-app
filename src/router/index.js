import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import store from "@/store";
import MealsView from "@/views/MealsView";
import MyOrders from "@/views/MyOrders";
import MapView from "@/views/MapView";
import MyFavorites from "@/views/MyFavorites";
import BlogView from "@/views/BlogView";
import MainMap from "@/views/MainMap";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/meals",
    name: "MealsView",
    component: MealsView,
  },
  {
    path: "/my-orders",
    name: "MyOrders",
    component: MyOrders,
  },
  {
    path: "/map/:lat/:lng",
    name: "MapView",
    component: MapView,
  },

  {
    path: "/my-favorites",
    name: "MyFavorites",
    component: MyFavorites,
  },
  {
    path: "/blog",
    name: "BlogView",
    component: BlogView,
  },
  {
    path: "/main-map",
    name: "MainMap",
    component: MainMap,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === "/login" || to.fullPath === "/register") {
    if (store.state.loggedIn) next(from.fullPath);
  }
  if (to.fullPath === "/meals") {
    if (!store.state.loggedIn) next("/login");
  }
  next();
});

export default router;
