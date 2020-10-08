// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./lib/css";
import "./lib/script";
import "./lib/global";

import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App";
import router from "./router";
import EventBus from "./lib/eventBus.js";
import axios from "axios";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$bus = EventBus;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App,
  },
});
