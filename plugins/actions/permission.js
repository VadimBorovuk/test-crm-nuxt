export default defineNuxtPlugin((nuxtApp) => {
  const permission = {
    canAction: function (access, action) {
      let actions = access.actions;
      if (actions) {
        return !!(actions.includes(action) || localStorage.getItem('crm_role') === 'admin');
      }
      return false;
    }
  };

  nuxtApp.provide('permission', permission);
});
