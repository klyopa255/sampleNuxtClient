export const state = () => ({
  message: '',
})

export const mutations = {
  setMessage(state, message) {
    state.message = message
  },
  clearMessage(state) {
    state.message = ''
  },
}

export const actions = {
  async register({ commit }, payload) {
    commit('clearMessage')
    try {
      const resp = await this.$pubAPI.$post(
        this.$pubAPI.defaults.baseURL + '/register',
        payload
      )
      if (resp.status === 'success') {
        this.$auth.setUserToken(resp.token)
        this.$auth.setUser(resp.user)
        this.$router.push('/profile')
      }
    } catch (e) {
      commit('setMessage', e.response.data.errors)
    }
  },
}

export const getters = {
  getMessage: (s) => {
    const messageObj = s.message
    if (messageObj) {
      const resultObj = {}
      const fieldsArr = []
      let message = ''
      for (const key in messageObj) {
        fieldsArr.push(key)
        message += messageObj[key] + '<br />'
      }
      resultObj.fields = fieldsArr
      resultObj.message = message
      return resultObj
    } else {
      return ''
    }
  },
}
