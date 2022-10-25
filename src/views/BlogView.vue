<template>
  <v-container class="my-10">
    <v-row
      class="rounded-lg mb-5"
      style="border: 1px solid #ddd"
      v-for="post in posts"
      :key="post.id"
    >
      <v-col cols="12" class="d-flex align-center" style="position: relative">
        <img
          src="../assets/images/kisspng-chicken-meat-chef-cartoon-chinese-new-year-of-the-rooster-food-posters-5a96c614addb90.3641362415198305487121.png"
          class="rounded-circle"
          width="75"
          height="75"
          alt=""
          style="border: 2px solid dodgerblue; padding: 5px"
        />
        <div>
          <h1 class="ml-5 primary--text">Foodies</h1>
          <span class="grey--text ml-5"
            ><v-icon class="mb-1" color="grey">mdi-clock-outline</v-icon> 13h
            ago</span
          >
        </div>
      </v-col>
      <v-col cols="12">
        <p class="px-sm-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          dolorum nobis obcaecati possimus reprehenderit! Accusamus amet,
          architecto assumenda at autem consequuntur delectus esse impedit ipsa
          iste itaque laudantium magnam minima molestiae natus nemo, nulla
          numquam possimus quam qui ratione reiciendis tempore tenetur unde vel
          vero voluptatem voluptatum! Ab accusamus ad amet, aperiam atque
          consequatur consequuntur cum cumque delectus doloribus eaque eligendi
          eos error eveniet excepturi fuga harum in labore laborum laudantium
          libero magni maiores minima modi molestiae mollitia necessitatibus
          nihil nisi non omnis placeat quae quaerat quos sit velit veniam
          voluptas! Ab debitis dolore eos laudantium molestiae quia quibusdam
          soluta.
        </p>
      </v-col>
      <v-col cols="12">
        <v-row class="justify-center px-sm-10">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="image in post.images"
            :key="image.id"
          >
            <img
              src="../assets/images/pizza.png"
              width="100%"
              height="300px"
              alt="Chicken"
              class="image"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              class="animate-button"
              @click="like(post.id)"
              :title="isLiked(post.likes) ? 'Unlike' : 'Like'"
              ><v-icon color="primary" v-if="isLiked(post.likes)">
                mdi-thumb-up
              </v-icon>
              <v-icon color="primary" v-else> mdi-thumb-up-outline </v-icon>
              <span class="ml-2">{{ post.likes.length }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "BlogVuew",
  data() {
    return {
      animate: false,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    isLiked(post_likes) {
      let bool = false;
      post_likes.forEach((like) => {
        if (bool == false && like.user.id == localStorage.getItem("user_id")) {
          bool = true;
        }
      });
      return bool;
    },
    async like(post_id) {
      let status = await this.$store.dispatch("likePost", post_id);
      if (status == 200) this.$store.dispatch("getPosts");
    },
  },
};
</script>
<style scoped>
.image {
  border: 2px solid #dddddd;
  border-radius: 10px;
  padding: 10px;
}

.animate-button:active {
  animation: shake 1s;

  /* When the animation is finished, start again */
  animation-iteration-count: 1;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
