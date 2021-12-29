<template>
	<div>
		<h1>我的“阅历”</h1>
		<ul>
			<li v-for="book in books" :key="book.id">
				<div>
					<router-link :to="`/book/${book.id}`"
						><img
							:src="book.coverUrl"
							:alt="book.name"
							:title="book.name"
					/></router-link>
					<div class="book-info">
						<router-link :to="`/book/${book.id}`"
							><h4>
								{{ book.name }}
							</h4>
						</router-link>
						<p class="author">{{ book.author.name }}</p>
						<p class="book-category">{{ book.classify }}</p>
					</div>
				</div>
				<div>
					{{ book.comment }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from "vuex";
// import { mapAction} from "vuex";

export default {
	name: "BookList",
	computed: {
		...mapState(["books"]),
	},
	mounted() {
		console.log("Booklist.vue from store:", this.books);
	},
};
</script>

<style lang="scss" scoped>
// @import "../../style/global.scss";
h1 {
	border-bottom: 2px solid rgba(26, 55, 67, 0.98);
	font-size: 2rem;
	margin: 1em 0.5em 2.5em;
	color: #52768f;
	letter-spacing: 2px;
	text-align: center;
}

ul {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 200px));
	list-style: none;
	column-gap: 5%;
	justify-content: center;

	li {
		display: list-item;
		height: 280px;
		width: 200px;
		margin: 0 3% 40px;
		position: relative;

		&::after {
			counter-increment: singerImgNum 1;
			content: counter(singerImgNum);
			display: block;
			width: 2rem;
			height: 2rem;
			line-height: 2rem;
			text-align: center;
			border-radius: 50%;
			background-color: rgb(255, 255, 255);
			position: absolute;
			top: -1rem;
			left: -1rem;
			z-index: 1;
		}

		> div:last-child {
			position: absolute;
			top: 150px;
			margin: 1.5em 0 1em;
			font-size: 1.4rem;
			color: rgba(97, 89, 89, 0.91);
			text-align: justify;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
		}

		> div:first-child > a {
			display: inline-block;
			width: 100px;
			height: 150px;

			// 图书封面
			img {
				max-width: 100px;
				box-shadow: rgb(170 170 170 / 53%) 6px 8px 8px 2px;
			}
		}

		// 图书信息
		.book-info {
			display: inline-block;
			text-align: left;
			width: 50%;
			position: absolute;
			margin: 3% 0px 0px 10%;
			padding: 0px 0px 1% 1%;
			overflow: hidden;

			a {
				text-decoration: none;

				h4 {
					font-size: 1.6rem;
					font-weight: 300;
					padding: 0px;
					color: rgb(26, 55, 67);

					&:hover {
						color: rgb(145, 157, 165);
					}
				}
			}

			.author {
				color: rgb(85, 85, 85);
				font-size: 1rem;
			}

			.book-category {
				display: inline-block;
				font-size: 0.8rem;
				line-height: 1.75;
				padding: 0px 0.4em;
				border-radius: 0.4em;
				background-color: #ffcc99;
			}

			// 分类背景色
			/* 国学 */
			.tagColor-gx {
				background-color: #cccccc;
			}
			/* 文学小说 */
			.tagColor-wx {
				background-color: #ffcc99;
			}
			/* 人文社科 */
			.tagColor-rw {
				background-color: #ffff99;
			}
			/* 哲学宗教 */
			.tagColor-zx {
				background-color: #99cc99;
			}
			/* 历史传记 */
			.tagColor-ls {
				background-color: #666666;
			}
			/* 学习工具 */
			.tagColor-xi {
				background-color: #ff6666c2;
				color: #383535c7;
			}
			/* 生活休闲 */
			.tagColor-sh {
				background-color: #33cc33;
			}
			/* 文化艺术 */
			.tagColor-wy {
				background-color: #99ccff;
			}
			/* 计算机与互联网 */
			.tagColor-web {
				background-color: #ff9933;
			}
			/* 科学科普 */
			.tagColor-soci {
				background-color: #336699;
			}
			/* 畅销励志 */
			.tagColor-lz {
				background-color: #cc99cc;
			}
			/* 心理 */
			.tagColor-xl {
				background-color: #006bf1bf;
				color: aliceblue;
			}
		}
	}
}
</style>
