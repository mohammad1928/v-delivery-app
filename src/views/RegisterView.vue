<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="mb-5">User Regiser</h1>
      <p class="text-center mb-10" style="max-width: 300px">
        Hey, Enter your details to create your own account
      </p>
      <v-row>
        <v-form
          @submit.prevent="handleRegister"
          style="width: 400px !important"
        >
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="First Name"
                placeholder="Enter your first name"
                outlined
                dense
                v-model="user.first_name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Last Name"
                placeholder="Enter your Last Name"
                outlined
                dense
                v-model="user.last_name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email"
                placeholder="Enter your email"
                outlined
                dense
                v-model="user.email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Password"
                placeholder="Enter your password"
                outlined
                dense
                type="password"
                class="mb-1"
                v-model="user.password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Confirm Password"
                placeholder="Enter your password again"
                outlined
                dense
                type="password"
                class="mb-1"
                v-model="user.password_confirmation"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            color="error"
            class="mt-7 black--text"
            width="100%"
            style="background-color: #ffa073 !important"
            type="submit"
            >Register</v-btn
          >
        </v-form>
      </v-row>
      <div class="or my-7">-OR-</div>
      <v-btn text width="106%" elevation="2" class="text-center">
        <v-icon color="primary">mdi-google</v-icon>
        <span class="ml-3">Register with Google</span>
      </v-btn>
      <div class="text-center mt-10">
        Already have an account?
        <router-link to="/login"> Sign in Now </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    handleRegister() {
      axios
        .post("http://localhost:8000/api/register", this.user)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user.id);
          this.$store.dispatch("setLoggedIn", true);
          this.$router.push("/");
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
  padding: 25px 75px;
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
.col {
  margin-bottom: -21px;
}
</style>
