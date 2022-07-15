<template>
  <div>
    <div v-if="!this.refreetedFreets[freet.id]">
      <div
        v-if="signedInUser !== freet.refreeter && signedInUser !== freet.author"
      >
    <button class="button" v-on:click="refreet()">
        refreet
    </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "RefreetButton",
  components: {},
  props: {
    signedInUser: String,
    freet: Object,
    refreetedFreets: Object,
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
    refreet() {

      const bodyContent = { 
        username: this.freet.author,
        content: this.freet.content,
        refreeter: this.signedInUser,
        upvotes: this.freet.upvotes,
        freetId: this.freet.id
        };
      axios.post('freets/create', bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
        })
        .catch(err => {
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            eventBus.$emit('refresh-freets');
        });
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
