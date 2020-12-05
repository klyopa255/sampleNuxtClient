const initialState = {
  users: {},
}

export const state = () => ({
  users: initialState,
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
}

export const actions = {
  async findUsers({ state, commit }, payload) {
    try {
      const resp = await this.$pubAPI.$get(
        this.$pubAPI.defaults.baseURL + '/find_users' + payload.query
      )
      if (payload.isNext) {
        resp.data.data = state.users.data.data.concat(resp.data.data)
      }
      commit('setUsers', resp)
    } catch (err) {
      commit('setUsers', initialState)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
}

export const getters = {
  getUsers: (s) => s.users,
}
