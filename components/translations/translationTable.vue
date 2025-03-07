<template>
  <div class="table-container mb-6">
    <UTable
        :ui="{
        thead: 'bg-whiteLilac-700 h-[50px] text-white', // Червоний фон, білий текст
    }"
        :rows="data.items"
        :columns="columns"
        :empty-state="{ label: 'No data' }"
        class="mt-4 notifications-lists w-100"
    >

      <!-- Кастомний рендеринг для колонки "name" -->
      <template #name-data="{ row }">
        {{ row.name }}
      </template>

      <!-- Кастомний рендеринг для колонки "status_name" -->
      <template #status_name-data="{ row }">
        <p
            class="list-status"
            :class="{
            'primary': row.status === 1,
            'success': row.status === 2,
            'info': row.status === 3,
            'danger': row.status === 4,
          }"
        >
          {{ row.status_name }}
        </p>
      </template>

      <!-- Кастомний рендеринг для колонки "type_name" -->
      <template #type_name-data="{ row }">
        <p>{{ row.type_name }}</p>
      </template>

      <template #created_at-data="{ row }">
        <div v-if="getAccessTz" class="time-zone-date">
          timezone:
          {{
            getUTCTimeOffset(
                row.created_at,
                getTimeZoneOffset,
                "get",
                "org"
            )
          }}
        </div>
        <div v-else>
          <p>
            <b>{{ getFormattedDateOrg(scope.row.date_create) }}</b>
          </p>
          <p>{{ getFormattedTimeRequest(scope.row.date_create) }}</p>
        </div>

<!--        <p>{{ $moment(row.created_at).format("DD.MM.YYYY HH:mm:ss") }}</p>-->
      </template>

      <template #updated_at-data="{ row }">
        <p>{{ $moment(row.updated_at).format("DD.MM.YYYY HH:mm:ss") }}</p>
      </template>

      <!-- Кастомний рендеринг для колонки "start_at" -->

      <!-- Кастомний рендеринг для колонки "operations" -->
      <template #operations-data="{ row }">
        <div class="table__buttons 'sticky right-0 bg-white z-10'">
          <UButton
              :title="$t('t.btn.title.clone')"
              color="gray"
              variant="ghost"
          >
            <UIcon name="i-heroicons-document-duplicate"/>
          </UButton>
          <UButton
              :title="$t('t.btn.title.edit')"
              color="gray"
              variant="ghost"
          >
            <UIcon name="i-heroicons-pencil"/>
          </UButton>
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup>
import {useDateFormat} from '~/composables/useDateFormat.js'
const {t} = useI18n()

defineProps({
  data: {
    type: Object,
    default: {}
  },
  getAccessTz: {
    type: Boolean,
    default: false
  }
})

const { getUTCTimeOffset, getFormattedDateOrg, getFormattedTimeRequest } = useDateFormat();
const userStore = useUserStore();

const getTimeZoneOffset = computed(() => {
  return userStore.timezone.offset;
});


const columns = [
  {key: 'id', label: t('t.table.id'), class: 'min-w-[50px]'},
  {key: 'lang', label: t('t.table.language'), class: 'min-w-[50px]'},
  {key: 'code', label: t('t.table.code'), class: 'min-w-[150px]'},
  {key: 'lang', label: t('t.table.language'), class: 'min-w-[50px]'},
  {key: 'value', label: t('t.table.value'), class: 'min-w-[350px]'},
  {key: 'created_at', label: t('t.table.created_at'), class: 'min-w-[200px]'},
  {key: 'updated_at', label: t('t.table.updated_at'), class: 'min-w-[200px]'},
  {
    key: 'operations',
    label: t('t.table.operations'),
    class: 'min-w-[140px]'
    // class: 'sticky right-0 bg-whiteLilac-700 z-10'
  },
];

</script>
