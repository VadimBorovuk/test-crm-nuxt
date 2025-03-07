<template>
  <client-only>
    <div class="base-modal">
      <slot name="headerModal">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ $t(titleModal) }}
          </h3>
          <UButton color="gray" variant="solid" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="emit('cancel-click')"/>
        </div>

      </slot>

      <UDivider class="my-4"/>

      <slot name="contentModal"/>

      <UDivider class="my-4"/>

      <slot name="footerModal">
        <div class="flex justify-end items-center">
          <div class="mr-3">
            <custom-btn
                @click="emit('cancel-click')"
                description="t.btn.cancel"
            />
          </div>
          <div>
            <UButton size="lg"
                     color="indigo" variant="solid"
                     type="submit">
              Submit
            </UButton>
          </div>
        </div>
      </slot>
    </div>
  </client-only>
</template>

<script setup>
import CustomBtn from "~/components/ui/customBtn.vue";
const emit = defineEmits(['cancel-click', 'save-click'])
defineProps({
  titleModal: {
    type: String,
    default: ""
  }
})
</script>
