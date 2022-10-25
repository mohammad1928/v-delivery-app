<template>
  <footer style="background-color: #f6d2bd">
    <div class="d-flex justify-center mb-4">
      <hr style="width: 75%; background-color: #ffa073" />
    </div>
    <v-container>
      <v-row class="justify-space-around">
        <v-col cols="4" class="d-flex flex-column">
          <div class="d-flex align-center">
            <img
              src="../assets/images/kisspng-chicken-meat-chef-cartoon-chinese-new-year-of-the-rooster-food-posters-5a96c614addb90.3641362415198305487121.png"
              alt=""
              width="75"
              height="75"
            />
            <h1 class="red--text">FOODIES</h1>
          </div>
          <ul style="list-style: none">
            <li class="d-block text--darken-1" v-for="n in 4" :key="n">
              <a href="#">Lorem ipsum dolor sit amet.</a>
            </li>
          </ul>
        </v-col>
        <v-col cols="4" class="mt-4">
          <h1 class="">Opening Hours</h1>
          <ul style="list-style: none">
            <li class="d-block" v-for="n in 3" :key="n">Lorem ipsum dolor.</li>
          </ul>
        </v-col>
        <v-col cols="4" class="mt-4">
          <h1>Contact us</h1>
          <v-form>
            <v-text-field
              label="Email"
              placeholder="Enter your email"
              filled
              rounded
              dense
            ></v-text-field>
            <v-textarea
              filled
              name="input-7-4"
              label="Message"
              placeholder="Type your message here"
              rounded
            ></v-textarea>
            <v-btn color="error" class="ml-2">Submit</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <p class="text-center text-h6 mt-5">
      Copyright &copy; All rights reserved &reg;
    </p>
  </footer>
</template>
<script>
export default {
  name: "HomePageFooter",
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
  transition: all 0.5s linear;
}
a:hover {
  font-size: 1.1rem;
}
</style>
