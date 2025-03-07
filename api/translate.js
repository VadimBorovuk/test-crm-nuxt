import {useNuxtApp} from '#app';

export function useApiTranslate() {
  const config = useRuntimeConfig();
  const {$service} = useNuxtApp();
  const transGetByLang = (lang) => {
    return $service({
      url: `/api/translate-by-lang/${lang}/${config.public.CLIENT_APP_ID}`,
      method: 'get'
    });
  };

  const langGet = () => {
    return $service({
      url: '/api/lang',
      method: 'get'
    })
  }

  const transGetList = (page, params) => {
    return $service({
      url: `/api/translate/list`,
      method: 'get',
      params: {page, ...params}
    })
  }
  const transCreate = (data) => {
    return $service({
      url: '/api/translate/create',
      method: 'post',
      data: data
    })
  }

  return {
    transGetByLang,
    transGetList,
    langGet,
    transCreate
  }
}
