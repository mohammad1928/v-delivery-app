<template>
  <v-container>
    <!--    <OrderComponent v-for="order in myOrders" :order="order" :key="order.id" />-->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"># Order ID</th>
            <th class="text-left">Total Bill</th>
            <th class="text-left">Date & Time</th>
            <th>Status</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in myOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td class="red--text">{{ order.total }} $</td>
            <td>
              {{
                new Date().getFullYear(order.created_at) +
                "-" +
                new Date().getMonth(order.created_at) +
                "-" +
                new Date().getDay(order.created_at) +
                "  " +
                (new Date(order.created_at).getHours() % 12) +
                ":" +
                new Date(order.created_at).getMinutes() +
                ":" +
                new Date(order.created_at).getSeconds()
              }}
            </td>
            <td>
              {{ order.order_status }}
            </td>
            <td>
              <v-btn color="primary" @click.stop="showOrderDetails(order)"
                >Show Details</v-btn
              >
              <v-btn
                color="orange"
                class="ml-3"
                :to="'/map/' + order.lat + '/' + order.lng"
                >Show On The Map</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">
          {{ "Order Items" }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left"># Item ID</th>
                  <th class="text-left">Item Name</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td class="primary--text">{{ item.meal.name }} $</td>
                  <td>{{ item.quantity }}</td>
                  <td class="red--text">{{ item.meal.price }} $</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
// import OrderComponent from "@/components/OrderComponent";
// import Pusher from "pusher-js";
export default {
  name: "MyOrders",
  components: {
    // OrderComponent,
  },
  data() {
    return {
      dialog: false,
      order: [],
    };
  },
  mounted() {
    // let pusher = new Pusher("103c12c17ab1a12e15b6", {
    //   encrypted: true,
    //   cluster: "ap2",
    // });
    // let channel = pusher.subscribe("worker-" + localStorage.getItem("user_id"));
    // channel.bind("worker-selected", () => {
    //   alert("I received an event");
    // });
  },
  computed: {
    myOrders() {
      return this.$store.state.myOrders;
    },
  },
  async created() {
    await this.$store.dispatch("getMyOrders", localStorage.getItem("user_id"));
  },
  methods: {
    showOrderDetails(order) {
      this.dialog = true;
      this.order = order;
      console.log(order);
    },
  },
};
</script>
<style scoped></style>
