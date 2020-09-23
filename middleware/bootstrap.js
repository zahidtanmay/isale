const route = async function (context) {
  console.log('bootstrap middleware', process.server, context.$auth.loggedIn)

  if (context.route.name === 'checkout') {
    const cartTotal = await context.store.state.cart.cartTotal
    if (cartTotal <= 0) {
      return context.redirect('/')
    }
  }

  if (context.route.name === 'orders' || context.route.name === 'profile' || context.route.name === 'checkout' ) {
    console.log(context.$auth.loggedIn)
   //
  }



  if (!process.server) {
    console.log('hello client')

    if (context.from && context.from.name === 'search') {
      context.store.commit('product/SET_KEYWORD', '')
    }

    if (context.route.name !== 'category') {
      console.log('set nav default')
      context.store.commit('nav/setCurrentNav', { categoryId: null, subCategoryId: null, childId: null })
    }

    const persistedVersion = await localStorage.getItem('e-shop-version')
    const version = await context.store.dispatch('bootstrap/fetchVersion')

    if (!persistedVersion || persistedVersion !== version) {
      context.store.dispatch('bootstrap/fetchLayout')
      context.store.dispatch('bootstrap/fetchCustomFields')

    }
  } else {
    await context.store.dispatch('bootstrap/fetchLayout')
    await context.store.dispatch('bootstrap/fetchCustomFields')
  }
}


export default route
