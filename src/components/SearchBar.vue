<template>
  <div>
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="search-box">
      <input class="form-control" id="author" placeholder="Author" />
      <button class="btn btn-outline-success" type="button" v-on:click="getFreetsByAuthor">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { eventBus } from '../main';

export default {
  name: "SearchBar",
  data() {
      return {
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
      const authorName = document.getElementById('author').value;
      if (authorName === undefined || authorName === '') {
        this.errors.push('You must enter an author name');
        setInterval(() => {
          this.errors = [];
        }, 5000);
        return;
      }
      this.console.log(authorName)
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

<style scoped>
header {
  padding: 20px;
}
.search-box {
  display: flex;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
}
.search-box.form-control {
  width: 100%;
  border: 0;
  height: 36px;
  padding: 0 10px;
  outline: 5px;
}
.search-box.btn {
  background: #fff;
  border: 1px solid #000;
  height: 36px;
  padding: 10px;
  margin-right: 10px;
  border: 0;
  cursor: pointer;
  outline: 0;
}
</style>
