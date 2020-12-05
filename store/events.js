const initialState = {
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
}

export const state = () => ({
  events: initialState,
  query: '',
})

export const mutations = {
  setEvents(state, events) {
    state.events.currentPage = events.current_page
    state.events.data = events.data
    state.events.firstPageUrl = events.first_page_url
    state.events.from = events.from
    state.events.lastPage = events.last_page
    state.events.lastPageUrl = events.last_page_url
    state.events.nextPageUrl = events.next_page_url
    state.events.path = events.path
    state.events.perPage = events.per_page
    state.events.prevPageUrl = events.prev_page_url
    state.events.to = events.to
    state.events.total = events.total
  },
  setQuery(state, query) {
    state.query = query
  },
}

export const actions = {
  storeQuery({ commit }, payload) {
    commit('setQuery', payload)
  },
  async fetchEvents({ commit }, payload = '') {
    try {
      const resp = await this.$privAPI.$get(
        this.$pubAPI.defaults.baseURL + '/events' + payload
      )
      commit('setEvents', resp.data)
    } catch (err) {
      commit('setEvents', initialState)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
  async fetchFilteredEvents({ commit, state }, payload) {
    const url = this.$pubAPI.defaults.baseURL + '/events' + payload

    try {
      const resp = await this.$privAPI.$get(url)

      if (url.includes('page=')) {
        resp.data.data = state.events.data.concat(resp.data.data)
      }

      commit('setEvents', resp.data)
    } catch (err) {
      commit('setEvents', initialState)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
  async fetchPageEvents({ commit }, payload) {
    const url = this.$privAPI.defaults.baseURL + '/events' + payload
    try {
      const resp = await this.$privAPI.$get(url, {
        headers: { Authorization: this.$auth.getToken('local') },
      })
      commit('setEvents', resp.data)
    } catch (err) {
      commit('setEvents', initialState)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
}

export const getters = {
  events: (s) => s.events,
  query: (s) => s.query,
}
