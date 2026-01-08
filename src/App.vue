<template>
  <!-- Header is visible only for large screens -->
  <Header />
  <!-- Here is the content of the page:-->
  <router-view />
  <!-- Footer is visible only for small screens -->
  <Footer />
</template>

<script setup>
import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
</script>
