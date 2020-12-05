export default function (app, inject) {
  const login = async (email, password) => {
    await app.$auth
      .loginWith('local', {
        data: {
          email,
          password,
        },
      })
      .then(() => {
        if (app.$auth.loggedIn) {
          app.$setStoreDispatchTimeout(
            'notifications/fetchNotificationsAmount',
            5000
          )
          app.redirect('/profile')
        }
      })
  }

  inject('login', login)
}
