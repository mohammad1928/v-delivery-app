<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="mb-5">User Login</h1>
      <p class="text-center mb-10" style="max-width: 300px">
        Hey, Enter your details to get sign in to your account
      </p>
      <v-row>
        <v-form @submit.prevent="handleLoginForm">
          <v-text-field
            label="Email"
            placeholder="Enter your email"
            outlined
            dense
            type="email"
            :rules="[rules.required]"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Password"
            placeholder="Enter your password"
            outlined
            dense
            type="password"
            class="mb-3"
            :rules="[rules.required, rules.min]"
            v-model="password"
          ></v-text-field>
          <a href="#" style="margin-top: -20px"
            >Do you forget your password ?</a
          >
          <v-btn
            color="error"
            class="mt-7 black--text"
            width="100%"
            style="background-color: #ffa073 !important"
            type="submit"
            >Sign in</v-btn
          >
        </v-form>
        <v-snackbar v-model="showErrorAlert">
          Email or Password is wrong

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="showErrorAlert = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
      <div class="or my-7">-OR-</div>
      <v-btn text width="106%" elevation="2" class="text-center">
        <v-icon color="primary">mdi-google</v-icon>
        <span class="ml-3">Sign in with Google</span>
      </v-btn>
      <div class="text-center mt-10">
        Don't have an account?
        <router-link to="/register"> Register Now </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      showErrorAlert: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async handleLoginForm() {
      let fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
      await axios.post("http://localhost:8000/api/login", fd).then((res) => {
        if (res.status == 203) {
          this.showErrorAlert = true;
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
          this.$store.dispatch("setLoggedIn", true);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style scoped>
.login-container {
  background-color: #f3f1f1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 75px 75px;
  border-radius: 25px;
  max-width: 500px;
}
a {
  text-decoration: none;
}
.or::before {
  background-color: black;
  height: 5px;
  width: 100px !important;
}
</style>
