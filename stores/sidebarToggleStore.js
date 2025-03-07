import {defineStore} from 'pinia';

export const useSidebarToggleStore = defineStore('sidebarToggle', () => {
  const sidebarView = ref(process.server ? '' : localStorage.getItem('kn_sidebar') || false)

  const toggleView = () => {

    sidebarView.value = !sidebarView.value
    if (process.client) {
      localStorage.setItem('kn_sidebar', sidebarView.value)
    }
  }

  return {
    sidebarView,
    toggleView
  }
});
