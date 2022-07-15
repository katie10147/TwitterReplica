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
  name: "EditFreet",
  components: {
    GenericForm,
  },
  props: {
    signedInUser: String,
    id: Number,
    freet: Object,
  },
  data() {
    return {
      title: "Edit Freet",
      inputs: ["content"],
      onClick: this.editFreet,
      errors: [],
      successMessage: null,
    };
  },
  created: function() {},
  computed: {
    console: () => console,
  },
  methods: {
    
    editFreet(event) {
      this.console.log(this.freet.id)
      const bodyContent = {
        id: this.freet.id,
        content: event.target.elements.content.value,
      };
      this.console.log(this.freet.id)
      axios
        .patch("freets/edit", bodyContent)
        .then((response) => {
          document.location.href="/";
          this.successMessage = response.data.message;
        })
        .catch((err) => {
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          this.resetForm(event);
          this.clearMessages();
          eventBus.$emit("refresh-freets");
        });
    },
    resetForm: function(event) {
      event.target.elements.content.value = "";
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
