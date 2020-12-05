const initialState = {
  promotions: [],
  week: [],
  free: [],
}

export const state = () => ({
  promotions: initialState.promotions,
  week: initialState.week,
  free: initialState.free,
})

export const mutations = {
  setMainEvents(state, events) {
    state.promotions = events.promotions
    state.week = events.week
    state.free = events.free
  },
}

export const actions = {
  async fetchMainPageEvents({ commit }) {
    try {
      const resp = await this.$pubAPI.$get(
        this.$pubAPI.defaults.baseURL + '/main/'
      )
      commit('setMainEvents', resp.data)
    } catch (err) {
      commit('setMainEvents', initialState)

      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
}

export const getters = {
  promotions: (s) => s.promotions,
  week: (s) => s.week,
  free: (s) => s.free,
}
