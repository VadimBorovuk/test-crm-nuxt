<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
  </div>
</template>

<script setup>
const error = useError();

onMounted(() => {
  if (error.value.statusCode === 404) {
    navigateTo('/main');
  }
});
</script>
