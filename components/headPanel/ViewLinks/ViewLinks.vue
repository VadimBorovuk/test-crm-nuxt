<template>
  <ul class="flex items-center gap-2">
    <li v-for="(route,idx) in routes" :key="idx">
      <NuxtLink :to="route.path" active-class="text-atlantis-500 font-bold">
        {{ $t(route.name) }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const routes = reactive([
  {
    name: 'Home',
    path: '/main'
  },
  {
    name: 't.accounts',
    path: '/account/123'
  },
  {
    name: 'Calendar',
    path: '/calendar'
  }]
)
</script>

<style lang="scss" scoped>

</style>
