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
  name: "CreateFreet",
  components: {
      GenericForm
  },
  props: {
    signedInUser: String
  },
  data() {
    return {
      title: 'Create Freet',
      inputs: [
          "content"
      ],
      onClick: this.createFreet, 
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
    createFreet(event) {

      const bodyContent = { 
        username: this.signedInUser, 
        content: event.target.elements.content.value, 
        upvotes: 0, 
        refreeter: null,
        freetId: null,
        }
      axios.post('freets/create', bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
            document.location.href="/";

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
      event.target.elements.content.value = '';
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
