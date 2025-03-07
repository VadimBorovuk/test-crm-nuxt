import { useAuthStore } from '~/stores/authStore.js'
import { useUserStore } from '~/stores/userStore.js'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore()
  const userStore = useUserStore()

  // Перевірка токена
  if (!authStore.token || new Date().getTime() >= authStore.expiring * 1000) {
    if (process.client) {
      alert('No token or token expired!')
      window.location.href =  config.public.CLIENT_APP_PATH
    }
    return;
  }


  try {
    userStore.updateTimezone()
    await userStore.fetchUserData()
    if (!userStore.userData || !userStore.userData.access) {
      throw new Error('User data could not be loaded')
    }

    const { access, department, role } = userStore.userData

    if (department.includes('CALLCENTER') || role === 'admin') {
      const allowedRoutes = access.route.map((r) => `/${r}`)
      // Видаляємо дужки з динамічних параметрів
      const matchedPath = to.matched[0]?.path.replace(/\(\)/g, '');

      if (!allowedRoutes.includes(to.path) && !allowedRoutes.includes(matchedPath)) {
        if (role !== 'admin') {
          if (process.client) alert('403 Forbidden')
          return abortNavigation()
        }
      }
    } else {
      if (process.client) alert('No access')
      // return navigateTo('/projects')
    }
  } catch (error) {
    if (process.client) {
      alert('403 Forbidden')
      window.location.href =  config.public.CLIENT_APP_PATH
    }
    // return abortNavigation()
    // if (process.client) alert('No access')
  }
})
