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
  favorites: initialState,
  types: [],
})

export const mutations = {
  setFavorites(state, favorites) {
    state.favorites = favorites
  },
  setFavoriteTypes(state, types) {
    state.types = types
  },
}

export const actions = {
  async fetchFavorites({ commit }, payload = '') {
    try {
      const resp = await this.$privAPI.$get(
        this.$privAPI.defaults.baseURL + '/' + 'favorites' + payload,
        {
          headers: { Authorization: this.$auth.getToken('local') },
        }
      )

      commit('setFavorites', resp.data)
    } catch (err) {
      commit('setFavorites', initialState)
      // eslint-disable-next-line
      console.error(err)
    }
  },

  async fetchFavoriteTypes({ commit }) {
    try {
      const resp = await this.$privAPI.$get(
        this.$privAPI.defaults.baseURL + '/favorite_types',
        {
          headers: { Authorization: this.$auth.getToken('local') },
        }
      )

      commit('setFavoriteTypes', resp.data)
    } catch (err) {
      commit('setFavoriteTypes', [])
      // eslint-disable-next-line
      console.error(err)
    }
  },
}

export const getters = {
  getFavorites: (s) => s.favorites,
  getFavoriteTypes: (s) => s.types,
}
