export const state = () => ({
  orders: [],
  activeOrder: {},
  loader: false,
  page: 1,
  totalOrders: 0,
  currentOrderCount: 0,
})

export const getters = {
  getOrders: state => state.orders,
  getActiveOrder: state => state.activeOrder,
  getLoader: state => state.loader,
  getPage: state => state.page,
  getTotalOrders: state => state.totalOrders,
  getCurrentOrderCount: state => state.currentOrderCount
}

export const mutations = {
  SET_ORDERS: (state, value) => { state.orders = value },
  SET_ORDER: (state, value) => {

    const index = state.orders.findIndex(order => order.id === value.id )
    if (index !== -1) {
      state.orders[index].statusId = value.status
    }
  },
  SET_ACTIVE_ORDER: (state, value) => { state.activeOrder = Object.assign({}, value) },
  SET_LOADER: (state, value) => { state.loader = value },
  SET_PAGE: (state, value) => { state.page = value },
  SET_TOTAL_ORDERS: (state, value) => { state.totalOrders = value },
  SET_CURRENT_ORDER_COUNT: (state, value) => { state.currentOrderCount = value },
  APPEND_ORDERS: (state, value) => {
    state.orders = [ ...state.orders, ...value ]
    state.currentOrderCount += value.length
  },
}

export const actions = {

  async fetchOrders ({commit}) {
    commit('SET_LOADER', true)
    let {data} = await this.$axios.get('orders?cols=*&page=1')
    commit('SET_ORDERS', data.data)
    commit('SET_TOTAL_ORDERS', parseInt(data.meta.pagination.total))
    commit('SET_CURRENT_ORDER_COUNT', data.data.length)
    commit('SET_PAGE', 1)
    commit('SET_LOADER', false)
  },

  async loadMoreOrders({commit, state}) {
    let nextPage = state.page + 1
    commit('SET_LOADER', true)
    let {data} = await this.$axios.get(`orders?cols=*&page=${nextPage}`)
    if (data.data.length > 0) {
      commit('APPEND_ORDERS', data.data)
      commit('SET_PAGE', nextPage)
    }
    commit('SET_LOADER', false)
  }
}
