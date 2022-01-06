<template>
	<section>
		<app-header></app-header>
		<div class="d-flex">
			<app-sidebar></app-sidebar>
			<div class="content p-4">
				<transition name="home">
					<Nuxt />
				</transition>
			</div>
		</div>
		<app-footer></app-footer>
	</section>
</template>
<style>
.home-enter-active,
.home-leave-active {
	transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
	opacity: 0;
}
</style>
<script>
import Header from '@/components/partial/Header.vue'
import Sidebar from '@/components/partial/Sidebar.vue'
import Footer from '@/components/partial/Footer.vue'
export default {
	transition: {
		name: 'home',
		mode: 'out-in',
		appear: true,
	},
	components: {
		'app-header': Header,
		'app-sidebar': Sidebar,
		'app-footer': Footer,
	},
}
</script>
