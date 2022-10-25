import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "leaflet/dist/leaflet.css";
import VueGeolocation from "vue-browser-geolocation";
import LRouter from "leaflet-routing-machine";
// import Echo from "laravel-echo";
// window.Pusher = require("pusher-js");
//
// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "103c12c17ab1a12e15b6",
//   cluster: "ap2",
//   forceTLS: true,
// });

Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(LRouter);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
