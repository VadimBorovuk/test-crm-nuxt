<template>
  <client-only>
    <div>
      <!-- Заголовок сторінки -->
      <div class="flex justify-between items-center">
        <title-page :title="title"/>
        <slot name="actions"/>
      </div>
      <UDivider class="my-2"/>
      <div class="bg-white w-100 rounded-lg p-4 mt-4">
        <!-- Фільтр -->
        <slot name="filter"/>

        <UDivider class="my-6"/>

        <!-- Таблиця -->
        <slot name="table"/>

        <UDivider class="mb-6"/>

        <!-- Пагінація -->
        <slot name="pagination"/>

      </div>
      <slot name="modals"/>
    </div>
  </client-only>
</template>

<script setup>
import TitlePage from "~/components/ui/titlePage.vue";

defineProps({
  title: String
});
</script>

