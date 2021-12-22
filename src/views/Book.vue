<template>
	<div>
		<Booklist></Booklist>
	</div>
</template>

<script>
import Booklist from './partial/Booklist'
export default {
	components: {
		Booklist,
	},
	mounted(){
  console.log("book");
  
}
};
</script>

<style></style>
