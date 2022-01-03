<template>
	<div>
		<app-heading></app-heading>
		<modal-logout></modal-logout>
	</div>
</template>

<script>
import PageHeading from '@/components/PageHeading/index.vue'
import ModalLogout from '@/components/Modal/logout.vue'
export default {
	components: {
		'app-heading': PageHeading,
		'modal-logout': ModalLogout,
	},
}
</script>


