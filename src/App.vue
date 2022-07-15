<template>
  <div id="app">
    <router-view v-bind:signedInUser="signedInUser" v-bind:freets="freets"/>
  </div>
</template>

<script>

import axios from "axios";
import { eventBus } from "./main";

export default {
  name: "app",
  components: {
  },
  data() {
    return {
      signedInUser: "",
      freets: [],
      author: "katie",
    };
  },
  created: function() {
    axios.get("/users/signedIn").then((response) => {
      this.signedInUser = response.data.username;
    });
    eventBus.$on("login-success", (username) => {
      this.signedInUser = username;
    });
    eventBus.$on("logout-success", () => {
      this.signedInUser = "";
    });
    eventBus.$on("username-change", (username) => {
      this.signedInUser = username;
    });
    eventBus.$on("view-all-freets", (freets) => {
      this.freets = freets;
    });
    eventBus.$on("view-author-freets", (freets) => {
      this.freets = freets;
    });
    eventBus.$on("delete-user-success", () => {
      this.signedInUser = "";
    });
    eventBus.$on("refresh-freets", () => {
      this.refreshFreets();
    });
    eventBus.$on("view-follow-freets", (freets) => {
      this.freets = freets;
    });
  },
  computed: {
    console: () => console,
  },
  methods: {
    openSettings() {
      this.settingsOpen = true;
    },
    closeSettings() {
      this.settingsOpen = false;
    },
    refreshFreets() {
      axios
        .get("freets/allFreets")
        .then((response) => {
          this.freets = response.data;
        })
        .catch((err) => {
          this.console.log(err);
        });
    },
  },
};
</script>

<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.success-message {
  color: green;
  margin: auto;
}
.error-message {
  color: red;
  margin: auto;
}
</style>