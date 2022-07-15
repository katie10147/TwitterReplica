<template>
  <div class="navigation">
    <div class="title">
      <router-link to="/">
        Freeter
      </router-link>
    </div>
    <div class="push">
      <div v-if="signedInUser">
        <router-link to="/createfreet">
          Create Freet
        </router-link>
      </div>
    </div>
    <div v-if="signedInUser">
      <div v-if="viewFollowFreets">
        <router-link to="/" @click.native="getAllFreets">
          View All Freets
        </router-link>
      </div>
      <div v-else>
        <router-link to="/" @click.native="getFollowFreets">
          View Folloiwng Freets
        </router-link>
      </div>
    </div>
    <div>
      <div v-if="signedInUser">
        <router-link to="/settings"> Hi {{ signedInUser }} </router-link>
      </div>
      <div v-else>
        <router-link to="/login">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "NavBar",
  props: {
    signedInUser: String,
  },
  data() {
    return {
      viewFollowFreets: false,
    };
  },
  computed: {
    console: () => console,
  },
  methods: {
    getFollowFreets() {
      axios
        .get("users/following/freets")
        .then((response) => {
          this.successMessage = response.data.message;
          this.viewFollowFreets = true;

          eventBus.$emit("view-follow-freets", response.data);
          this.console.log(this.viewFollowFreets);
        })
        .catch((err) => {
          // handle error
          this.console.log(err.response.data.error);
        });
    },
    getAllFreets() {
      axios
        .get("freets/allFreets")
        .then((response) => {
          this.successMessage = response.data.message;
          this.viewFollowFreets = false;
          this.console.log(this.viewFollowFreets);
          

          eventBus.$emit("view-all-freets", response.data);
        })
        .catch((err) => {
          this.console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.nav-icon-container {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.nav-icon-container img {
  width: inherit;
  height: inherit;
}

.title {
  font-size: 16px;
  font-weight: bold;

}
.push {
  margin-left: auto; /* added */
}

.container {
  box-sizing: border-box;
  border: 10px solid goldenrod;
  min-height: 100vh; /* height 100%*/
  flex-flow: row nowrap;
}

.navigation {
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  list-style: none;
  margin: 0;
  background: deepskyblue;
}

.navigation a {
  text-decoration: none;
  display: block;
  padding: 1em;
  color: white;
}

.navigation a:hover {
  background: #1565c0;
}

@media all and (max-width: 800px) {
  .navigation {
    justify-content: space-around;
  }
}

@media all and (max-width: 600px) {
  .navigation {
    flex-flow: column wrap;
    padding: 0;
  }
  .navigation a {
    text-align: center;
    padding: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .navigation li:last-of-type a {
    border-bottom: none;
  }
}
</style>
