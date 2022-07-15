<template>
  <div>
    <NavBar v-bind:signedInUser="signedInUser" />
    <CreateFreet v-bind:signedInUser="signedInUser" />
  </div>
</template>
<script>
import CreateFreet from "../components/CreateFreet.vue";
import NavBar from "../components/NavBar.vue";

export default {
  name: "CreateFreetPage",
  components: {
    CreateFreet,
    NavBar,
  },
  props: ["signedInUser", "freets"],
};
</script>
<style scoped></style>
