// 初始化样式
import "normalize.css";
import "./style/global.scss"

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueRouter);

new Vue({
	el: "#app",
	render: (h) => h(App),
	router: router,
});
