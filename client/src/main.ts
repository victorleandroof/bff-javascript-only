import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin, ToastPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
