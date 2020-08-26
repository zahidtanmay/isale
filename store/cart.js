import  Vue from 'vue'
export const state = () => ({
  cartItems: Object.create(null),
  cartCount: 0,
  cartTotal: 0,
  cartDiscountedTotal: 0,
  cartTotalDiscount: 0
})

export const getters = {
  getCartItems: state => state.cartItems,
  getCartCount: state => state.cartCount,
  getCartTotal: state => state.cartTotal,
  getCartDiscountedTotal: state => state.cartDiscountedTotal,
  getCartTotalDiscount: state => state.cartTotalDiscount,
}

export const mutations = {

  INCREMENT_CART_ITEM: (state, data) => {
    let item = data.item

    item.productId = item.id
    item.unitPrice = parseInt(item.price)
    item.purchasePrice = parseInt(item.price)
    item.quantity = data.quantity + 1
    item.discount = data.discount

    item.discountedPrice = item.discount > 0 ? item.unitPrice - item.discount : 0
    item.totalDiscount = item.discount > 0 ? item.quantity * item.discount : 0

    item.total = item.quantity * item.unitPrice
    item.discountedTotal = item.total - item.totalDiscount

    state.cartItems = { ...state.cartItems, [item.id]: Vue._.cloneDeep(item) }
  },

  DECREMENT_CART_ITEM: (state, data) => {
    let item = data.item
    if (data.quantity === 1) {
      Vue.delete(state.cartItems, item.id)
    } else {
      item.quantity = data.quantity - 1
      state.cartItems = { ...state.cartItems, [item.id]: Vue._.cloneDeep(item) }
    }
  },

  DISCARD_CART_ITEM: (state, data) => {
    Vue.delete(state.cartItems, data.id)
  },

  CALCULATE_CART_COUNT: (state) => {
    state.cartCount = Object.keys(state.cartItems).length
  },

  CALCULATE_CART_TOTAL: (state) => {
    let total = 0
    let discountedTotal = 0
    let totalDiscount = 0
    let key = null
    for (key in state.cartItems) {
      const item = state.cartItems[`${key}`]
      total += item.total
      discountedTotal += item.discountedTotal
      totalDiscount += item.totalDiscount
    }
    state.cartTotal = total
    state.cartDiscountedTotal = discountedTotal
    state.cartTotalDiscount = totalDiscount
  },
  RESET_CART: (state, value) => {
    state.cartItems = Object.create(null)
    state.cartCount = 0
    state.cartTotal = 0
    state.cartDiscountedTotal = 0
    state.cartTotalDiscount = 0
  }
}

export const actions = {

  async addToCart ({commit, state}, data) {
    await commit('INCREMENT_CART_ITEM', data)
    await commit('CALCULATE_CART_COUNT')
    await commit('CALCULATE_CART_TOTAL')
    return state.cartItems[`${data.item.id}`].quantity
  },

  async removeFromCart ({commit, state}, data) {
    await commit('DECREMENT_CART_ITEM', data)
    await commit('CALCULATE_CART_COUNT')
    await commit('CALCULATE_CART_TOTAL')
    if (`${data.item.id}` in state.cartItems) {
      return state.cartItems[`${data.item.id}`].quantity
    } else {
      return 0
    }
  },

  async discardFromCart ({commit, state}, data) {
    await commit('DISCARD_CART_ITEM', data)
    await commit('CALCULATE_CART_COUNT')
    await commit('CALCULATE_CART_TOTAL')
  }

}
