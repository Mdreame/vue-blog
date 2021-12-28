<template>
	<div>
		<!-- 统计 -->
		<div class="blog-total">
			<!-- Posts - {{ this.total }} -->
			最新
			<span class="achrive">归档</span>
		</div>
		<!-- 文章列表 -->
		<ul class="blog-container">
			<li
				class="blog-item"
				v-for="techBlog in techBlogs"
				:key="techBlog.id"
			>
				<router-link :to="`/home/${techBlog.id}`">
					<!-- 事件放在router-link上面会失效 -->
					<!-- <h3
						class="blog-title"
						@click.prevent="toArticle(techBlog._id)"
					> -->
					<h3 class="blog-title">
						{{ techBlog.name }}
						<span>{{ transTime(techBlog.createdAt) }}</span>
					</h3>
				</router-link>

				<!-- <div>{{ getBookList }}</div> -->
				<p class="blog-description">{{ techBlog.description }}</p>
			</li>
		</ul>
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
// import axios from "axios";
// import gql from "graphql-tag";

// import TechBlogList from "./partial/TechBlogList.vue";

const getBlogList = `{
	getBlogList{
    	id
	  	name
    	description
    	createdAt
	}
}`;

export default {
	data() {
		return {
			total: 0,
			time: "",
			techBlogs: [],
		};
	},

	// apollo: {
	// 	getBookList: gql`
	// 		{
	// 			getBookList {
	// 				name
	// 			}
	// 		}
	// 	`
	// },
	methods: {
		// toArticle(blogId) {
		// 	console.log(blogId);
		// 	this.$router.push({
		// 		path: `${this.currentPath}/techBlog`,
		// 		query: { blogId: blogId },
		// 	});
		// 	console.log(this.$router);
		// 	console.log(this.$route);
		// },
		tolog(a) {
			console.log(a);
		},
		transTime(time) {
			return this.$moment(new Date(Number(time))).format("YYYY-MM-DD");
		},
	},
	mounted() {
		this.$axios({
			url: `http://localhost:9000/graphql/`, // 后端的接口地址
			method: "get",
			params: {
				query: getBlogList,
			},
			dataType: "json",
		})
			.then((res) => {
				console.log(
					"data:",
					res.data.data,
					"type",
					typeof res.data.data
				);
				this.techBlogs = res.data.data.getBlogList;
				console.log("请求成功：", this.techBlogs);

				this.total =
					this.techBlogs.length > 0 ? this.techBlogs.length : 0;
				// console.log(this.techBlogs);
			})
			.catch((error) => console.log(error))
			.finally(() => (this.loading = false));

		console.log(this.$moment);
	},
};
</script>

<style lang="scss" scoped>
.blog-total {
	margin-bottom: 2rem;
	border-bottom: 1px solid rgb(145, 137, 137);
	font-weight: 500;
	// border-right: 2px solid rgb(145, 137, 137,0.5);
	padding: 0 4px;
	line-height: 1.5;
	letter-spacing: 2px;

	.achrive {
		float: right;
		color: #21718d;
		// border-left: 2px solid rgb(145, 137, 137,0.5);
		margin-left: 4px;
	}
}
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
