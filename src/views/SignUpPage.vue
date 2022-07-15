<template>
    <div>
        <NavBar />
        <h1> Join us! </h1>
        <CreateUser /> 
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue"
import CreateUser from "../components/CreateUser.vue"


export default {
  name: "SignInPage",
  components: {
      NavBar,
      CreateUser
  },
  data() {
    return {
    };
  },
  created: function() {
  },
  computed: {
    console: () => console,
  },
  methods: {
  },
};
</script>
<style scoped>
</style>