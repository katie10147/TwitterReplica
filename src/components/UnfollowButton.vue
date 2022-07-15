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
  name: "UnfollowButton",
  components: {
      GenericForm
  },
  props: {
    signedInUser: String,
    id: Number,
    user: String,
  },
  data() {
    return {
      title: 'Unfollow User',
      inputs: [
      ],
      onClick: this.unfollow, 
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
    unfollow(event) {
      axios.post('users/unfollow/'+ this.user)
        .then((response) => {
            this.successMessage = response.data.message;
        })
        .catch(err => {
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            this.clearMessages(event);
            // emit refresh freets
            eventBus.$emit('refresh-freets');
            // axios.get('freets/allFreets')
            //     .then((response) => {
            //         this.successMessage = response.data.message
            //         eventBus.$emit('view-all-freets', response.data);
            //     })
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
