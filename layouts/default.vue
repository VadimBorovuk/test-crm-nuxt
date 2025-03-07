<template>
  <Preloader/>
  <Notivue v-slot="item" position="top-right">
    <Notification :item="item"/>
  </Notivue>
  <main class="h-full">
    <div class="page-holder h-full flex">
      <SidebarFull/>
      <div class="flex-1 p-5">
        <NuxtPage/>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>
