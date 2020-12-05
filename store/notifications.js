const initialState = {
  currentPage: 1,
  data: [{ start: 1 }, { start: 1 }],
  firstPageUrl: '',
  from: 1,
  lastPage: 1,
  lastPageUrl: '',
  nextPageUrl: '',
  path: '',
  perPage: 5,
  prev_page_url: null,
  to: 1,
  total: 1,
}

export const state = () => ({
  notifications: initialState,
  notificationsAmount: 0,
  invitation: {},
})

export const mutations = {
  setNotifications(state, notifications) {
    state.notifications.data = notifications.data
    state.notifications.currentPage = notifications.current_page
    state.notifications.firstPageUrl = notifications.first_page_url
    state.notifications.from = notifications.from
    state.notifications.lastPage = notifications.last_page
    state.notifications.lastPageUrl = notifications.last_page_url
    state.notifications.nextPageUrl = notifications.next_page_url
    state.notifications.path = notifications.path
    state.notifications.perPage = notifications.per_page
    state.notifications.prevPageUrl = notifications.prev_page_url
    state.notifications.to = notifications.to
    state.notifications.total = notifications.total
  },
  setAmount(state, amount) {
    state.notificationsAmount = amount.amount_notifications
  },
  setInvitation(state, invitation) {
    state.invitation = invitation
  },
}

export const actions = {
  async fetchNotifications({ commit }) {
    try {
      const resp = await this.$privAPI.$get(
        this.$privAPI.defaults.baseURL + '/notifications',
        {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        }
      )

      if (resp.groups_invitation.length > 0) {
        commit('setInvitation', resp.groups_invitation[0])
      } else {
        commit('setInvitation', {})
      }

      commit('setNotifications', resp.data)
    } catch (err) {
      commit('setNotifications', initialState)
      commit('setInvitation', {})
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
  async fetchNotificationsAmount({ commit }) {
    try {
      const resp = await this.$privAPI.$get(
        this.$privAPI.defaults.baseURL + '/' + 'amount_notifications',
        {
          headers: { Authorization: this.$auth.getToken('local') },
        }
      )
      commit('setAmount', resp.data)
    } catch (err) {
      commit('setAmount', 0)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
}

export const getters = {
  notifications: (s) => s.notifications,
  getAmount: (s) => s.notificationsAmount,
  invitation: (s) => {
    return s.invitation
  },
}
