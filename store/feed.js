export const state = () => ({
  feed: {
    data: [],
  },
})

export const mutations = {
  setFeed(state, feed) {
    state.feed = feed
  },
}

export const actions = {
  async getFeed({ state, commit }, payload) {
    let query = ''
    query += payload.queryAuthId ? payload.queryAuthId : ''
    query += payload.queryPage ? payload.queryPage : ''
    await this.$privAPI
      .$get(this.$privAPI.defaults.baseURL + '/feed' + query, {
        headers: { Authorization: this.$auth.getToken('local') },
      })
      .then(
        (resp) => {
          if (
            resp.status === 'success' &&
            Array.isArray(resp.data.data) &&
            resp.promo
          ) {
            resp.promo.isPromo = true
            resp.data.data.push(resp.promo)
          }
          if (payload.queryPage) {
            resp.data.data = state.feed.data.concat(resp.data.data)
          }
          commit('setFeed', resp.data)
        },
        (e) => {
          // to do: error handling
          // eslint-disable-next-line
          console.log(e)
        }
      )
  },
}

export const getters = {
  getFeed: (s) => s.feed,
}
