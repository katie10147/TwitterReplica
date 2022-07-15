<template>
<div>
      <button class="button"> like</button>
       </div>

</template>

<script>

import axios from "axios";
import { eventBus } from '../main';

export default {
  name: "UpvoteFreet",
  components: {
  },
  props: {
    signedInUser: String,
    id: Number
  },
  data() {
    return {
      title: 'Upvote',
      inputs: [
      ],
      onClick: this.upvoteFreet, 
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
    upvoteFreet(event) {
      const bodyContent = {username: this.signedInUser }
      axios.patch(`freets/upvote/${this.id}`, {data: bodyContent})
        .then((response) => {
            this.successMessage = response.data.message;
        })
        .catch(err => {
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            this.clearMessages(event);
            // emit refresh freets
            eventBus.$emit('refresh-freets');
            // axios.get('freets/allFreets')
            //     .then((response) => {
            //         this.successMessage = response.data.message
            //         eventBus.$emit('view-all-freets', response.data);
            //     })
        });
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style>
.button {
  background-color: deepskyblue;
  border: none;
  color: white;
  padding: 7px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
</style>
