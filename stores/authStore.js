import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', ()=>{
  const token = ref(process.server ? '' : localStorage.getItem('crm_token'))
  const role = ref(process.server ? '' : localStorage.getItem('crm_role'))
  const expiring = ref(process.server ? '' : localStorage.getItem('crm_expire'))
  const userId = ref(process.server ? '' : localStorage.getItem('crm_id'))

  const accessRole = computed(()=>{
    return role.value === 'admin' ? 'Welcome boss': 'Hi'
  })

  return {
    token: token.value,
    role: role.value,
    userId: userId.value,
    expiring: expiring.value,
    accessRole
  }
});
