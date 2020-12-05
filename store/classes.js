export const state = () => ({
  mainClasses: '',
  headerClasses: 'header--transparent',
  headerSearchClasses: 'header__search-form--transparent',
  navbarClasses: 'header__nav--transparent user-nav user-nav--transparent',
  navbarIconClasses: 'user-nav__icn--black',
})

export const mutations = {
  setNavbarIconClasses(state, navbarIconClasses) {
    state.navbarIconClasses = navbarIconClasses
  },
  setMainClasses(state, mainClasses) {
    state.mainClasses = mainClasses
  },
  setHeaderClasses(state, headerClasses) {
    state.headerClasses = headerClasses
  },
  setHeaderSearchClasses(state, headerSearchClasses) {
    state.headerSearchClasses = headerSearchClasses
  },
  setNavbarClasses(state, navbarClasses) {
    state.navbarClasses = navbarClasses
  },
  resetNavbarIconClasses(state) {
    state.NavbarIconClasses = ''
  },
  resetMainClasses(state) {
    state.mainClasses = ''
  },
  resetHeaderClasses(state) {
    state.headerClasses = 'header--transparent'
  },
  resetHeaderSearchClasses(state) {
    state.headerSearchClasses = 'header__search-form--transparent'
  },
  resetNavbarClasses(state) {
    state.navbarClasses = 'header__nav--transparent'
  },
}

export const actions = {
  dispatchMainClasses({ commit }, payload) {
    commit('resetMainClasses')
    commit('setMainClasses', payload)
  },
  dispatchHeaderClasses({ commit }, payload) {
    commit('resetHeaderClasses')
    commit('setHeaderClasses', payload)
  },
  dispatchHeaderSearchClasses({ commit }, payload) {
    commit('resetHeaderSearchClasses')
    commit('setHeaderSearchClasses', payload)
  },
  dispatchNavbarClasses({ commit }, payload) {
    commit('resetNavbarClasses')
    commit('setNavbarClasses', payload)
  },
  dispatchNavbarIconClasses({ commit }, payload) {
    commit('resetNavbarIconClasses')
    commit('setNavbarIconClasses', payload)
  },
}

export const getters = {
  getMainClasses: (s) => s.mainClasses,
  getHeaderClasses: (s) => s.headerClasses,
  getHeaderSearchClasses: (s) => s.headerSearchClasses,
  getNavbarClasses: (s) => s.navbarClasses,
  getNavbarIconClasses: (s) => s.navbarIconClasses,
}
