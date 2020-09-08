const route = async function (context) {
  console.log('bootstrap middleware', process.server)
  if (!process.server) {
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
