const route = async function (context) {
  console.log('bootstrap middleware', process.server, context.$auth.loggedIn)

  if (context.route.name === 'checkout') {
    const cartTotal = await context.store.state.cart.cartTotal
    if (cartTotal <= 0) {
      return context.redirect('/')
    }
  }

  if (context.route.name === 'orders' || context.route.name === 'profile' || context.route.name === 'checkout' ) {
    // console.log(context.$auth.loggedIn)
  }

  if (!process.server) {

    if (context.from && context.from.name === 'search') {
      context.store.commit('product/SET_KEYWORD', '')
    }

    if (context.route.name !== 'category') {
      context.store.commit('nav/setCurrentNav', { categoryId: null, subCategoryId: null, childId: null })
    }

  }
}


export default route
