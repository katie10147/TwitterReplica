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
  name: "ChangeUsername",
  components: {
      GenericForm
  },
  props: {
    signedInUser: String
  },
  data() {
    return {
      title: 'Change Username',
      inputs: [
          "username"
      ],
      onClick: this.changeUsername, 
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
    changeUsername(event) {
      const bodyContent = { username: event.target.elements.username.value }
      axios.patch(`users/${this.signedInUser}`, bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
            eventBus.$emit("username-change", bodyContent.username);
        })
        .catch(err => {
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            this.resetForm(event);
            this.clearMessages();
            eventBus.$emit('refresh-freets');
        });
    },
    resetForm: function(event) {
      event.target.elements.username.value = '';
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
