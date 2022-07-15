<template>
  <div>
    <div v-if="signedInUser === freet.author">
      <div class="dropdown">
        <button class="btn" style="border-left:1px solid navy">
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a v-on:click='editContent()'>Edit Content</a>
          <a v-on:click='deleteFreet()()'>Delete Freet</a>
        </div>
      </div>
    </div>
    <div v-if="signedInUser === freet.refreeter">
          <div class="dropdown">
        <button class="btn" style="border-left:1px solid navy">
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a v-on:click='deleteFreet()()'>Delete Freet</a>
        </div>
      </div>
      </div>

  </div>
</template>

<script>
import { eventBus } from "../main";
import axios from "axios";


export default {
  name: "FreetOptionsButton",
  props: {
    signedInUser: String,
    freet: Object 
  },
  computed: {
    console: () => console,
  },
  created: function() {
    this.console.log(this.freet);
  },
  methods: {
    editContent() {
      document.location.href="/#/editfreet";
      setTimeout(() => {
        eventBus.$emit("edit-content", this.freet);
      }, 250);
      this.console.log(this.freet)
    },
    deleteFreet() {
      axios
        .delete(`freets/${this.freet.id}`)
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

<style>
.btn {
  background-color: #2196f3;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  outline: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: absolute;
  display: inline-block;
  color: deepskyblue;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.btn:hover,
.dropdown:hover .btn {
  background-color: deepskyblue;
}
</style>
