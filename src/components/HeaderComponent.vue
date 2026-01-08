<template>
  <header>
    <nav class="nav-header">
      <router-link to="/">
        <img alt="logo" src="../assets/img_logo_dtt@3x.png">
      </router-link>
      <router-link to="/" :class="{ 'router-link-active': isHome }">Houses</router-link>
      <router-link to="/about" :class="{ 'router-link-active': isAbout }">About</router-link>
    </nav>
  </header>
</template>
  
<script setup>
  import { useActivePage } from '@/composables/useActivePage';

  const { isHome, isAbout } = useActivePage();
</script>
  