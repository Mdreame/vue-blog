<template>
	<div>
		<h2>
			<span># {{ tag }}</span
			><Span
				>See
				<router-link to="/alltags/:tag">All Tags</router-link></Span
			>
		</h2>
		<ul>
			<li>
				<span class="category"></span>
				<router-link>
					{{ tag }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
h2{
    display:flex;
    justify-content: space-between;

    span{
        display:inline-block;
    }
}
</style>
