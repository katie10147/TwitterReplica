<template>
  <div>
    <div v-if="signedInUser === freet.author"></div>
      <div v-else>
        
        <div v-if="canFollow">
          <button class="button" v-on:click="unfollowUser()">
            unfollow
            </button>
        </div>
        <div v-else>
          <button class="button" v-on:click="followUser()">
            follow
            </button>
        </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "FollowButton",
  components: {},
  props: {
    signedInUser: String,
    freet: Object,
    followedUsers: Array,
  },
  data() {
    return {
      canFollow: null,
    };
  },
  created: function() {
    this.setStatus;
  },
  computed: {
    console: () => console,
  },
  methods: {
    followUser() {
      axios.post('users/follow/'+ this.freet.author)
        .then((response) => {
          this.console.log(response)
        })
        .catch(err => {
          this.console.log(err)
        })
        .then(() => {
            this.setStatus();
            eventBus.$emit('refresh-freets');
        });
    },
    unfollowUser() {
      axios.post('users/unfollow/'+ this.freet.author)
        .then((response) => {
          this.console.log(response)
        })
        .catch(err => {
          this.console.log(err)
        })
        .then(() => {
            this.setStatus();
            eventBus.$emit('refresh-freets');
        });
    },
    setStatus() {
      this.console.log(this.freet.author)
    if (this.followedUsers.includes(this.freet.author)) {
          this.canFollow = false;
        } else {
          this.canFollow = true;
        }
      }
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
