import {defineStore} from 'pinia'
import {useApiTranslate} from "~/api/translate.js";

export const useTranslateStore = defineStore('translations', () => {
  const config = useRuntimeConfig();
  const {transGetList, langGet, transCreate} = useApiTranslate();
  const languages = ref([])
  const objCreateTranslation = ref({
    lang: null,
    code: "",
    value: "",
    app_id: config.public.CLIENT_APP_ID
  })
  const translateData = ref({
    items: [],
    limit: null,
    total_items: null
  })

  const filtersTranslate = ref({
    limit: 20,
    order: 'id',
    by: 'DESC',
    app_id: config.public.CLIENT_APP_ID
  })

  const resetFieldsCreateTranslation = () => {
    objCreateTranslation.value = {
      lang: null,
      code: null,
      value: null,
      app_id: config.public.CLIENT_APP_ID
    }
  }
  const resetFilter = () => {
    filtersTranslate.value = {
      limit: 20,
      order: 'id',
      by: 'DESC',
      app_id: config.public.CLIENT_APP_ID,
      lang: null
    }
  }
  const fetchLanguages = async () => {
    try {
      const response = await langGet()
      languages.value = response.data.data

    } catch (error) {
      console.error('Помилка при отриманні інформації:', error)
      throw error
    }
  }

  const fetchTranslates = async (page, params) => {
    try {
      const response = await transGetList(page, params)

      const {items, limit, total_items} = response.data.data
      translateData.value = {items, limit, total_items}
    } catch (error) {
      console.error('Помилка при отриманні інформації:', error)
      throw error
    }
  }

  const createTranslate = async (data) => {
    try {
      const response = await transCreate(data)
      if (!response?.data?.data) throw new Error('Invalid API response format')
      return response.data.data
    } catch (error) {
      console.error('Помилка при отриманні інформації:', error)
      throw error
    }
  }

  return {
    objCreateTranslation,
    languages,
    translateData,
    filtersTranslate,
    fetchLanguages,
    resetFilter,
    fetchTranslates,
    createTranslate,
    resetFieldsCreateTranslation
  }
})
