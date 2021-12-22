<template>
	<div id="app">
		<!-- 侧边栏 -->
		<Header :class="toggle ? 'show' : 'hide'"> </Header>
		<main class="showScrollBar" :class="toggle ? '' : 'normal-body'">
			<!-- 页面组件 -->
			<router-view :info="info"></router-view>
		</main>
		<button class="toggle-btn" @click="toggle = !toggle">
			<svg
				t="1611836175556"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="20623"
				width="16"
				height="16"
			>
				<path
					d="M950.857143 768l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286zm0-292.571429l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286zm0-292.571429l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286z"
					p-id="20624"
					fill="#cdcdcd"
				></path>
			</svg>
		</button>
	</div>
</template>

<script>
import Header from "./components/Header";
import axios from "axios";

export default {
	name: "App",
	data() {
		return {
			toggle: false,
			info: null,
			loading: true,
			errored: false,
		};
	},

	components: {
		Header,
	},
	mounted() {
		console.log("axios...");

		axios
			.get("http://localhost:3000/hi")
			.then((res) => {
				let data = res.data[0];
				console.log(
					`收到文件${data.name}.${data.type},访问点击${data.url}`
				);
			})
			.catch((error) => console.log(error))
			.finally(() => (this.loading = false));
	},
};
</script>

<style lang="scss">
/* body::after {
  position: absolute;
  top: 0;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  opacity: 0.1;
  bottom: 0;
  z-index: -1;
} */
#app {
	min-width: 360px;
	font-size: 16px;
	font-family: Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC,
		Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	padding: 2rem 0;
}
main {
	padding: 4rem 4rem 5rem 12rem;
	margin: 0 auto;
	transition: all 0.6s ease 0s;
}

.toggle-btn {
	display: block;
	outline: none;
	border: none;
	cursor: pointer;
}
.toggle-btn svg {
	position: fixed;
	left: -4px;
	bottom: 8%;
	z-index: 2;
	background-color: rgb(47, 43, 43);
	color: rgb(255, 255, 255);
	width: 30px;
	border-radius: 0% 50px 50px 0%;
	height: 32px;
	padding: 8px;
}

.hide {
	left: -16%;
	transition: all 0.6s ease 0s;
}
.show {
	left: 0;
	transition: all 0.6s ease 0s;
}
.normal-body {
	padding: 4rem;
	left: 0;
}
</style>
