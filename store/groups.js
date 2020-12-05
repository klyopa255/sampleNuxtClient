const initialState = {
  data: [],
}

export const state = () => ({
  groups: initialState,
  artists: initialState,
  currentGroup: {
    created_at: '',
    id: null,
    invitation: [],
    name: '',
    owner_id: null,
    updated_at: '',
    users: [],
  },
})

export const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  },
  setArtists(state, artists) {
    state.artists = artists
  },
  setCurrentGroup(state, group) {
    state.currentGroup.created_at = group.created_at
    state.currentGroup.id = group.id
    state.currentGroup.invitation = group.invitation
    state.currentGroup.name = group.name
    state.currentGroup.owner_id = group.owner_id
    state.currentGroup.updated_at = group.updated_at
    state.currentGroup.users = group.users
  },
}

export const actions = {
  async fetchGroups({ commit }, payload) {
    try {
      const resp = await this.$pubAPI.$get('/get_users_groups' + payload)
      if (resp.status !== 'error') {
        commit('setGroups', resp.data)
      } else {
        commit('setGroups', null)
      }
    } catch (err) {
      commit('setGroups', null)
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },
  async fetchArtists({ commit }, payload) {
    try {
      const resp = await this.$pubAPI.$get('/find_artists' + payload)

      commit('setArtists', resp.data)
    } catch (err) {
      commit('setArtists', initialState)
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },
  async getGroupById({ commit }, payload) {
    try {
      const resp = await this.$privAPI('/groups-info/' + payload, {
        headers: { Authorization: this.$auth.getToken('local') },
      })

      commit('setCurrentGroup', resp.data.data)
    } catch (err) {
      commit('setCurrentGroup', {
        created_at: '',
        id: null,
        invitation: [],
        name: '',
        owner_id: null,
        updated_at: '',
        users: [],
      })
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },
}

export const getters = {
  getArtists: (s) => s.artists,
  getGroups: (s) => s.groups,
  getCurrentGroup: (s) => s.currentGroup,
}
