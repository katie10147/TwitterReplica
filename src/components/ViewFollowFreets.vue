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
import GenericForm from "./GenericForm.vue";
import { eventBus } from '../main';

export default {
  name: "ViewFollowFreets",
  components: {
      GenericForm
  },
  props: {},
  data() {
    return {
      title: 'View Following Freets',
      inputs: [
      ],
      onClick: this.getFollowFreets, 
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
    getFollowFreets(event) {
      axios.get('users/following/freets')
        .then((response) => {
            this.successMessage = response.data.message
            eventBus.$emit('view-follow-freets', response.data);
        })
        .catch(err => {
        // handle error
        this.errors.push(err.response.data.error);
        })
        .then(() => {
        // always executed
        this.resetForm();
        this.clearMessages(event);
        });
    },
    resetForm: function() {
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