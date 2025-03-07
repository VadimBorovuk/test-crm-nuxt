import {useAuthStore} from '~/stores/authStore.js'
import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const {token, role, userId} = useAuthStore()

  const config = useRuntimeConfig();
  const service = axios.create({
    baseURL:  config.public.CLIENT_APP_URL,
    timeout: 600000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token, // Використовуйте ваш store або auth модуль
      'Lica-Role': role,
      'Lica-User': userId,
    },
  });

  // Інжектуємо сервіс у контекст Nuxt
  nuxtApp.provide('service', service);
});
