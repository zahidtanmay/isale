export const state = () => ({
  orders: [],
  activeOrder: {},
})

export const getters = {
  getOrders: state => state.orders,
  getActiveOrder: state => state.activeOrder
}

export const mutations = {
  SET_ORDERS: (state, value) => { state.orders = value },
  SET_ACTIVE_ORDER: (state, value) => { state.activeOrder = Object.assign({}, value) }
}

export const actions = {

  async fetchOrders (context) {
    let {data} = await this.$axios.get('orders?cols=*')
    context.commit('SET_ORDERS', data.data)
  },
}
