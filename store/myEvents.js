export const state = () => ({
  myEvents: {
    currentPage: 1,
    data: [],
    firstPageUrl: '',
    from: 1,
    lastPage: 1,
    lastPageUrl: '',
    nextPageUrl: null,
    path: '',
    perPage: 5,
    prevPageUrl: null,
    to: 0,
    total: 0,
  },
})

export const mutations = {
  setMyEvents(state, myEvents) {
    state.myEvents.currentPage = myEvents.current_page
    state.myEvents.data = myEvents.data
    state.myEvents.firstPageUrl = myEvents.first_page_url
    state.myEvents.from = myEvents.from
    state.myEvents.lastPage = myEvents.last_page
    state.myEvents.lastPageUrl = myEvents.last_page_url
    state.myEvents.nextPageUrl = myEvents.next_page_url
    state.myEvents.path = myEvents.path
    state.myEvents.perPage = myEvents.per_page
    state.myEvents.prevPageUrl = myEvents.prev_page_url
    state.myEvents.to = myEvents.to
    state.myEvents.total = myEvents.total
  },
}

export const actions = {
  async fetchMyEvents({ commit }, payload) {
    const params = payload ? '?' + payload : ''
    try {
      const resp = await this.$privAPI.$get(
        this.$privAPI.defaults.baseURL + '/my_events' + params,
        {
          headers: { Authorization: this.$auth.getToken('local') },
        }
      )
      commit('setMyEvents', resp.data)
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }
  },
}

export const getters = {
  getMyEvents: (s) => s.myEvents,
}
