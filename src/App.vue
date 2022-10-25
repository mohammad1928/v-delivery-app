<template>
  <v-app>
    <HomePageNavbar />
    <v-main>
      <router-view />
    </v-main>
    <HomePageFooter />
  </v-app>
</template>

<script>
import HomePageNavbar from "@/components/HomePageNavbar";
import HomePageFooter from "@/components/HomePageFooter";
export default {
  name: "App",
  components: {
    HomePageNavbar,
    HomePageFooter,
  },
  data: () => ({
    //
  }),
};
</script>
