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
  name: "FollowUser",
  components: {
      GenericForm
  },
  props: {},
  data() {
    return {
      title: 'Follow User',
      inputs: [
        'user'
      ],
      onClick: this.followUser, 
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
    followUser(event) {
      const userName = event.target.elements.user.value;
      if (userName === undefined || userName === '') {
        this.errors.push('You must enter a user name');
        setInterval(() => {
          this.errors = [];
        }, 5000);
        return;
      }
      axios.post('users/follow/' + userName)
        .then((response) => {
            this.successMessage = response.data.message
            eventBus.$emit('follow-user', response.data);
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
    clearMessages: function(event) {
      event.target.elements.user.value = '';
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style></style>