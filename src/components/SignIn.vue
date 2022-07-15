<template>
  <div>
    <GenericForm 
        v-bind:title="title" 
        v-bind:inputs="inputs" 
        v-bind:onClick="onClick"
        v-bind:errors="errors"
        v-bind:successMessage="successMessage"
        />
      <h3> Don't have an account?
      <router-link to="/signup">
        Create Account
        </router-link>
      </h3>
  </div>
</template>

<script>

import axios from "axios";
import GenericForm from "./GenericForm.vue";
import { eventBus } from '../main';

export default {
  name: "SignIn",
  components: {
      GenericForm
  },
  props: {},
  data() {
    return {
      title: 'Sign In',
      inputs: [
        'username',
        'password',
      ],
      onClick: this.signIn, 
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
    signIn(event) {
      const bodyContent = { username: event.target.elements.username.value, password: event.target.elements.password.value };
      axios.post('users/signIn', bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
            eventBus.$emit('login-success', bodyContent.username);
            document.location.href="/";
            // this.createdUsername = event.target.elements.username.value
        })
        .catch(err => {
        this.errors = [err.response.data.error];
        })
        .then(() => {
        this.resetForm();
        this.clearMessages();
        eventBus.$emit('refresh-freets');
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
