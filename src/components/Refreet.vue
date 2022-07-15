<template>
  <div class="freetComponent">
    <div class="header">
      <p>{{ freet.refreeter }}</p>
      <p>{{ freet.upvotes }} likes</p>
    </div>
    <Freet
      v-bind:key="freet.id"
      v-bind:freet="freet"
      v-bind:signedInUser="signedInUser"
      v-bind:refreet="true"
    />
    <div class="footer">
    <div v-if="signedInUser === freet.refreeter">
      <FreetOptionsButton
          v-bind:freet="freet"
          v-bind:signedInUser="signedInUser"
          v-bind:upvotedFreets="upvotedFreets"
        />
    </div>
    <div class="push">
        <LikeButton 
          v-bind:freet="freet"
          v-bind:signedInUser="signedInUser"
          v-bind:upvotedFreets="upvotedFreets"
        />
    </div>

    </div>

  </div>
</template>
<script>
import Freet from "./Freet.vue";
import LikeButton from "./LikeButton";
import FreetOptionsButton from "./FreetOptionsButton";
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "Refreet",
  components: {
    Freet,
    LikeButton,
    FreetOptionsButton,
  },
  props: ["freet", "author", "signedInUser"],
  data() {
    return {
      upvotedFreets: {},
      refreetedFreets: {},
      followedUsers: [],
    };
  },
  created: function() {
    this.refreshFreets;
    eventBus.$on("refresh-freets", () => {
      this.refreshFreets();
    });
  },
  computed: {
    console: () => console,
  },
  mounted: function() {},
  methods: {
    refreshFreets() {
      axios.get(`users/upvotes/user=${this.signedInUser}`).then((response) => {
        this.upvotedFreets = response.data;
      });
      if (this.signedInUser) {
        axios
          .get("users/following")
          .then((response) => {
            this.followedUsers = response.data;
          })
          .catch((err) => {
            this.console.log(err);
          });
      }
      axios
        .get(`users/refreets/user=${this.signedInUser}`)
        .then((response) => {
          this.refreetedFreets = response.data;
        })
        .catch((err) => {
          this.console.log(err);
        });
    },
  },
};
</script>

<style scoped>
div {
  border: 5;
  margin: 1%;
}
.freetComponent {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 45%px;
}

.header {
  display: flex;
  justify-content: space-between;
}
.footer {
  display: flex;
}
.push {
  margin-left: auto; /* added */
}
</style>
