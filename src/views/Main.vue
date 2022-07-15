<template>
  <div>
    <NavBar
      v-bind:signedInUser="signedInUser"
      v-bind:viewFollowFreets="viewFollowFreets"
    />
    <div v-if="freets.length">
      <title>Fritter</title>
      <div>
        <SearchBar />
        <Container>
          <div v-for="freet in freets" v-bind:key="freet.id">
            <div v-if="freet.refreeter">
              <Refreet
                v-bind:key="freet.id"
                v-bind:author="author"
                v-bind:freet="freet"
                v-bind:signedInUser="signedInUser"
              />
            </div>
            <div v-else>
              <Freet
                v-bind:key="freet.id"
                v-bind:freet="freet"
                v-bind:signedInUser="signedInUser"
                v-bind:refreet="false"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
    <div v-else>
      <div v-if="signedInUser">
      <div v-if="viewFollowFreets">
        <h1> 
        Follow a user to view freets! 
        </h1>
      </div>
      <div v-else>
        <h1>
          Currently, we have no freets to display.
          <router-link to="/createfreet">
            Create a freet
          </router-link>

          to begin
        </h1>
      </div>

      </div>
      <div v-else>
        <h1>
          Currently, we have no freets to display.
          <router-link to="/login">
            Sign in
          </router-link>
          to begin
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import Container from "../components/Container.vue";
import Refreet from "../components/Refreet.vue";

import Freet from "../components/Freet.vue";

import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "Main",
  components: {
    Container,
    Refreet,
    Freet,
    NavBar,
    SearchBar,
  },
  props: {
    signedInUser: String,
    freets: Array,
    freet: Object
  },
  
  data() {
    return {
      viewFollowFreets: false,
    };
  },
  created: function() {
    this.refreshFreets();
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
      this.viewFollowFreets = true;
      
    });
    eventBus.$on("view-all-freets", (freets) => {
      this.freets = freets;
      this.viewFollowFreets = false;
    });
  },
  computed: {
    console: () => console,
  },
  methods: {
    refreshFreets() {
      axios
        .get("freets/allFreets")
        .then((response) => {
          this.freets = response.data.reverse();
        })
        .catch((err) => {
          this.console.log(err);
        });
    },
  },
};
</script>

<style scoped>
main {
  color: #647C90;
  height:100%;
}
</style>
