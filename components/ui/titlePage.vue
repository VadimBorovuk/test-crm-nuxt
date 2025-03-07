<template>
  <client-only>
    <span class="text-[#131728] text-2xl font-bold">{{$t(title)}}</span>
  </client-only>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>

</style>
