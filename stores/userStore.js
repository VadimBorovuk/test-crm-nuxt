import {defineStore} from 'pinia'
import {useApiUser} from '~/api/user.js'
import moment from 'moment';

const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
let resOffset = moment().utcOffset() / 60;

let tzOffset;
if (resOffset > 0) {
  tzOffset = `+${resOffset}`;
} else {
  tzOffset = `${resOffset}`;
}

export const useUserStore = defineStore('user', () => {
  const {getUserInfo} = useApiUser()

  const userId = ref(process.server ? '' : +localStorage.getItem("crm_id") || 1258)

  const timezone = ref({
    accessManagersToTimeZone: [1.15, 132999],
    offset: +tzOffset,
    name: tzName,
  });

  const userData = ref({
    access: {},
    department: [],
    role: '',
    user_info: {}
  })
  const errorUserData = ref(null)

  const fetchUserData = async () => {

    try {
      // if (import.meta.server) return // Запобігаємо запитам під час SSR

      const account = await getUserInfo()
      if (!account?.data?.data) throw new Error('Invalid API response format')

      const {access, department, role, user_info} = account.data.data
      userData.value = {access, department, role, user_info}
      errorUserData.value = null
    } catch (error) {
      console.error('Помилка при отриманні інформації про акаунт:', error)
      errorUserData.value = error.message
      userData.value = {
        access: {},
        department: [],
        role: '',
        user_info: {}
      }
      throw error
    } finally {
    }
  }

  const getAccessTz = computed(()=>{
    return !timezone.value.accessManagersToTimeZone.includes(userId.value)
  })


  return {
    timezone,
    userData,
    errorUserData,
    getAccessTz,
    fetchUserData
  }
})
