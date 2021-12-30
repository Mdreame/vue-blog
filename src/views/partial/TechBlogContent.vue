<template>
	<div v-cloak>
		<h1 class="title">{{ blog.name }}</h1>
		<p class="title-detail" v-cloak>
			<span
				>分类：<span class="category">{{ blog.category }}</span></span
			><span class="createdAt">{{ transTime(blog.createdAt) }}</span>
		</p>
		<div class="markdown-body">
			<VueMarkdown :source="blog.blogContent"></VueMarkdown>
		</div>
	</div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import "../../style/markdown.scss";

export default {
	name: "TechBlog",
	components: { VueMarkdown },
	data() {
		return {
			blog: {
				id: "",
				name: "",
				category: "",
				description: "",
				createdAt: "",
				blogContent: "",
			},
		};
	},
	methods: {
		getBlogById(id) {
			this.$axios({
				url: `https://mdreame.life/graphql`, // 后端的接口地址
				method: "get",
				params: {
					query: `{
						getBlog(_id: "${id}"){
							id
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

					this.blog.id = result.id;
					this.blog.name = result.name;
					this.blog.description = result.description;
					this.blog.category = result.category;
					this.blog.createdAt = result.createdAt;
					this.blog.blogContent = result.content;

					localStorage.setItem(
						this.blog.id,
						JSON.stringify(this.blog)
					);
				})
				.catch((error) => console.log(error))
				.finally(() => (this.loading = false));
		},
		transTime(time) {
			return this.$moment(new Date(Number(time))).format(
				"YYYY-MM-DD HH:MM"
			);
		},
	},
	mounted() {
		let cacheStore = localStorage.getItem(this.$attrs.id);
		if (cacheStore) {
			this.blog = JSON.parse(cacheStore);
		} else {
		
			this.getBlogById(this.$attrs.id);
		}
	},
};
</script>

<style lang="scss" scoped>
[v-cloak] {
	display: none !important;
}

.title {
	font-size: 3rem;
	margin: 0 0 0.5rem;
}
.title-detail {
	display: flex;
	justify-content: space-between;
	font-size: 1.4rem;
	margin-bottom: 2rem;
}
.createdAt {
	color: rgb(160, 147, 147);
	font-style: italic;
}
.category {
	background-color: #fff;
}
</style>
