<template>
	<div id="app">
		<!-- 侧边栏 -->
		<Header :class="toggle ? 'show' : 'hide'"> </Header>
		<main class="showScrollBar" :class="toggle ? '' : 'normal-body'">
			<!-- 页面组件 -->
			<!-- 保证页面不重新刷新 -->
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</main>
		<button v-show="isShow" class="btn-backtop" @click="toTop">
			<svg
				t="1640231003357"
				class="icon"
				viewBox="0 0 1824 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="3643"
				width="32"
				height="32"
			>
				<path
					d="M0 911.607042 911.607042 0l911.607042 911.607042-112.392958 112.392958L911.607042 224.901647 112.392958 1024 0 911.607042z"
					p-id="3644"
					fill="#e6e6e6"
				></path>
			</svg>
		</button>
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

export default {
	name: "App",
	components: { Header },
	data() {
		return {
			toggle: false,
			info: null,
			loading: true,
			errored: false,
			topOffset: 0,
			isShow: false,
		};
	},
	methods: {
		//屏幕超出200显示回到顶部按钮
		showToTopBtn() {
			this.topOffset =
				document.body.scrollTop ||
				document.documentElement.scrollTop ||
				0;
			if (this.topOffset > 400) {
				this.isShow = true;
			} else {
				this.isShow = false;
			}
		},
		// 回到顶部
		toTop() {
			document.body.scrollTo({ top: 0, behavior: "smooth" });
		},
	},
	created() {
		console.log("app created");
		this.$store.dispatch("deliverBooks");
		this.$store.dispatch("deliverTechBlogs");
		this.$store.dispatch("deliverMusics");
	},
	mounted() {
		console.log("app mounted");
		//超出设定高度显示回到顶部按钮，加上true才有用
		window.addEventListener("scroll", this.showToTopBtn, true);

		this.$bus.$emit("deliver", this.$store.state.allTagObjs);
		this.$bus.$emit("reloadMusicContent", this.$store.state.musics);

	},
};
</script>

<style lang="scss">
#app {
	min-width: 360px;
	font-size: 16px;
	font-family: Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC,
		Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	padding: 2rem 0;
}
main {
	padding: 2rem 4rem 5rem 12rem;
	margin: 0 auto;
	max-width: 1024px;
	transition: all 0.6s ease 0s;
}
@mixin btn {
	display: block;
	outline: none;
	border: none;
	cursor: pointer;
}
@mixin btn-svg {
	position: fixed;
	left: -4px;
	z-index: 2;
	background-color: rgb(47, 43, 43);
	color: rgb(255, 255, 255);
	width: 30px;
	border-radius: 0% 50px 50px 0%;
	height: 32px;
	padding: 8px;
}

.toggle-btn {
	@include btn;

	svg {
		@include btn-svg;
		bottom: 8%;
	}
}

.btn-backtop {
	@include btn;

	svg {
		@include btn-svg;
		bottom: 14%;
	}
}

.hide {
	left: -80px;
	transition: all 0.6s ease 0s;
}
.show {
	left: 0;
	transition: all 0.6s ease 0s;
}
.normal-body {
	padding: 2rem 4rem 4rem 4rem;
	left: 0;
}
</style>
