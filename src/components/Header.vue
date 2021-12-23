<template>
	<header>
		<router-link class="nav-link" to="/home">💻</router-link>
		<router-link class="nav-link" to="/about">余</router-link>
		<router-link class="nav-link" to="/life">生</router-link>
		<router-link class="nav-link" to="/book">書</router-link>
		<router-link class="nav-link" to="/movie">影</router-link>
		<router-link class="nav-link" to="/music">音</router-link>
	</header>
</template>

<script>
export default {
	name: 'Header',
	computed: {
	},
};
</script>

<style>
header {
	height: calc(100% - 5px);
	width: 16%;
	min-width: 60px;
	max-width: 80px;
	/* background-color: #ccc; */
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	padding: 3rem 0;
	bottom: 0px;
	border-right: 1px solid rgb(228, 219, 219);
}
.nav-link {
	display: inline-block;
	color: #444;
	flex-basis: 60px;
	font-size: 2.5rem;
	font-weight: lighter;
	text-decoration: none;
}

.nav-link:hover {
	color: rgb(179, 179, 179);
}
</style>
