export default function ({ app, store }, inject) {
  const logout = function () {
    app.$auth.logout().then(() => {
      app.$clearStoreDispatchTimeout()
      store.dispatch('userMedia/clearState')
    })
  }
  inject('logout', logout)
}
