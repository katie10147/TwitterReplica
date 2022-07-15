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
  name: "ViewAuthorFreets",
  components: {
      GenericForm
  },
  props: {},
  data() {
    return {
      title: 'View Freets By Author',
      inputs: [
        'author'
      ],
      onClick: this.getFreetsByAuthor, 
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
    getFreetsByAuthor(event) {
      const authorName = event.target.elements.author.value;
      if (authorName === undefined || authorName === '') {
        this.errors.push('You must enter an author name');
        setInterval(() => {
          this.errors = [];
        }, 5000);
        return;
      }
      axios.get('freets/' + authorName)
        .then((response) => {
            this.successMessage = response.data.message
            eventBus.$emit('view-author-freets', response.data);
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
      event.target.elements.author.value = '';
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style></style>