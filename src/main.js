// 初始化样式
import "normalize.css";
import "./style/global.scss"
import 'github-markdown-css/github-markdown.css'

import Vue from "vue";
import store from "./store/"
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import moment from "moment";
import axios from "axios"



Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios
// Axios.defaults.baseURL = '/graphql'
// Axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(VueRouter);


new Vue({
	el: "#app",
	render: (h) => h(App),
	router: router,
	store,
});
