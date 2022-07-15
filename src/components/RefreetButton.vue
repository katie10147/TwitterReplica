<template>
    <GenericForm 
        v-bind:title="title" 
        v-bind:inputs="inputs" 
        v-bind:onClick="refreet"
        v-bind:errors="errors"
        v-bind:successMessage="successMessage"
        />
</template>

<script>

import axios from "axios";
import { eventBus } from '../main';
import GenericForm from "./GenericForm.vue";

export default {
  name: "RefreetButton",
  components: {
      GenericForm
  },
  props: ['signedInUser', 'freet'],
  data() {
    return {
      title: 'Refreet',
      inputs: [
      ],
      onClick: this.upvoteFreet, 
      errors: [],
      successMessage: null
    }
  },
  created: function() {
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
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style></style>
