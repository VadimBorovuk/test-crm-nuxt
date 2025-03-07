import {useNuxtApp} from '#app';

export function useGenerateRoute() {
  const config = useRuntimeConfig();
  const {$service} = useNuxtApp();

  const saveRoutes = (json) => {
    const data = {
      json
    }

    return $service({
      url: `/api/user/routessave/${config.public.CLIENT_APP_ID}`,
      method: 'post',
      data
    })
  };


  const getRoutes = () => {
    return $service({
      url: `/api/user/routesget/${config.public.CLIENT_APP_ID}`,
      method: 'get'
    })
  };

  return {
    saveRoutes,
    getRoutes
  }
}



