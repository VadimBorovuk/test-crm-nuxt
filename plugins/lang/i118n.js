import { useLangStore } from '~/stores/langStore';

export default defineNuxtPlugin((nuxtApp) => {
      const i18n = nuxtApp.$i18n;
      const langStore = useLangStore();

      // Завантажуємо мову з куки або за замовчуванням
      langStore.loadMessages(langStore.locale, i18n); // Передаємо i18n
});
