<template>
  <div>
    <GenericForm 
        v-bind:title="title" 
        v-bind:inputs="inputs" 
        v-bind:onClick="onClick"
        v-bind:errors="errors"
        v-bind:successMessage="successMessage"
        />
  </div>
</template>

<script>

import axios from "axios";
import { eventBus } from "../main";
import GenericForm from "./GenericForm.vue";

export default {
  name: "DeleteUser",
  components: {
      GenericForm
  },
  props: ['signedInUser'],
  data() {
    return {
      title: 'Delete User',
      inputs: [
      ], 
      onClick: this.deleteUser, 
      errors: [],
      successMessage: null
    }
  },
  created: function() {
  },
  methods: {
    deleteUser() {
      axios.delete(`users/${this.signedInUser}`)
        .then((response) => {
            this.successMessage = response.data.message
            eventBus.$emit("delete-user-success");
        })
        .catch(err => {
        // handle error
        this.errors.push(err.response.data.error);
        })
        .then(() => {
        // always executed
        this.clearMessages();
        eventBus.$emit("refresh-freets");
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
