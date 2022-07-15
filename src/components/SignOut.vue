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
import { eventBus } from "../main";
import GenericForm from "./GenericForm.vue";

export default {
  name: "SignOut",
  components: {
      GenericForm
  },
  props: {
    signedInUser: String
  },
  data() {
    return {
      title: 'Sign Out',
      inputs: [
      ],
      onClick: this.signOut, 
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
    signOut() {
      axios.patch('users/signOut', {})
        .then((response) => {
            this.successMessage = response.data.message;
            eventBus.$emit('logout-success');
            document.location.href="/";
        })
        .catch(err => {
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            this.clearMessages();
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
