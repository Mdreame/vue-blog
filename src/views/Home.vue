<template>
	<div>
		<!-- 文章列表 -->
		<ul class="blog-container">
			<li
				class="blog-item"
				v-for="techBlog in techBlogs"
				:key="techBlog._id"
			>
				<router-link to="/home/techBlog1" :content="techBlog" :currentPath="currentPath">
				<!-- 事件放在router-link上面会失效 -->
					<h3 class="blog-title"  @click.prevent="toArticle(techBlog._id)">
						{{ techBlog.name }}
						<span>{{ techBlog.createdTime.slice(0, 10) }}</span>
					</h3>
				</router-link>
				<p class="blog-description">{{ techBlog.description }}</p>

				<!-- <router-view></router-view> -->
			</li>
		</ul>
	</div>
</template>

<script>
// import TechBlog from "./partial/TechBlog";
import axios from "axios";

export default {
	data() {
		return {
			techBlogs: [],
			currentPath: '/home'
		};
	},
	methods: {
		toArticle(blogId){
			console.log(blogId);
		this.$router.push({
			path: `${this.currentPath}/techBlog`,
			query: {blogId: blogId}
		})
			console.log(this.$router);
			console.log(this.$route);
			
			
		}
	},
	mounted() {
		axios
			.get("http://localhost:3000/blog")
			.then((res) => {
				this.techBlogs = res.data;
				// console.log(this.techBlogs);
				console.log("Home 请求数据成功");
				

				// console.log(
				// 	`收到文件${data.name}.${data.type},访问点击${data.url}`
				// );
			})
			.catch((error) => console.log(error))
			.finally(() => (this.loading = false));

	},
	components: {
		// TechBlog,
	},
};
</script>

<style lang="scss" scoped>
.blog-container {
	display: flex;
	flex-direction: column;
}
.blog-item {
	list-style: none;
	margin-bottom: 1.2rem;

	a {
		text-decoration: none;
		&:hover {
			color: #6587b1;
		}

		.blog-title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			span {
				color: rgb(170, 170, 170);
				font-size: 0.8em;
			}
		}
	}

	.blog-description {
		margin: 0.2em 0px;
		font-size: 1.4rem;
		color: rgb(85, 85, 85);
		text-align: justify;
	}
}
</style>
