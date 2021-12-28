<template>
	<div>
		<h1>{{ name }}</h1>
		<p>{{ category }}</p>
		<p>{{ description }}</p>
		<p>{{ createdAt }}</p>
		<VueMarkdown :source="blogContent"></VueMarkdown>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
	name: "TechBlog",
	props: ["content"],
	components:{VueMarkdown},
	data() {
		return {
			name: "",
			category: "",
			description: "",
			createdAt: "",
			blogContent: ""
		};
	},
	methods: {
		getBlogById(id) {
			this.$axios({
				url: `http://localhost:9000/graphql/`, // 后端的接口地址
				method: "get",
				params: {
					query: `{
						getBlog(_id: "${id}"){
							name
							category
							description
							createdAt
							content
						}
						}`,
				},
				dataType: "json",
			})
				.then((res) => {
					// this.blog_data = res.data;
					// console.log("文章详情页：", res.data.data.getBlog);
					let result = res.data.data.getBlog;
					// console.log(result);

					this.name = result.name;
					this.description = result.description;
					this.category = result.category;
					this.createdAt = result.createdAt;
					this.blogContent = result.content;
				})
				.catch((error) => console.log(error))
				.finally(() => (this.loading = false));
		},
	},
	created() {
		// console.log("from Techblog", this.$attrs.id);
		this.getBlogById(this.$attrs.id);
		// console.log("from Techblog", this.$attrs.id);

		// console.log("created");
	},
	mounted() {
		// console.log(1);
		// this.getBlogById(this.$attrs.id)
	},
	activated() {
		// console.log("from Techblog", this.$attrs.id);
	},
};
</script>

<style></style>
