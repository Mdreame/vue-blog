import VueRouter from "vue-router";
import Home from "../views/Home";
import About from "../views/About";
import Life from "../views/Life";
import Book from "../views/Book";
import Movie from "../views/Movie";
import Music from "../views/Music";
import TechBlogContent from "../views/partial/TechBlogContent";
import BookContent from "../views/partial/BookContent";
import AllTags from "../views/AllTags";

export default new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: "/home/",
		},
		{
			path: "/home",
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
			component: TechBlogContent,
			props: true,
			meta: {
				keepAlive: false,
			},
		},
		{
			path: "/book/:id",
			component: BookContent,
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
	],
});
