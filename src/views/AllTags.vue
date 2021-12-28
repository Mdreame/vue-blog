<template>
	<div>
		<h2 class="title">All Tags</h2>
		<Tag></Tag>
	</div>
</template>

<script>
import Tag from "./partial/Tag";
export default {
	components: {
		Tag,
	},
};
</script>

<style lang="scss">
.title {
	font-weight: 600;
	color: rgb(78, 110, 111);
}
ul {
	margin-top: 2rem;
}
</style>
