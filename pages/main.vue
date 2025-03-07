<template>
  <client-only>
    <title-page title="t.settings.main"/>
    <span>
        {{ userData.role }}
        {{userData.user_info.id}}
        {{userData.user_info.name}}
      </span>
  </client-only>
</template>

<script setup>
import TitlePage from "~/components/ui/titlePage.vue";

useHead({
  title: "Home page"
})
import { useUserStore } from "~/stores/userStore.js";
const userStore = useUserStore()
const {userData} = userStore
</script>

<style lang="scss" scoped>

</style>
