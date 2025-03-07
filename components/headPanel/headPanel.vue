<template>
  <header class="flex items-center justify-between h-[70px] border-b-[1.1px] border-zinc-300 mb-3">
    <div class="w-[320px] flex items-center h-full">
      <div class="flex items-center justify-center h-full cursor-pointer w-18 flex-none">
        <div class="bg-whiteLilac-800 flex items-center p-1 rounded-lg">
          <Icon style="color: #fff;" :size="30" name="ic:baseline-exit-to-app"/>
        </div>
      </div>

      <!--      <ColorScheme>-->
<!--        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']"/>-->
<!--      </ColorScheme>-->

      <!--      <client-only>-->
      <!--        <div class="flex items-center justify-center h-full border-r-2 border-gray-700 px-3 flex-1">-->
      <!--          <p class="text-[12px] text-[#929292]"> {{ $t('t.nav.agent.name') }} ⏤ {{ userData.user_info.login }} </p>-->
      <!--        </div>-->
      <!--      </client-only>-->
    </div>

    <client-only>
      <div class="flex items-center">
        <ViewLangs/>
      </div>
    </client-only>
  </header>
</template>

<script setup>
import ViewLangs from "~/components/headPanel/ViewLangs/ViewLangs.vue";
import ViewLinks from "~/components/headPanel/ViewLinks/ViewLinks.vue";

const {userData} = useUserStore()
</script>


<style scoped>
/* Стилі */
</style>
