<template>
	<div>
		<h2 class="tag-header">
			<span># {{ tagName }}</span
			><span>See <router-link to="/alltags">All Tags</router-link></span>
		</h2>
		<ul>
			<li v-for="item in objs" :key="item.id" class="tagObjItem">
				<span class="category" :class="whichClass(item.category)">{{
					item.category
				}}</span>
				<a
					:to="`/${item.category}/${item.name}`"
					@click="toContentPage(item)"
				>
					{{ item.name }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tagName: "",
			objs: [],
		};
	},
	methods: {
		showSameTag(sameTagObjs, tagName) {
			console.log("received objs", sameTagObjs, tagName);
			this.tagName = tagName;
			this.objs = sameTagObjs;
		},
		toContentPage(item) {
			let component;
			if (item.category) {
				let contentTemplate = item.category.toLowerCase();
				switch (contentTemplate) {
					case "book":
						component = "book";
						break;
					case "tech":
						component = "blog";
						break;
					case "movie":
						component = "movie";
						break;
					case "music":
						component = "music";
						break;
					case "essay":
						component = "essay";
						break;
					default:
						component = "home";
						break;
				}
			}
			this.$router.push({
				name: component,
				params: {
					id: item.id,
					name: item.name,
				},
			});

			console.log("item.id",item.id);
		},
		whichClass(category) {
			let tagClassName = category ? category.toLowerCase() : "default";
			switch (tagClassName) {
				case "essay":
					return "essay";
				case "tech":
					return "tech";
				case "book":
					return "book";
				case "movie":
					return "movie";
				case "music":
					return "music";
				default:
					return "default";
			}
		},
	},
	created() {
		console.log("sameTagObjs created");
		this.$bus.$on("checkSameTag", this.showSameTag);
	},
	mounted() {
		console.log("sameTagObjs mounted, this.$attrs.tag", this.$attrs.tag);
		this.tagName = this.$attrs.tag;
		this.objs = this.$store.state.cache[this.$attrs.tag];
		this.$store.state.cache = {};
	},
	beforeDestroy() {
		this.$bus.$off("checkSameTag");
		console.log("beforeDestroy===>", this.objs, this.tagName);
		this.$store.state.cache[this.tagName] = this.objs;
		console.log("cache===>", this.$store.state.cache);
	},
};
</script>

<style lang="scss" scoped>
.tag-header {
	display: flex;
	justify-content: space-between;
	font-size: 2rem;
	font-weight: 600;
	padding-bottom: 2rem;

	span {
		display: inline-block;
		color: rgb(78, 110, 111);

		& > a {
			color: rgb(234, 141, 95);
			text-decoration: none;
		}
	}
}

ul {
	.tagObjItem {
		display: inline-block;
		list-style: none;
		position: relative;
		margin: 0.5rem 1rem 0px 0px;
		padding: 0.5rem 0.5rem 0.5rem 1.75rem;
		border-radius: 0.125rem;
		height: 36px;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.48);
		box-shadow: rgb(46 41 51 / 8%) 0px 1px 2px,
			rgb(71 63 79 / 8%) 0px 2px 4px;

		&:hover {
			background-color: #aaa5;
		}

		span {
			position: absolute;
			transform: rotate(-90deg) translate(-0.5em, 0px);
			height: 1.25rem;
			transform-origin: left top;
			line-height: 1.4rem;
			left: 0px;
			font-size: 0.75rem;
			bottom: calc(-0.75rem - 2px);
			text-align: center;
			width: 3.6rem;
		}

		a {
			font-weight: 300;
			font-size: 1.6rem;
			position: relative;
			top: -1px;
			margin: 0px;
			color: #545858;
			text-decoration: none;
			display: block;
			cursor: pointer;
		}

		.essay {
			color: #f5f2f0;
			background-color: #ff7260;
		}

		.tech {
			color: #f5f2f0;
			background-color: #505050;
		}

		.book {
			color: #f5f2f0;
			background-color: #6abe83;
		}

		.movie {
			color: #f5f2f0;
			background-color: #4695d6;
		}

		.music {
			color: rgb(247 244 244);
			background-color: #ff9933;
		}

		.default {
			color: #fff;
			background-color: rgb(162 174 185);
		}
	}
}
</style>
