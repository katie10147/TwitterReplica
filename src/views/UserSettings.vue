<template>
  <div>
    <NavBar v-bind:signedInUser="signedInUser"/>
    <h1>User Settings</h1>
    <ChangeUsername v-bind:signedInUser="signedInUser" />
    <ChangePassword v-bind:signedInUser="signedInUser" />
    <DeleteUser v-bind:signedInUser="signedInUser" />
    <SignOut />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SignOut from "../components/SignOut.vue";
import ChangeUsername from "../components/ChangeUsername.vue";
import ChangePassword from "../components/ChangePassword.vue";

export default {
  name: "SignInPage",
  props: ["signedInUser"],
  components: {
    NavBar,
    SignOut,
    ChangeUsername,
    ChangePassword,
  },
  data() {
    return {};
  },
  created: function() {},
  computed: {
    console: () => console,
  },
  methods: {},
};
</script>
<style scoped></style>
