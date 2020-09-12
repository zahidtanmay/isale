export const state = () => ({
  orders: [],
  activeOrder: {},
  loader: false
})

export const getters = {
  getOrders: state => state.orders,
  getActiveOrder: state => state.activeOrder,
  getLoader: state => state.loader
}

export const mutations = {
  SET_ORDERS: (state, value) => { state.orders = value },
  SET_ACTIVE_ORDER: (state, value) => { state.activeOrder = Object.assign({}, value) },
  SET_LOADER: (state, value) => { state.loader = value }
}

export const actions = {

  async fetchOrders ({commit}) {
    commit('SET_LOADER', true)
    let {data} = await this.$axios.get('orders?cols=*')
    commit('SET_ORDERS', data.data)
    commit('SET_LOADER', false)
  },
}
