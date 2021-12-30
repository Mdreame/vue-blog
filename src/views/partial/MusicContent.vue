<template>
	<div class="container">
		<div class="player">
			<button
				class="player-btn"
				:class="isPlay ? '' : 'stop-btn'"
				@click="togglePlayer"
			></button>

			<span
				class="cover-outline"
				:style="`background-image: url(${musicContent.albumnCover});`"
			></span>
			<img
				:src="musicContent.albumnCover"
				:alt="musicContent.name"
				:class="isPlay ? '' : 'rotate-infinite'"
			/>

			<span class="player-tick" :class="isPlay ? 'isPlay' : ''"></span>
			<audio ref="player" :src="musicContent.url"></audio>
		</div>
		<span class="player-desk"></span>
		<div class="albumn-detail">
			<h4 class="albumn-name">{{ musicContent.name }}</h4>
			<p class="albumn-info">
				歌手：{{ musicContent.singer }}
				&nbsp;&nbsp;&nbsp;&nbsp;发布时间：
				{{ transTime(musicContent.publishedAt) }}
			</p>
			<p class="comment">
				<span>推荐单曲：{{ musicContent.single }}</span
				><br />
				{{ musicContent.comment }}
			</p>
		</div>
		<div>相关</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			isPlay: true,
			musicContent: {},
		};
	},
	computed: {
		...mapState(["musics"]),
	},
	methods: {
		togglePlayer() {
			if (this.isPlay) {
				setTimeout(() => {
					this.$refs.player.play();
				}, 500);
				this.isPlay = false;
			} else {
				setTimeout(() => {
					this.$refs.player.pause();
				}, 500);
				this.isPlay = true;
			}
		},
		transTime(time) {
			return this.$moment(new Date(Number(time))).format("YYYY-MM-DD");
		},
		reloadMusic(music){
			console.log("reload music");
			console.log(music);
			
			this.musicContent = music;
		}
	},
	created() {
		this.$bus.$on('reloadMusicContent', this.reloadMusic)
	},
	mounted() {
		console.log("music mounted");
		console.log('this.musics', this.musics);
		
		

		//获取数据
		this.musics.forEach((music) => {
			if (music.id == this.$attrs.id) {
				this.musicContent = music;
				//缓存
	console.log(this.musicContent.id);
	
				localStorage.setItem(
					this.$attrs.id,
					JSON.stringify(this.musicContent)
				);
			}
		});
		
		if (!this.musicContent.id ) {
			this.musicContent = localStorage.getItem(this.$attrs.id);
		}
	},
};
</script>

<style lang="scss">
.container {
	max-width: 600px;
	margin: 0 auto;
	padding: 0 1rem;
	.player {
		position: relative;
		height: 200px;
		width: var(--albumnContainerWidth);
		margin: 0px auto;

		.player-btn {
			background-image: url(https://assets.mdreame.life/musicplay.png);
			background-size: cover;
			content: "";
			position: absolute;
			border: none;
			outline: none;
			background-color: transparent;
			bottom: 56px;
			left: calc(
				var(--albumnContainerWidth) / 2 - var(--albumnCDWidth) / 4 -
					16px - 24px
			);
			width: 48px;
			height: 48px;
			z-index: 3;
		}
		.stop-btn {
			background-image: url(https://assets.mdreame.life/musicstop.png);
		}
		.cover-outline {
			position: absolute;
			left: calc(
				(
						var(--albumnContainerWidth) - var(--albumnCoverWidth) -
							(var(--albumnCDWidth) / 2)
					) / 2 - 16px
			);
			bottom: 0px;
			width: 160px;
			height: 160px;
			background-color: #d5c9c9;
			box-shadow: rgb(0 0 0 / 40%) 4px 3px 3px -3px;
			padding: 10px;
			background-size: cover;
			background-origin: content-box;
			background-repeat: no-repeat;

			&::before {
				content: "";
				width: 80px;
				height: 1px;
				position: absolute;
				bottom: 0px;
				left: 0px;
				box-shadow: rgb(0 0 0 / 60%) 2px -2px 4px 1px,
					rgb(0 0 0 / 53%) -21px -18px 20px 5px,
					rgb(0 0 0 / 60%) -11px -9px 11px 2px;
				z-index: -1;
			}

			&::after {
				content: "";
				width: 80px;
				height: 1px;
				position: absolute;
				bottom: 0px;
				right: 0px;
				box-shadow: rgb(0 0 0 / 33%) 60px -5px 7px 1px,
					rgb(0 0 0 / 13%) 65px -10px 10px 3px,
					rgb(0 0 0 / 53%) 79px -10px 15px 3px,
					rgb(0 0 0 / 60%) 35px -6px 10px 4px,
					rgb(0 0 0 / 27%) 13px -6px 7px 5px;
				z-index: -1;
			}
		}

		img {
			border-radius: 50%;
			position: absolute;
			bottom: 48px;
			width: var(--albumnCDWidth);
			height: var(--albumnCDWidth);
			left: calc(
				var(--albumnContainerWidth) / 2 + var(--albumnCoverWidth) / 2 -
					var(--albumnCDWidth) * 3 / 4 - 16px
			);
			box-shadow: rgb(0 0 0) 0px 0px 0px 7px,
				rgb(27 26 26) 0px 0px 1px 46px;
			z-index: -1;
			animation: 16s linear 0.5s infinite normal none paused playMusic;
		}

		.player-tick {
			background-image: url(https://assets.mdreame.life/player-pin.png);
			position: absolute;
			background-size: contain;
			background-repeat: no-repeat;
			right: -10px;
			top: 20px;
			display: block;
			width: 50px;
			height: 80px;
			transform: rotateZ(45deg);
			transform-origin: 14px 14px;
			transition: all 0.8s ease 0s;
		}
		.isPlay {
			transform: rotateZ(0deg);
		}

		@keyframes playMusic {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		.rotate-infinite {
			animation: 16s linear 0.5s infinite normal none running playMusic;
		}
	}

	.player-desk {
		display: block;
		width: 300px;
		height: 12px;
		background: rgb(228, 225, 222);
		margin: 0.75rem auto 0.5rem;
		position: relative;
		border-radius: 0.5rem;

		&::after {
			content: "";
			width: 66px;
			height: 1px;
			box-shadow: rgb(0 0 0 / 60%) 5px 1px 12px 2px,
				rgb(0 0 0 / 33%) 72px 2px 10px 2px,
				rgb(0 0 0 / 40%) 141px 4px 13px 2px,
				rgb(0 0 0 / 53%) 211px 2px 14px 3px;
			position: absolute;
			bottom: 0px;
			z-index: -1;
		}
	}

	.albumn-detail {
		padding: 0.5rem;
		margin: 6rem 0 2rem;
		font-size: 1.4rem;

		.albumn-name {
			font-size: 2.2rem;
			font-weight: 600;
			color: rgb(78, 110, 111);
			margin-bottom: 1rem;
		}

		.comment {
			margin: 3rem 0;
		}
	}
}
</style>
