<template>
	 <div>
      <app-heading></app-heading>
	  <p>Ini halaman user</p>
    </div>
</template>

<script>
import PageHeading from '@/components/PageHeading/index.vue'
export default {
  components:{
    'app-heading': PageHeading
  }
}
</script>
