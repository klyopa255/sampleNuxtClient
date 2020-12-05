export const state = () => ({
  userTypes: [],
  errorMessage: '',
})

export const mutations = {
  setUserTypes(state, userTypes) {
    state.userTypes = userTypes
  },
  setMessage(state, message) {
    state.message = message
  },
}

export const actions = {
  async getUserTypes({ commit }) {
    try {
      const resp = await this.$pubAPI.$get(
        this.$pubAPI.defaults.baseURL + '/user_types'
      )
      commit('setUserTypes', resp.data)
      commit('setMessage', resp.status)
    } catch (e) {
      commit('setUserTypes', [])
      commit('setMessage', e.response.data.errors)
    }
  },
}

export const getters = {
  getTypes: (s) => {
    return s.userTypes
  },
  getSubtypesByTypeId: (s) => (id) => {
    return s.userTypes.find((type) => type.id === id)
  },
}
