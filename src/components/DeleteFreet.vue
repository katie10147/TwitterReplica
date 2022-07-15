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
  name: "DeleteFreet",
  components: {
    GenericForm,
  },
  props: {
    signedInUser: String,
    id: Number,
  },
  data() {
    return {
      title: "Delete Freet",
      inputs: [],
      onClick: this.deleteFreet,
      errors: [],
      successMessage: null,
    };
  },
  created: function() {},
  computed: {
    console: () => console,
  },
  methods: {
    deleteFreet(event) {
      // const bodyContent = { id: this.id };
      axios
        .delete(`freets/${this.id}`)
        .then((response) => {
          this.successMessage = response.data.message;
        })
        .catch((err) => {
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          this.clearMessages(event);
          eventBus.$emit("refresh-freets");
        });
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    },
  },
};
</script>

<style></style>
