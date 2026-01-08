<template>
  <footer>
    <nav class="nav-footer">
      <router-link to="/" :class="{ 'router-link-exact-active': isHome }">
        <img class="btn-home" alt="btn-home">
      </router-link>
      <router-link to="/about" :class="{ 'router-link-exact-active': isAbout }">
        <img class="btn-about" alt="btn-about">
      </router-link>
    </nav>
  </footer>
</template>
  
<script setup>
  import { useActivePage } from '@/composables/useActivePage';

  const { isHome, isAbout } = useActivePage();
</script>
