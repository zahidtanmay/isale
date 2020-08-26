export const state = () => ({
  ledgers: [],
  checkoutLocation: null,
  deliveryDay: null,
  deliveryTime: null,
  deliveryNote: '',
  orderId: null,
  checkoutDetails: {}
})

export const getters = {
  getLedgers: state => state.ledgers,
  getCheckoutLocation: state => state.checkoutLocation,
  getDeliveryDay: state => state.deliveryDay,
  getDeliveryTime: state => state.deliveryTime,
  getDeliveryNote: state => state.deliveryNote,
  getOrderId: state => state.orderId,
  getCheckoutDetails: state => state.checkoutDetails
}

export const mutations = {
  SET_LEDGERS: (state, value) => { state.ledgers = [...value] },
  SET_CHECKOUT_LOCATION: (state, value) => { state.checkoutLocation = value },
  SET_DELIVERY_DAY: (state, value) => { state.deliveryDay = value },
  SET_DELIVERY_TIME: (state, value) => { state.deliveryTime = value },
  SET_DELIVERY_NOTE: (state, value) => { state.deliveryNote = value },
  SET_ORDER_ID: (state, value) => { state.orderId = value },
  SET_CHECKOUT_DETAILS: (state, value) => { state.checkoutDetails = value }
}

export const actions = {

  async fetchLedgers (context) {
    let { data } = await this.$axios.get(`/ledgers?cols=*`)
    context.commit('SET_LEDGERS', [])
    context.commit('SET_LEDGERS', data.data)
  },

  async PlaceOrder ({commit, state, rootState}) {

    let checkout = {}

    let checkoutItems = []
    const cartItems = rootState.cart.cartItems

    for (const key in cartItems) {
      const item = cartItems[`${key}`]
      let cartItem = {}
      cartItem.productId = item.productId
      cartItem.unitPrice = parseInt(item.unitPrice)
      cartItem.purchasePrice = parseInt(item.purchasePrice)
      cartItem.quantity = parseInt(item.quantity)

      cartItem.vat = 0

      cartItem.discount = item.discount
      cartItem.discountedPrice = item.discountedPrice
      cartItem.totalDiscount = item.totalDiscount

      cartItem.total = item.total
      cartItem.discountedTotal = item.discountedTotal

      checkoutItems.push(cartItem)
    }

    checkout.items = checkoutItems
    checkout.subTotal = rootState.cart.cartTotal

    let ledgerTotal = 0

    state.ledgers.forEach(item =>  {
      ledgerTotal = ledgerTotal + parseInt(item.value)
    })

    checkout.ledgers = state.ledgers
    checkout.ledgerTotal = ledgerTotal
    checkout.ledgerPaidTotal = 0

    checkout.paymentTypeId = 5
    checkout.checkNumber = ''
    checkout.chequeDate = ''
    checkout.bankId = 1

    checkout.locationId = state.checkoutLocation
    checkout.note = state.deliveryNote ? state.deliveryNote : 'demo'
    checkout.deliveryDay = state.deliveryDay ? state.deliveryDay : ''
    checkout.deliveryTime = state.deliveryTime ? state.deliveryTime : ''

    checkout.lessAmount = '0'
    checkout.saleTypesId = '1'
    checkout.salesPersonId = '116'
    checkout.salesDate = '5-5-2020'
    checkout.discountCode = ''

    checkout.discountPercent = 0
    checkout.discountTotal = 0
    checkout.totalVat = 0

    checkout.paidAmount = 0
    checkout.returnAmount = 0
    checkout.total = rootState.cart.cartTotalDiscount > 0 ? rootState.cart.cartTotal : rootState.cart.cartDiscountedTotal
    checkout.dueAmount = checkout.total - checkout.paidAmount
    console.log(checkout)

    try{
      let { data } = await this.$axios.post(`/orders`, JSON.stringify(checkout))
      commit('SET_ORDER_ID', data.data.id)
      commit('SET_CHECKOUT_DETAILS', checkout)
      commit('cart/RESET_CART', null, { root: true })
    } catch (e) {
      console.log(e)
    }



  }

}
