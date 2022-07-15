<template>
  <div class="freetComponent">
    <div class="header">
      <p>{{ freet.author }}</p>
      <div v-if="!refreet">
      <p>{{ freet.upvotes }} likes</p>
    </div>

    </div>
    <div class="freetComponent">
      <p>{{ freet.content }}</p>
    </div>

    <div v-if="signedInUser && !refreet">
      <div class="footer">
        <FreetOptionsButton
          v-bind:freet="freet"
          v-bind:signedInUser="signedInUser"
          v-bind:upvotedFreets="upvotedFreets"
        />
        <FollowButton class="push"
          v-bind:freet="freet"
          v-bind:signedInUser="signedInUser"
          v-bind:followedUsers="followedUsers"
        />
        <RefreetIt
          v-bind:freet="freet"
          v-bind:signedInUser="signedInUser"
          v-bind:refreetedFreets="refreetedFreets"
        />
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
import { eventBus } from "../main";
import axios from "axios";
import FollowButton from "./FollowButton";
import FreetOptionsButton from "./FreetOptionsButton";
import LikeButton from "./LikeButton";
import RefreetIt from "./RefreetIt";

export default {
  name: "Freet",
  components: {
    FollowButton,
    FreetOptionsButton,
    LikeButton,
    RefreetIt,
  },
  props: {
    freet: Object, 
    signedInUser: String,
    refreet: Boolean
  },
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

p {
  color: black;
}
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
