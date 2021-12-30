<template>
	<div v-cloak>
		<h3 class="title">
			{{ book.name
			}}<span class="createdAt">{{ transTime(book.createdAt) }}</span>
		</h3>
		<p class="comment">{{ book.comment }}</p>
		<div class="cover">
			<img :src="book.coverUrl" :alt="book.name" /><span
				class="extract"
				>{{ book.extract }}</span
			>
		</div>
		<!-- <Tag :tags="tags"></Tag> -->
		<Tag></Tag>

		<div class="markdown-body">
			<VueMarkdown
				:source="book.bookContent"
				class="bookContent"
			></VueMarkdown>
		</div>
	</div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import "../../style/markdown.scss";
import Tag from "./Tag";

export default {
	name: "BookContent",
	components: { VueMarkdown, Tag },
	data() {
		return {
			book: {
				id: "",
				name: "",
				category: "",
				comment: "",
				extract: "",
				coverUrl: "",
				tags: {},
				createdAt: "",
				bookContent: "",
			},
		};
	},
	methods: {
		getBookById(id) {
			this.$axios({
				url: `http://localhost:9000/graphql`, // 后端的接口地址
				method: "get",
				params: {
					query: `{
						getBook(_id: "${id}"){
							id
                            name
                            extract
                            comment
                            content
                            createdAt
                            tags
                            coverUrl
				        }
				    }`,
				},
				dataType: "json",
			})
				.then((res) => {
					let result = res.data.data.getBook;

					this.book.id = result.id;
					this.book.name = result.name;
					this.book.category = result.category;
					this.book.comment = result.comment;
					this.book.extract = result.extract;
					this.book.coverUrl = result.coverUrl;
					this.book.createdAt = result.createdAt;
					this.book.bookContent = result.content;

					this.book.tags = {};
					result.tags.forEach((item) => {
						let tagItem = this.$store.state.allTagObjs[item];
						if (tagItem) {
							this.book.tags[item] = tagItem;
						}
					});
					//本地存储
					// localStorage.setItem(
					// 	this.book.id,
					// 	JSON.stringify(this.book)
					// );
					sessionStorage.setItem(
						this.book.id,
						JSON.stringify(this.book)
					);
					console.log(this.book.tags);
					this.$bus.$emit("deliver", this.book.tags);
				})
				.catch((error) => console.log(error))
				.finally(() => (this.loading = false));
		},
		transTime(time) {
			return this.$moment(new Date(time)).format("YYYY-MM-DD HH:MM");
		},
	},
	mounted() {
		// let localStore = localStorage.getItem(this.$attrs.id);
		let localStore = sessionStorage.getItem(this.$attrs.id);
		if (localStore) {
			console.log("读取缓存");
			this.book = JSON.parse(localStore);
			this.$bus.$emit("deliver", this.book.tags);
		} else {
			this.getBookById(this.$attrs.id);
		}
	},
};
</script>

<style lang="scss" scoped>
[v-cloak] {
	display: none !important;
}

.title {
	border-bottom: 1px dashed rgb(140, 127, 127);
	vertical-align: middle;
	padding: 0.5rem 0px;
	line-height: 1.2;
}
.title-detail {
	display: flex;
	justify-content: space-between;
	font-size: 1.4rem;
	margin-bottom: 2rem;
}
.createdAt {
	float: right;
	font-size: 0.75em;
	padding: 0.5em 0px 0px;
	color: rgb(160, 147, 147);
	font-style: italic;
}
.comment {
	margin: 2rem 0 3rem;
	text-indent: 3.2rem;
}

.cover {
	position: relative;
	min-height: 360px;
	max-width: 500px;
	margin: 0px auto;

	img {
		position: absolute;
		min-height: 250px;
		width: 80%;
		max-height: 350px;
		max-width: 250px;
		clip: rect(0px, 250px, 236px, 15px);
		right: 15px;
		z-index: -1;
		@media (min-width: 720px) {
			top: 15%;
			left: -10%;
			max-width: 200px;
			max-height: 300px;
			clip: unset;
		}
	}

	.extract {
		display: block;
		background-color: rgba(228, 223, 223, 0.61);
		font-size: 1.4rem;
		padding: 2rem 2rem 2rem;
		backdrop-filter: blur(5px);
		border-radius: 0.5rem;
		float: left;
		margin: 180px 30px 20px 10px;
		width: 85%;

		&::before {
			content: "“";
			font-size: 6rem;
			font-family: san-serif, auto;
			float: left;
			display: block;
			line-height: 1;
			margin: -10px 15px -30px -10px;
			padding: 0px;
		}

		@media (min-width: 720px) {
			float: right;
			width: 70%;
			margin: 20px -70px 0px 0px;
		}
	}
}
</style>
