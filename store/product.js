export const state = () => ({
  products: [],
  deals: [],
  activeProduct: {},
})

export const getters = {
  getProducts: state => state.products,
  getDeals: state => state.deals,
  getActiveProduct: state => state.activeProduct
}

export const mutations = {
  SET_PRODUCTS: (state, value) => { state.products = value },
  SET_DEALS: (state, value) => { state.deals = value },
  SET_ACTIVE_PRODUCT: (state, { product, customFields }) => {
    let item = Object.assign({}, product)
    const itemCustomFields = product.customFields
    const id = itemCustomFields.findIndex(field => parseInt(field.typeId) === 4)
    item.itemDetailsDiscount = 0
    item.itemDetailsDiscountedPrice = 0
    if (id > -1) {
      item.itemDetailsDiscount = parseInt(itemCustomFields[id].value)
      item.itemDetailsDiscountedPrice = parseInt(item.price) - parseInt(itemCustomFields[id].value)
    }

    const convertedCustomFields = []
    itemCustomFields.forEach(field => {
      let convertedField = Object.assign({}, field)
      if (parseInt(field.typeId) === 2 && customFields[field.name]['valueType'] != 'Text' ) {
        const prefValues = customFields[field.name].prefValues
        const id = prefValues.findIndex(value => parseInt(value.id) === parseInt(field.value))
        convertedField.convertedValue = prefValues[id]['value']
        convertedCustomFields.push(convertedField)
        // console.log(field, customFields[field.name], prefValues, field.value, id, prefValues[id]['value'])
      } else {
        convertedField.convertedValue = convertedField.value
        convertedCustomFields.push(convertedField)
      }
    })

    item.customFields = convertedCustomFields
    state.activeProduct = Object.assign({}, item)
  }
}

export const actions = {

  async fetchProduct ({commit}, value) {
    let filter = ''
    let currentNav = { categoryId: null, subCategoryId: null, childId: null }

    let slug = value.split('-')
    if (slug[slug.length - 1] && !isNaN(Number(slug[slug.length - 1]))) {
      const categoryId = slug.pop()
      const type = slug.pop()
      const subCategoryId = slug.pop()
      filter = `subCategoryId:${subCategoryId}`
      currentNav.categoryId = parseInt(categoryId)
      currentNav.subCategoryId = parseInt(subCategoryId)
    } else {
      const type = slug.pop()
      const id = slug.pop()

      if(type === 'c') {
        filter = `categoryId:${id}`
        currentNav.categoryId = parseInt(id)
      } else {
        filter = `customFieldId:${id}`
        currentNav.categoryId = null

      }
    }
    commit('nav/setCurrentNav', currentNav, { root: true })

    let {data} = await this.$axios.get(`products?cols=*&filters=${filter}`)
    commit('SET_PRODUCTS', data.data)
  },

  async fetchDeals({commit}, value) {
    let {data} = await this.$axios.get(`products?cols=*`)
    commit('SET_DEALS', data.data)
  }
}
