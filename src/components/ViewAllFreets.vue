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

// import axios from "axios";
import GenericForm from "./GenericForm.vue";
import { eventBus } from '../main';

export default {
  name: "ViewAuthorFreets",
  components: {
      GenericForm
  },
  props: {},
  data() {
    return {
      title: 'View All Freets',
      inputs: [],
      onClick: this.getAllFreets, 
      errors: [],
      successMessage: null
    }
  },
  created: function() {
      this.getAllFreets();
  },
  methods: {
    getAllFreets() {
      eventBus.$emit('refresh-freets');
      // axios.get('freets/allFreets')
      //   .then((response) => {
      //       this.successMessage = response.data.message
      //       eventBus.$emit('view-all-freets', response.data);
      //   })
      //   .catch(err => {
      //   // handle error
      //   this.errors.push(err.response.data.error);
      //   })
      //   .then(() => {
      //   // always executed
      //   this.resetForm();
      //   this.clearMessages();
      //   });
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