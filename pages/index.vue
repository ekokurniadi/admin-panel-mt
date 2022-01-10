<template>
  <div>
	  Welcome
  </div>
</template>
<style>
body {
	background-image: none;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
<script>
export default {
  middleware: 'auth',
  layout: 'default',
  name: 'IndexPage',
}
</script>
