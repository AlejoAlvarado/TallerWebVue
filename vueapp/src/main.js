import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import vuetify from "./plugins/vuetify";
import User from "./components/User";
import Dependency from "./components/Dependency";
import Users from "./components/Users";
import Dependencies from "./components/Dependencies";
import SearchFilter from "./components/SearchFilter";
import store from "../src/store";
import { firestorePlugin } from "vuefire";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/user",
    component: User,
    alias: "/edituser",
  },
  {
    path: "/dependency",
    component: Dependency,
    alias: "/editdepenency",
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/dependencies",
    component: Dependencies,
  },
  {
    path: "/searchfilter",
    component: SearchFilter,
  },
];

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(firestorePlugin);
const router = new VueRouter({ routes });
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
