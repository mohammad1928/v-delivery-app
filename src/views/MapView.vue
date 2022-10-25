<template>
  <div id="map"></div>
</template>
<script>
import L from "leaflet";
export default {
  name: "MapView",
  data() {
    return {};
  },
  mounted() {
    const lat = this.$route.params.lat;
    const lng = this.$route.params.lng;
    var map = L.map("map").setView([lat, lng], 17);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    let destIcon = L.icon({
      iconUrl: require("../assets/house.png"),
      iconSize: [100, 100],
    });
    let srcIcon = L.icon({
      iconUrl: require("../assets/delivery.png"),
      iconSize: [50, 50],
    });
    let coords = L.latLng([lat, lng]);
    L.marker(coords, { icon: destIcon }).addTo(map);
    L.marker([35.1458838, 36.764895], { icon: srcIcon }).addTo(map);

    L.Routing.control({
      waypoints: [L.latLng(35.1458838, 36.764895), L.latLng(coords)],
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
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
