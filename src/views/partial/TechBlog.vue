<template>
	<div>
		<h1>{{ name }}</h1>
		<p>{{category}}</p>
		<p>{{description}}</p>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "TechBlog",
	props: ["content"],
	data() {
		return {
			blogId: this.$route.query.blogId,
			name: "",
			description: "",
			category: "",
			url: "",
			filetype: "",
		};
	},
	methods: {
		getBlogById(blogId) {
			axios({
				url: `http://localhost:3000/blog?id=${blogId}`, // 后端的接口地址
				method: "get",
				// params: {
				// 	//给后台传递id地址
				// 	id: blogId,
				// },
				headers: {
					"Content-Type":
						"application/x-www-form-urlencoded;charset=utf-8",
				},
				dataType: "json",
			})
				.then((res) => {
					// this.blog_data = res.data;
					// console.log("文章详情页：",this.blog_data);
					this.name = res.data.name;
					this.description = res.data.description;
					this.category = res.data.category;
				})
				.catch((error) => console.log(error))
				.finally(() => (this.loading = false));
		},
	},
	created() {
		this.getBlogById(this.blogId);
	},
};
</script>

<style></style>
