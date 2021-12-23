import VueRouter from "vue-router";
import Home from "../views/Home";
import About from "../views/About";
import Life from "../views/Life";
import Book from "../views/Book";
import Movie from "../views/Movie";
import Music from "../views/Music";
import TechBlog from "../views/partial/TechBlog";

export default new VueRouter({
	routes: [
		{
			path: "/",
			redirect: "/home",
		},
		{
			path: "/home",
			component: Home,
			
		},
		{
			path: "/about",
			component: About,
		},
		{
			path: "/life",
			component: Life,
		},
		{
			path: "/book",
			component: Book,
		},
		{
			path: "/movie",
			component: Movie,
		},
		{
			path: "/music",
			component: Music,
		},
		{
			path: "/home/techBlog",
			component: TechBlog,
		}
	],
});
