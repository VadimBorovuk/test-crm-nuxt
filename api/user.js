import {useNuxtApp} from '#app';

export function useApiUser() {
  const config = useRuntimeConfig();

  const accountInfo = () => {
    return useNuxtApp().$service({
      url: `/api/manager/${localStorage.getItem('crm_id')}`,
      method: "get",
    });
  };

  const getUserInfo = () => {
    return useNuxtApp().$service({
      url: `/api/user/index/${localStorage.getItem('crm_id')}/${config.public.CLIENT_APP_ID}`,
      method: "get",
    });
  }

 return {
   accountInfo,
   getUserInfo
 }
}
