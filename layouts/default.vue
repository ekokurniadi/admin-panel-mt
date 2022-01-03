<template>
  <div id="wrapper">
    <app-sidebar></app-sidebar>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <app-navigation></app-navigation>
        <div class="container-fluid">
          <Nuxt/>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Layout/Navigation.vue'
import SideBar from '@/components/Layout/SideBar.vue'
import Footer from '@/components/Layout/Footer.vue'
export default {
  components: {
    'app-navigation': Navigation,
    'app-sidebar': SideBar,
    'app-footer': Footer,
  },
}
</script>
