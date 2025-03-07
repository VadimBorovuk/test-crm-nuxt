<template>
  <ul>
    <li v-for="(item, index) in menuItems" :key="index" class="mb-3 cursor-pointer">
      <div v-if="item.children">
        <NuxtLink
            active-class="text-whiteLilac-800 font-bold pointer"
            class="w-full flex items-center p-2 hover:bg-whiteLilac-500 rounded-md"
            :class="{ 'bg-whiteLilac-600 text-whiteLilac-800': isActiveParent(item) }"
            @click="emit('toggleSubMenu', index)"
        >
          <Icon class="mr-2" :size="25" :name="item.icon"/>
          <client-only>
            <span class="pointer">
              {{ $t(item.label) }}
            </span>
          </client-only>
          <UIcon
              :size="16"
              :name="isOpen(index) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
              class="ml-auto text-whiteLilac-900"
          />
        </NuxtLink>

        <ul v-if="isOpen(index)" class="pl-4 mt-2">
          <li v-for="(child, childIndex) in item.children" :key="childIndex">
            <NuxtLink
                active-class="text-whiteLilac-900 font-bold"
                :to="child.to"
                class="w-full flex items-center py-1 pl-6 text-md rounded-md"
                :class="$route.path !== item.to ? 'hover:bg-whiteLilac-500' :''"
            >
              {{ child.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink v-else :to="item.to"
                @click.native="activeParentLink"
                active-class="text-whiteLilac-800 font-bold bg-whiteLilac-600 rounded-md"
                class="w-full flex items-center p-2 rounded-md"
                :class="$route.path !== item.to ? 'hover:bg-whiteLilac-500' :''"
      >
        <Icon class="mr-2" :size="25" :name="item.icon" :class="{ 'text-whiteLilac-800': $route.path === item.to }"/>
        <client-only>
          {{ $t(item.label) }}
        </client-only>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import {useRoute} from 'vue-router'

const route = useRoute()

defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  isOpen: {
    type: Function,
    default: () => false
  }
})
const activeParentLink = () => {
 emit('activeParentLink')
}
const emit = defineEmits(['toggleSubMenu', 'activeParentLink'])

// Перевіряємо, чи активний один із дочірніх елементів
const isActiveParent = (item) => {
  return item.children?.some(child => child.to === route.path)
}
</script>
