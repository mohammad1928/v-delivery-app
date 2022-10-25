<template>
  <div id="map"></div>
</template>
<script>
import L from "leaflet";
export default {
  name: "MainMap",
  data() {
    return {};
  },
  computed: {
    restaurants() {
      let resturants = this.$store.state.restaurants;
      return resturants;
    },
  },
  async created() {
    await this.$store.dispatch("getRestaurants");
    const lat = 35.1458838;
    const lng = 36.764895;
    var map = L.map("map").setView([35.1458838, 36.764895], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    let destIcon = L.icon({
      iconUrl: require("../assets/house.png"),
      iconSize: [100, 100],
    });
    let srcIcon = L.icon({
      iconUrl: require("../assets/restaurant.png"),
      iconSize: [75, 75],
    });
    let coords = L.latLng([lat, lng]);
    L.marker(coords, { icon: destIcon }).bindTooltip("My location").addTo(map);

    this.restaurants.forEach((restaurant) => {
      let marker = L.marker([restaurant.lat, restaurant.lng], {
        icon: srcIcon,
      })
        .bindTooltip(restaurant.name, {
          permanent: true,
          direction: "auto",
          sticky: true,
        })
        .bindPopup(
          "<a href='restaurant/" +
            restaurant.id +
            "'>Restaurant Details</button>"
        )
        .addTo(map);
      marker.on("click", () => {
        console.log(restaurant.name);
      });
      marker.on("dblclick", () => {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, lng),
            L.latLng(restaurant.lat, restaurant.lng),
          ],
        })
          .on("routesfound", (e) => {
            console.log(e.routes);
            // e.routes[0].coordinates.forEach((coord, index) => {
            //   setTimeout(() => {
            //     homeMarker.setLatLng([coord.lat, coord.lng]);
            //   }, 100 * index);
            // });
          })
          .addTo(map);
      });
    });
    map.on("click", (e) => {
      console.log(e.latlng);
    });
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
