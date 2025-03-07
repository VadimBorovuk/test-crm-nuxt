<template>
  <UDropdown :items="langsList"
             :popper="{ placement: 'bottom-start' }"
             :ui="{ width: 'w-[45px]' }">
    <UKbd class="bg-whiteLilac-500 text-whiteLilac-800 px-2 py-1 rounded-md"
          size="lg" :value="locale.toUpperCase()"/>
  </UDropdown>
</template>


<script setup>
import {useLangStore} from "~/stores/langStore";
import {useI18n} from 'vue-i18n'; // Додано імпорт useI18n
import {useCookie} from 'nuxt/app'; // Додано імпорт useCookie

const cc_locale = useCookie('cc_locale');
const {selectLocale, locales} = useLangStore();

// Викликаємо useI18n і зберігаємо результат у змінну i18n
const i18n = useI18n();

// Деструктуризація i18n для отримання необхідних значень
const {locale} = i18n;

const changeLang = async (value) => {
  await selectLocale(value, i18n); // Передаємо i18n
  cc_locale.value = value;
};

const langsList = computed(() => {
  return [locales.map((lang) => {

    return {
      label: lang.code.toUpperCase(),
      class: locale.value === lang.code ? 'bg-whiteLilac-900 text-white flex justify-center items-center py-1 my-2' : 'bg-white text-black py-1 flex justify-center items-center hover:bg-whiteLilac-500 my-2',
      disabled: locale.value === lang.code,
      click: (e) => {
        const localeCode = e.target.textContent.toLowerCase()
        changeLang(localeCode);
      }
    }
  })]
})
</script>

<style lang="scss">
/* Виправлення ширини випадаючого меню */
:deep(.ui-dropdown-items) {
  width: 40px !important;
  min-width: 40px !important;
  max-width: 40px !important;
  text-align: center; /* Щоб текст був рівно по центру */
}
</style>
