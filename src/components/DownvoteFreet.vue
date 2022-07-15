<template>
    <GenericForm 
        v-bind:title="title" 
        v-bind:inputs="inputs" 
        v-bind:onClick="onClick"
        v-bind:errors="errors"
        v-bind:successMessage="successMessage"
        />
</template>

<script>

import axios from "axios";
import { eventBus } from '../main';
import GenericForm from "./GenericForm.vue";

export default {
  name: "DownvoteFreet",
  components: {
      GenericForm
  },
  props: {
    signedInUser: String,
    id: Number
  },
  data() {
    return {
      title: 'Downvote',
      inputs: [
      ],
      onClick: this.downvoteFreet, 
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
    downvoteFreet(event) {
      const bodyContent = {username: this.signedInUser }
      axios.patch(`freets/downvote/${this.id}`, {data: bodyContent})
        .then((response) => {
            this.successMessage = response.data.message;
        })
        .catch(err => {
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            this.clearMessages(event);
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
