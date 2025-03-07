import {defineStore} from 'pinia'
import {useGenerateRoute} from "~/api/route.js";

export const useRouteGenerateStore = defineStore('generateRoute', () => {
  const {saveRoutes, getRoutes} = useGenerateRoute();

  const routers = ref([])

  const saveRoutesFunc = async (params) => {
    try {
      const response = await saveRoutes(params)
      if (!response?.data?.data) throw new Error('Invalid API response format')
      return response.data.data
    } catch (error) {
      console.error('Помилка при отриманні інформації про акаунт:', error)
      throw error
    } finally {
    }
  }


  const getRoutesFunc = async () => {

    try {
      const response = await getRoutes()
      if (!response?.data?.data) throw new Error('Invalid API response format')

      routers.value = response.data.data
    } catch (error) {
      console.error('Помилка при отриманні інформації про акаунт:', error)
      throw error
    } finally {
    }
  }

  return {
    routers,
    saveRoutesFunc,
    getRoutesFunc
  }
})
