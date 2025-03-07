<template>
  <UPagination
      size="xl"
      :model-value="page"
      :page-count="pageCount"
      :total="total"
      :active-button="{
      class: 'text-white bg-whiteLilac-700 hover:bg-whiteLilac-600'
    }"
      :inactive-button="{ color: 'gray' }"
      @update:model-value="updatePage"
  />
</template>

<script setup>

defineProps({
  pageCount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(["update:page"])

const updatePage = (newPage) => {
  emit("update:page", newPage)
}

</script>
