<template>
  <BasePage title="t.settings.translations">
    <!-- Кнопка додавання -->
    <template #actions>
      <custom-btn
          icon="ep:circle-plus"
          @click="openTranslationsModal"
          active
          description="t.settings.list.add"
      />
    </template>

    <!-- Фільтр -->
    <template #filter>
      <TranslationFilter
          @active-filter="filterList"
          @reset-filter="resetFilterList"
          :filters="translateStore.filtersTranslate"
          :languages="translateStore.languages"
      />
    </template>

    <!-- Таблиця -->

    <template #table>
      <div class="table-ui">
        <TranslationTable
            :getAccessTz="getAccessTz"
            :data="translateStore.translateData"/>
      </div>

    </template>

    <!-- Пагінація -->
    <template #pagination>
      <div class="flex justify-end w-full">
        <TranslationPagination
            v-if="translateStore.translateData.total_items !== 0"
            v-model:page="page"
            :pageCount="+translateStore.translateData.limit"
            :total="translateStore.translateData.total_items"
        />
      </div>

    </template>

<!--    prevent-close for modal-->
    <template #modals>
      <UModal v-model="isOpenCreateTranslate">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <UForm :validate="validate" :state="translateStore.objCreateTranslation" class="space-y-4" @submit="saveTranslate">

            <BaseModal
                @cancel-click="closeTranslationsModal"
                @save-click="saveTranslate"
                titleModal="t.settings.translations.add"
            >
              <template #headerModal/>

              <template #contentModal>

                <UFormGroup :label="$t('t.filter.lang')" name="lang" class="mb-3">
                  <USelect
                      size="lg"
                      v-model="translateStore.objCreateTranslation.lang"
                      :options="translateStore.languages"
                      value-attribute="code"
                      option-attribute="name"
                      :placeholder="$t('t.filter.lang')"
                  />
                </UFormGroup>

                <UFormGroup :label="$t('t.filter.code')" name="code" class="mb-3">
                  <UInput
                      v-model.trim="translateStore.objCreateTranslation.code"
                      size="lg"
                      :placeholder="$t('t.filter.code')"/>
                </UFormGroup>

                <UFormGroup :label="$t('t.filter.value')" name="value">
                  <UInput
                      v-model.trim="translateStore.objCreateTranslation.value"
                      size="lg"
                      :placeholder="$t('t.filter.value')"/>
                </UFormGroup>
              </template>
              <template #footerModal/>
            </BaseModal>
          </UForm>
        </UCard>
      </UModal>
    </template>
  </BasePage>
</template>

<script setup>

useHead({
  title: 'Translations'
})
import {onMounted, ref} from 'vue';
import CustomBtn from "~/components/ui/customBtn.vue";
import BasePage from "~/components/templates/basePage.vue";
import BaseModal from "~/components/templates/baseModal.vue";
import {useTranslateStore} from "~/stores/translateStore.js";
import TranslationFilter from "~/components/translations/translationFilter.vue";
import TranslationTable from "~/components/translations/translationTable.vue";
import TranslationPagination from "~/components/translations/translationPagination.vue";

const translateStore = useTranslateStore()
const {t} = useI18n()
const {$permission, $preloader} = useNuxtApp();
const {userData, getAccessTz} = useUserStore();

const page = ref(1);
const isOpenCreateTranslate = ref(false)

// actions
const actionAddTranslate = ref($permission.canAction(userData.access, 'route.link.settings'))

const validate = (state) => {
  const errors = []

  if (!state.lang) errors.push({path: 'lang', message: 'Required lang'})
  if (!state.code) errors.push({path: 'code', message: 'Required code'})
  if (!state.value) errors.push({path: 'value', message: 'Required value'})
  return errors
}

const openTranslationsModal = () => {
  isOpenCreateTranslate.value = true;
  translateStore.resetFieldsCreateTranslation()
}
const closeTranslationsModal = () => {
  isOpenCreateTranslate.value = false;
}

const filterList = async () => {
  await getTranslates()
}

const resetFilterList = () => {
  translateStore.resetFilter()
  page.value = 1
  getTranslates(page)
}

const getTranslates = async (page) => {
  $preloader.startLoadingPage()
  try {
    await translateStore.fetchTranslates(page, translateStore.filtersTranslate)
  } catch (e) {

  } finally {
    $preloader.closeLoadingPage()
  }
}

const getLanguages = async () => {
  try {
    await translateStore.fetchLanguages()
  } catch (e) {
  }
}

const saveTranslate = async () => {
  try {
    await translateStore.createTranslate(translateStore.objCreateTranslation)
    await getTranslates(1)
    isOpenCreateTranslate.value = false;
    push.success({
      title: t('t.success.save.translates'),
      duration: 2000,
      position: 'top-right'
    })
  } catch (e) {
    push.error({
      title: t('t.error.save.translation'),
      duration: 2000,
      position: 'top-right'
    })
  } finally {

  }
}

onMounted(() => {
  getLanguages()
  getTranslates(1)
});

watch(() => page.value,
    (newPage) => {
      getTranslates(newPage)
    })
</script>

<style>
.table-ui {
  width: calc(100vw - 332px);
}
</style>
