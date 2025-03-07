
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const loader = ref(false)

  const startLoadingPage = () => {
    loader.value = true
  }

  const closeLoadingPage = () => {
    loader.value = false
  }

  router.beforeEach((to, from, next) => {
    startLoadingPage();
    next();
  });

  router.afterEach(() => {
    setTimeout(() => {
      closeLoadingPage();
    }, 500); // Затримка для плавного закриття
  });

  nuxtApp.provide('preloader', {
    loader,
    startLoadingPage,
    closeLoadingPage
  })
});

