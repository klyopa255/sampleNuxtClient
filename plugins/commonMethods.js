export default ({ app }, inject) => {
  let interval = null
  const setStoreDispatchTimeout = (actionType, timeInterval) => {
    clearInterval(interval)
    interval = setInterval(() => {
      app.store.dispatch(actionType)
    }, timeInterval)
  }

  inject('setStoreDispatchTimeout', setStoreDispatchTimeout)

  const isMine = (dataID, userID) => {
    return app.$auth.loggedIn ? dataID === userID : false
  }

  inject('isMine', isMine)

  const clearStoreDispatchTimeout = () => {
    clearInterval(interval)
  }

  inject('clearStoreDispatchTimeout', clearStoreDispatchTimeout)
}
