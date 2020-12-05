export const state = () => ({
  artists: [],
  message: '',
  status: 0,
})

export const mutations = {
  setArtists(state, artists) {
    state.artists = artists
  },
  setMessage(state, message) {
    state.message = message
  },
  setStatus(state, status) {
    state.status = status
  },
}

export const actions = {
  async getArtists({ commit }) {
    try {
      const resp = await this.$pubAPI.$get(
        this.$pubAPI.defaults.baseURL + '/artists'
      )
      if (resp.status === 'success') {
        commit('setArtists', resp.data.data)
      }
    } catch (e) {
      commit('setMessage', e.response.status + ' ' + e.response.statusText)
    }
  },
  async searchArtists({ commit }, payload) {
    try {
      const resp = await this.$pubAPI.$get(
        this.$pubAPI.defaults.baseURL + '/find_artists?name=' + payload
      )
      if (resp.status === 'success') {
        commit('setArtists', resp.data.data)
      }
    } catch (e) {
      commit('setArtists', [])
      commit('setMessage', e.response.statusText)
      commit('setStatus', e.response.status)
    }
  },
}

export const getters = {
  getArtists: (s) => s.artists,
  getMessage: (s) => s.message,
  getStatus: (s) => s.status,
}
