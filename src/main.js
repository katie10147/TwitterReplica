import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Main from "./views/Main.vue";
import SignInPage from "./views/SignInPage.vue";
import UserSettings from "./views/UserSettings.vue";
import SignUpPage from "./views/SignUpPage.vue";
import CreateFreetPage from "./views/CreateFreet.vue";
import EditFreetPage from "./views/EditFreet.vue";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: "/", component: Main, props: true },
    { path: "/login", component: SignInPage, props: true },
    { path: "/settings", component: UserSettings, props: true },
    { path: "/signup", component: SignUpPage, props: true },
    { path: "/createfreet", component: CreateFreetPage, props: true },
    { path: "/editfreet", component: EditFreetPage, props: true },

  ],
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

