script
<template>
	<div>
		<h2 class="title">All Tags</h2>
		<Tag></Tag>
	</div>
</template>

<script>
import Tag from "./partial/Tag";
import { mapState } from "vuex";
export default {
	data() {
		return {
			tags: [],
		};
	},

	components: { Tag },
	computed: {
		...mapState(["allTagObjs"]),
	},
	created() {
		console.log("alltag.vue created");
	},
	updated() {
		console.log("updated");
		
		this.$bus.$emit("deliver", this.tags);
		this.tags = this.allTagObjs;
	},

	mounted() {
		this.tags = this.allTagObjs;
		console.log("AllTag.vue mounted");
		console.log("this.tags", this.tags);
		this.$bus.$emit("deliver", this.tags);
	},
	activated() {
		console.log("activated");
		this.$bus.$emit("deliver", this.tags);
		
		// this.tags = this.allTagObjs;
	},
};
</script>

<style lang="scss" scoped>
.title {
	font-weight: 600;
	color: rgb(78, 110, 111);
}
ul {
	margin-top: 1.2rem;
}
</style>
