export const state = () => ({
  eventTypes: [],
  errorMessage: '',
})

export const mutations = {
  setEventTypes(state, eventTypes) {
    state.eventTypes = eventTypes
  },
  setMessage(state, message) {
    state.message = message
  },
}

export const actions = {
  async getEventTypes({ commit }) {
    try {
      const resp = await this.$pubAPI.$get(
        this.$pubAPI.defaults.baseURL + '/event_types'
      )
      commit('setEventTypes', resp.data)
      commit('setMessage', resp.status)
    } catch (e) {
      commit('setEventTypes', [])
      commit('setMessage', e.response.data.errors)
    }
  },
}

export const getters = {
  getTypes: (s) => {
    return s.eventTypes
  },
}
