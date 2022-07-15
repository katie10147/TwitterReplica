<template>
  <div>
    <NavBar v-bind:signedInUser="signedInUser" />
    
    
    <Freet
      v-bind:key="freet.id"
      v-bind:freet="freet"
      v-bind:signedInUser="signedInUser"
      v-bind:refreet="true"
    />
    {{freet}}
    <EditFreet v-bind:signedInUser="signedInUser" v-bind:freet="freet" />
  </div>
</template>
<script>
import EditFreet from "../components/EditFreet.vue";
import NavBar from "../components/NavBar.vue";
import { eventBus } from "../main";
import Freet from "../components/Freet.vue";



export default {
  name: "EditFreetPage",
  components: {
    NavBar,
    EditFreet,
    Freet
  },
    props: {
    signedInUser: String,
  },  
  data() {
    return {
      freet: {},
    };
  },
    computed: {
    console: () => console,
  },
    created: function() {
    this.freet = {}
    eventBus.$on("edit-content", (freet) => {
        this.console.log("got it")
      this.freet = freet;
      this.console.log(this.freet)
    });
    },
};
</script>
<style scoped></style>
