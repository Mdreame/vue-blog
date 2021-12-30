<template>
	<ul class="tag-list">
		<router-link to="/alltags" class="alltags">所有标签</router-link>
		<li
			v-for="(tag, value) in tags"
			:key="value"
            @click="toSameTag(tag, value)"
			class="tag-item"
		>
			<router-link :to="`/alltags/${value}`">
				<span>{{ value }}</span>
			</router-link>
		</li>
	</ul>
</template>

<script>
export default {
	data() {
		return {
			tags: [],
		};
	},
	props: ["allTags"],
	methods: {
		updateData(newValue) {
            console.log("收到数据", newValue);
            
			console.log("开始更新");
			this.tags = newValue;
		},
        toSameTag(sameTagObjs , tagName){
            this.$bus.$emit("checkSameTag",sameTagObjs ,tagName)
            
        }
	},
	created() {
		console.log("Tag.vue created");
		this.$bus.$on("deliver", this.updateData);
	},
	mounted() {
		console.log("Tag.vue mounted", this.$store.state.allTagObjs);
	},
};
</script>

<style lang="scss">
.tag-list {
	margin: 5rem 0 1.5rem;
	padding: 0;
	border-top: 1px dashed rgb(140, 127, 127);

	.tag-item {
		cursor: pointer;
		// border-bottom: 1px dashed rgba(0, 53, 90, 0.611764705882353);
		outline: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		display: inline-block;
		list-style: none;

		span {
			display: inline-block;
			background-color: rgba(255, 255, 255, 0.5);
			color: rgb(26, 55, 67);
			font-size: 0.875em;
			line-height: 1.1em;
			margin: 0px 0.55em 1em 0px;
			padding: 0.4em 0.5em;
			border-bottom: 2px solid rgb(150, 170, 197);
			box-shadow: rgb(143 154 171 / 33%) 2px 1px 1px 0px;

			&:hover {
				cursor: pointer;
				color: rgb(255, 255, 255);
				background-color: rgb(150, 170, 197);
			}
		}
	}
	.alltags {
		float: right;
		font-size: 0.875em;
		line-height: 1.1em;
		margin: 1px 0px 0px;
		padding: 0.4em 0.5em 6px;
		border-bottom: 2px solid rgb(150, 170, 197);
		color: rgb(255, 255, 255);
		background-color: rgb(150, 170, 197);
		box-shadow: rgb(143 154 171 / 33%) 0px 1px 1px 0px;

		&:hover {
			cursor: pointer;
			color: rgb(150, 170, 197);
			background-color: rgb(255, 255, 255);
		}
	}

	a {
		text-decoration: none;
	}
}
</style>
