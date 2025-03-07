<template>
  <div>
    <title-page title="t.settings.administration"/>
    <UDivider class="mt-4" />
    <div class="lists-holder">
      <div>
        <div class="ibox float-e-margins">
          <div class="ibox-content">
            <h3 class="font-bold">Список роутов в файле</h3>
            <div v-for="item in routeStore.routers" :key="item.path" class="list-group-item">
              <b>{{ item.name }}</b> - {{ item.path }}
            </div>
            <br/>
          </div>
        </div>
      </div>
      <div>
        <div class="ibox float-e-margins">
          <div class="ibox-content">
            <h3 class="font-bold">Список роутов в системе</h3>
            <div v-for="item in realRoutes" :key="item.path" class="list-group-item">
              <b>{{ item.name }}</b> - {{ item.path }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <custom-btn
          active
          icon="simple-icons:convertio"
          @click="saveRoutesToJson()"
          description="t.btn.generate.route"
      />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Generate routes"
})
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';

import TitlePage from "~/components/ui/titlePage.vue";
import CustomBtn from "~/components/ui/customBtn.vue";
import {useRouteGenerateStore} from "~/stores/routeGenerateStore.js";

const {t} = useI18n()
const router = useRouter();
const routeStore = useRouteGenerateStore();
const realRoutes = ref([]);

const setRealRoutes = () => {
  realRoutes.value = router.options.routes.map(r => ({
    name: r.name,
    path: r.path
  }))
}

const setCurrentRoutes = async () => {
  try {
    await routeStore.getRoutesFunc();
  } catch (error) {
    push.error({
      title: t('t.error.load.route'),
      duration: 2000
    })
  }
};

const saveRoutesToJson = async () => {
  try {
    await routeStore.saveRoutesFunc(JSON.stringify(realRoutes.value));
    push.success({
      title: t('t.success.save.route'),
      duration: 2000
    })
    await setCurrentRoutes();
  } catch (error) {
    push.success({
      title: t('t.error.save.route'),
      duration: 2000
    })
  }
};

onMounted(() => {
  setRealRoutes();
  setCurrentRoutes();
});
</script>

<style scoped>
.ibox {
  margin-top: 30px;
}

.ibox .ibox-title {
  margin-bottom: 5px;
}

.ibox .ibox-content > h3 {
  margin-bottom: 10px;
}

.btn-main {
  padding: 10px 30px;
}

.lists-holder {
  display: flex;
  justify-content: space-between;
}

.lists-holder > div {
  width: 49%;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid #ebedf2;
  border-radius: 0.25rem;
}
</style>

