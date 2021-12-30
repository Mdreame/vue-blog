<template>
	<div>
		<h1 class="banks-title">乐队</h1>
		<ul class="banks-wrap"></ul>
		<h1 class="albumn-title">专辑</h1>
		<ul class="albumn-wrap">
			<li v-for="music in musics" :key="music.id">
				<router-link :to="`/music/${music.id}`">
					<div
						class="light-container"
						:style="`background-image: url(${music.albumnCover})`"
					>
						<!-- 图片跳转 -->
						<!-- <img :src="" :alt="music.name" /> -->
						<div class="light"></div>
					</div>
				</router-link>

				<!-- 专辑名 -->
				<router-link :to="`/music/${music.id}`">
					<p class="albumn-name">{{ music.name }}</p>
				</router-link>
				<p class="singer">{{ music.singer }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "musics",
	data() {
		return {
			musicsArr: [],
		};
	},
	computed: {
		...mapState(["musics"]),
	},

	mounted() {
		console.log(this.musics);
		this.musicsArr = this.musics;
		console.log("this.musicsArr=====>", this.musicsArr);
	},
	destroyed() {
		console.log("music destroyed");
	},
};
</script>



<style lang="scss">
h1 {
	font-weight: 600;
	font-size: 2.4rem;
	color: #0d3652;
}

.albumn-wrap {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	gap: 1rem;
	grid-auto-rows: 24rem;
	justify-items: center;
	justify-content: flex-start;

	li {
		list-style: none;

		.light-container {
			position: relative;
			overflow: hidden;
			width: 12rem;
			height: 12rem;
			background-size: cover;

			.light {
				content: "";
				position: absolute;
				display: block;
				top: 0;
				left: -20rem;
				width: 20rem;
				height: 20rem;
				background-color: #aaa;
				opacity: 0.2;
				cursor: pointer;
			}

			&:hover .light {
				left: 20rem;
				transform: skew(-45deg);
				transition: left ease-in 0.2s;
			}

			img {
				max-width: 16rem;
				display: block;
			}
		}

		.albumn-name {
			margin-top: 1rem;
			font-size: 1.4rem;
			&:hover {
				color: black;
			}
		}
		.singer {
			font-size: 1.2rem;
			color: #777777;
		}
	}
}

@media screen and (max-width: 600px) {
	.albumn-wrap {
		grid-template-columns: repeat(auto-fill, minmax(1rem, 8rem));
    justify-content: space-around;
		li {
			width: 8rem;
			height: 8rem;

			.light-container {
				width: 100%;
				height: 100%;

			}
		}
	}
}
</style>
