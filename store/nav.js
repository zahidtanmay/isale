export const state = () => ({
  navLinks: [],
  currentNav: {},
  breadCrumb: []
})

export const getters = {
  getNavLinks: state => state.navLinks,
  getCurrentNav: state => state.currentNav,
}

export const mutations = {
  setCurrentNav: (state, value) => { state.currentNav = Object.assign({}, value) },
}

export const actions = {
  async bootstrapNav ({commit}) {
    const currentNav = await localStorage.getItem('currentNav') ? JSON.parse(localStorage.getItem('currentNav')) : {}
    await commit('setCurrentNav', currentNav)
    return true
  }

}
