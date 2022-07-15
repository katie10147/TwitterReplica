<template>
  <div>
    <button class="button" v-on:click="onclick()">
    <div v-if="upvote == true">
    unlike
    </div>
    <div v-else>
    like
      </div>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "LikeButton",
  components: {},
  props: {
    signedInUser: String,
    freet: Object,
    upvotedFreets: Object,
  },
  data() {
    return {
      upvote: null,
    };
  },
  created: function() {
    this.setStatus;
  },
  computed: {
    console: () => console,
  },
  methods: {
    upvoteFreet() {
      this.console.log("liked");
      const bodyContent = { username: this.signedInUser };
      axios
        .patch(`freets/upvote/${this.freet.id}`, { data: bodyContent })
        .then(() => {
          eventBus.$emit("refresh-freets");
          this.console.log("liked");
          this.setStatus()
        });
    },
    downvoteFreet() {
      const bodyContent = { username: this.signedInUser };
      axios
        .patch(`freets/downvote/${this.freet.id}`, { data: bodyContent })
        .then(() => {
          eventBus.$emit("refresh-freets");
        });
    },
    onclick() {
      this.setStatus();
      this.console.log("clicked");
      this.console.log(this.signedInUser);
      this.console.log(this.upvotedFreets);

      if (this.upvote === false) {
        this.downvoteFreet();

      } else {
        this.upvoteFreet();

      }
    },
 
  setStatus() {
      if (this.signedInUser) {
        if (this.upvotedFreets[this.freet.id]) {
          this.upvote = false;
        } else {
          this.upvote = true;
        }
      }
     },
  },
};
</script>

<style>
.button {
  background-color: deepskyblue;
  border: none;
  color: white;
  padding: 7px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
</style>
