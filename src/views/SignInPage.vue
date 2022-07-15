<template>
    <div>
        <NavBar />
        <h1> Welcome back! </h1>
        <SignIn /> 
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue"
import SignIn from "../components/SignIn.vue"


export default {
  name: "SignInPage",
  components: {
      NavBar,
      SignIn
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