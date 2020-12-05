export const state = () => ({
  userMedia: [],
  message: '',
  page: 0,
  perPage: 1,
  lastPage: 1,
  total: 0,
})

export const mutations = {
  setUserMedia(state, data) {
    if (state.page <= data.current_page) {
      state.userMedia = state.userMedia.concat(data.data)
    } else {
      state.userMedia = data.data
    }
  },
  setMessage(state, message) {
    state.message = message
  },
  setPage(state, page) {
    state.page = page
  },
  setLastPage(state, lastPage) {
    state.lastPage = lastPage
  },
  setPerPage(state, perPage) {
    state.perPage = perPage
  },
  setTotal(state, total) {
    state.total = total
  },
  clearUserMedia(state) {
    state.userMedia = []
  },
  clearMessage(state) {
    state.message = ''
  },
  clearPage(state) {
    state.page = 0
  },
}

export const actions = {
  async getUserMedia({ commit, state }, payload) {
    const page = state.page + 1
    if (page && page <= state.lastPage) {
      try {
        const resp = await this.$pubAPI.$get(
          this.$pubAPI.defaults.baseURL +
            '/media/get_photos?' +
            payload +
            '&page=' +
            page
        )
        if (resp.status === 'success') {
          commit('clearMessage')
          commit('setUserMedia', resp.data)
          commit('setPage', resp.data.current_page)
          commit('setPerPage', resp.data.per_page)
          commit('setLastPage', resp.data.last_page)
          commit('setTotal', resp.data.total)
          commit('setMessage', resp.status)
        }
      } catch (e) {
        commit('clearUserMedia')
        commit('setMessage', e.response.data.data)
      }
    }
  },
  async confirmUploadMedia({ commit }, payload) {
    try {
      const resp = await this.$privAPI.$post(
        this.$pubAPI.defaults.baseURL + '/media/save',
        payload,
        {
          headers: { Authorization: this.$auth.getToken('local') },
        }
      )
      if (resp.status === 'success') {
        commit('clearMessage')
        commit('clearUserMedia')
        commit('setUserMedia', resp.data)
        commit('setPage', resp.data.current_page)
        commit('setPerPage', resp.data.per_page)
        commit('setLastPage', resp.data.last_page)
        commit('setTotal', resp.data.total)
        commit('setMessage', resp.status)
      }
    } catch (e) {
      commit('clearUserMedia')
      commit('setMessage', e.responce.data)
    }
  },
  clearState({ commit }) {
    commit('clearUserMedia')
    commit('clearPage')
  },
}

export const getters = {
  getUserMedia: (s) => s.userMedia,
  getMessage: (s) => s.message,
  getPage: (s) => s.page,
  getLastPage: (s) => s.lastPage,
  getPerPage: (s) => s.perPage,
  getTotal: (s) => s.total,
}
