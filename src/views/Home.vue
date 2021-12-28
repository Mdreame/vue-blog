<template>
	<div>
		<!-- 统计 -->
		<div class="blog-total">
			<span :class="isActive ? 'active' : ''" @click="toggle">最新</span>
			<span
				class="achrive"
				:class="isActive ? '' : 'active'"
				@click="toggle"
				>归档</span
			>
		</div>
		<!-- 文章列表 -->
		<ul v-show="isActive" class="blog-container">
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
				<p class="blog-description">{{ techBlog.description }}</p>
			</li>
		</ul>

		<ul v-show="!isActive" class="archive-blog-container">
			<li
				class="blog-item"
				v-for="techBlog in techBlogs"
				:key="techBlog.id"
			>
				<router-link :to="`/home/${techBlog.id}`">
					<h3 class="blog-title">
						<span>{{ transTime(techBlog.createdAt) }}</span>
						{{ techBlog.name }}
					</h3>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
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
			techBlogs: [],
			isActive: false,
			ArchiveDate: [],
		};
	},
	methods: {
		transTime(time) {
			return this.$moment(new Date(Number(time))).format("YYYY-MM-DD");
		},
		toggle() {
			this.isActive = !this.isActive;
		},
	},
	mounted() {
		this.$axios({
			url: `https://mdreame.life/graphql`, // 后端的接口地址
			method: "get",
			params: { query: getBlogList },
			dataType: "json",
		})
			.then((res) => {
				this.techBlogs = res.data.data.getBlogList;
				this.total =
					this.techBlogs.length > 0 ? this.techBlogs.length : 0;
			})
			.catch((error) => console.log(error));
	},
};
</script>

<style lang="scss" scoped>


.blog-total {
	margin-bottom: 2rem;
	border-bottom: 2px solid #c1c1c1;
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: 2px;
	display: flex;
	justify-content: space-between;

	span {
		cursor: pointer;
	}

	.achrive {
		float: right;
		margin-left: 4px;
	}
	.active {
		color: #21718d;
		font-weight: 600;
	}
	.active::after {
		display: block;
		position: relative;
		bottom: -2px;
		border-bottom: 2px solid #00355a;
		content: "";
	}
}
.blog-container {
	display: flex;
	flex-direction: column;
}
.blog-item {
	list-style: none;
	margin-bottom: 1.2rem;
	padding: 0 0.8rem;
	border-radius: 0.5rem;

	&:hover {
		background-color: #e7dede;
	}
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

.archive-blog-container {
	// border-left: 1px solid #999;
	.blog-item {
		margin-bottom: 0.5rem;
		position: relative;
		padding-left: 2rem;

		&:not(:last-child)::before{
			content: "";
			width: 8px;
			height: 36px;
			border-right: 1px solid #999;
			position: absolute;
			left: 0px;
			top: 50%;
			margin-top: -4px;
		}

		&::after {
			content: "";
			width: 8px;
			height: 8px;
			border-radius: 8px;
			background-color: #98a7b1;
			position: absolute;
			left: 4px;
			top: 50%;
			margin-top: -4px;
		}
		.blog-title {
			font-size: 1.6rem;
		}
	}
}
</style>
