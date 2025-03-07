import { defineStore } from 'pinia'
import { useApiUser } from '~/api/user.js'
import moment from 'moment';

export const useUserStore = defineStore('user', () => {
  const { getUserInfo } = useApiUser();

  const userId = ref(process.server ? '' : +localStorage.getItem("crm_id") || 1258);

  const timezone = ref({
    accessManagersToTimeZone: [1.15, 132999],
    offset: null, // Ініціалізуємо як `null`
    name: process.server ? null : Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const userData = ref({
    access: {},
    department: [],
    role: '',
    user_info: {}
  });

  const errorUserData = ref(null);

  const fetchUserData = async () => {
    try {
      const account = await getUserInfo();
      if (!account?.data?.data) throw new Error('Invalid API response format');

      const { access, department, role, user_info } = account.data.data;
      userData.value = { access, department, role, user_info };
      errorUserData.value = null;
    } catch (error) {
      console.error('Помилка при отриманні інформації про акаунт:', error);
      errorUserData.value = error.message;
      userData.value = {
        access: {},
        department: [],
        role: '',
        user_info: {}
      };
      throw error;
    }
  };

  // Оновлення таймзони
  const updateTimezone = () => {
    const resOffset = moment().utcOffset() / 60;
    timezone.value.offset = resOffset > 0 ? `+${resOffset}` : `${resOffset}`;
    timezone.value.name = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('Оновлено timezone:', timezone.value);
  };

  const getAccessTz = computed(() => {
    return !timezone.value.accessManagersToTimeZone.includes(userId.value);
  });

  return {
    timezone,
    userData,
    errorUserData,
    getAccessTz,
    fetchUserData,
    updateTimezone
  };
});
