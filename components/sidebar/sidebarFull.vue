<template>
  <aside class="w-[260px] min-h-screen bg-white px-4">
    <HeadPanel/>
    <SidebarLinks
        :menuItems="menuItems"
        :isOpen="isOpen"
        @toggleSubMenu="toggleSubMenu"
        @activeParentLink="activeParentLink"
    />
  </aside>
</template>

<script setup>
import {ref} from 'vue';
import HeadPanel from "~/components/headPanel/headPanel.vue";
import SidebarLinks from "~/components/sidebar/sidebarLinks.vue";

const {$permission} = useNuxtApp();
const {userData} = useUserStore()

const menuItems = ref([
  {
    label: 'Home',
    to: '/main',
    action: true,
    icon: 'material-symbols-light:house-rounded',
  },
  {
    label: 't.nav.settings',
    action: $permission.canAction(userData.access, 'route.link.settings'),
    icon: 'material-symbols-light:settings-rounded',
    children: [
      {
        label: 'Administration',
        to: '/settings/administration',
        action: true,
      },
      {
        label: 'Translations',
        to: '/settings/translations',
        action: true,
      },
    ],
  },
]);

const openSubMenus = ref([]);

const activeParentLink = () =>{
  openSubMenus.value = []
}
const toggleSubMenu = (index) => {
  if (openSubMenus.value.includes(index)) {
    openSubMenus.value = openSubMenus.value.filter(i => i !== index);
  } else {
    openSubMenus.value.push(index);
  }
};

const isOpen = (index) => {
  return openSubMenus.value.includes(index);
};
</script>
