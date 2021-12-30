import VueRouter from "vue-router";
import Home from "../views/Home";
import About from "../views/About";
import Life from "../views/Life";
import Book from "../views/Book";
import Movie from "../views/Movie";
import Music from "../views/Music";
import TechBlogContent from "../views/partial/TechBlogContent";
import BookContent from "../views/partial/BookContent";
import MusicContent from "../views/partial/MusicContent";
import AllTags from "../views/AllTags";
import SameTag from "../views/partial/SameTag";

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: "/home/",
		},
		{
			path: "/home",
			name: 'home',
			component: Home,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/about",
			component: About,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/life",
			component: Life,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/book",
			component: Book,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/movie",
			component: Movie,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/music",
			component: Music,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/home/:id",
			name: 'blog',
			component: TechBlogContent,
			props: true,
			meta: {
				keepAlive: false,
			},
		},
		{
			path: "/book/:id",
			name: "book",
			component: BookContent,
			// 会直接挂到Vue实例属性，即$attrs上
			props: true,
			meta: {
				keepAlive: false,
			},
		},
		{
			path: "/music/:id",
			name: "music",
			component: MusicContent,
			// 会直接挂到Vue实例属性，即$attrs上
			props: true,
			meta: {
				keepAlive: false,
			},
		},
		{
			path: "/alltags",
			component: AllTags,
			meta: {
				keepAlive: true,
			},
		},
		{
			path: "/alltags/:tag",
			component: SameTag,
			props: true,
			meta: {
				keepAlive: false,
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	console.log("路由守卫", to, from);
	if (to.meta.isAuth) {
		if (localStorage.getItem("school") === "some") {
			next();
		} else {
			alert("err");
		}
	} else {
		next();
	}
});
export default router;
