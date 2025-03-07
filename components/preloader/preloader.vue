<template>
  <div class="preloader" :class="{ hidden: !$preloader.loader.value }">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
const { $preloader } = useNuxtApp()
</script>

