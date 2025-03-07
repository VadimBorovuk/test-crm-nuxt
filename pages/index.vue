<script setup>
definePageMeta({
  middleware: 'redirect-to-main'
});

// Або просто перенаправлення без middleware
// onMounted(() => {
//   navigateTo('/main', { redirectCode: 301 });
// });
</script>

<template>
  <div></div>
</template>
