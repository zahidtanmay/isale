const route = async function({ app }) {
  // Every time the route changes (fired on initialization too)
  if(!process.server) {
    console.log('route plugin')
    const persistedVersion = localStorage.getItem('e-shop-version')
    const version = await app.store.dispatch('bootstrap/fetchVersion')

    if (!persistedVersion || persistedVersion !== version) {
      app.store.dispatch('bootstrap/fetchLayout')
      app.store.dispatch('bootstrap/fetchCustomFields')
    }

    app.router.beforeEach((to, from, next) => {
      if(app.$auth.loggedIn && to.name === 'login')
      {
        next('/')
        // return app.redirect('/')
      } else {
        next()
      }
      //   console.log(to, from)
    })

    // app.router.afterEach((to, from) => {
    //   if(app.$auth.loggedIn && to.name === 'login')
    //   {
    //     console.log('hello before redirect')
    //     // return app.redirect('/')
    //   }
    //   console.log(to, from)
    // })
  }
}


export default route
