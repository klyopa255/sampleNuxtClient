export const state = () => ({
  posts: {
    data: [],
  },
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
}

export const actions = {
  async getPosts({ state, commit }, payload) {
    let query = ''
    query += payload.queryId ? payload.queryId : ''
    query += payload.queryAuthId ? payload.queryAuthId : ''
    query += payload.queryPage ? payload.queryPage : ''
    await this.$privAPI
      .$get(this.$privAPI.defaults.baseURL + '/posts' + query, {
        headers: { Authorization: this.$auth.getToken('local') },
      })
      .then(
        (resp) => {
          if (payload.queryPage) {
            resp.data.data = state.posts.data.concat(resp.data.data)
          }
          commit('setPosts', resp.data)
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
  getPosts: (s) => s.posts,
}
