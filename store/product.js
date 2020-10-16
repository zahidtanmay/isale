export const state = () => ({
  products: [],
  deals: [],
  activeProduct: {},
  banners: [],
  loader: false,
  searchedProduct: [],
  searchLoader: false,
  keyword: '',
  page: 1,
  totalProducts: 0,
  currentProductCount: 0,
})

export const getters = {
  getProducts: state => state.products,
  getDeals: state => state.deals,
  getActiveProduct: state => state.activeProduct,
  getBanners: state => state.banners,
  getLoader: state => state.loader,
  getSearchedProducts: state => state.searchedProduct,
  getSLoader: state => state.searchLoader,
  getTotalProducts: state => state.totalProducts,
  getCurrentProductCount: state => state.currentProductCount,
  getKeyword: state => state.keyword
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
      } else {
        convertedField.convertedValue = convertedField.value
        convertedCustomFields.push(convertedField)
      }
    })

    item.customFields = convertedCustomFields
    state.activeProduct = Object.assign({}, item)
  },

  SET_BANNERS: (state, value) => { state.banners = value },
  SET_LOADER: (state, value) => { state.loader = value },
  SET_SEARCHED_PRODUCTS: (state, value) => { state.searchedProduct = value },
  SET_SLOADER: (state, value) => { state.searchLoader = value },
  SET_KEYWORD: (state, value) => { state.keyword = value },
  APPEND_PRODUCTS: (state, value) => { state.products = [ ...state.products, ...value ]},
  RESET_PAGE: (state) => { state.page = 1 },
  SET_TOTAL_PRODUCTS: (state, value) => { state.totalProducts = value },
  SET_CURRENT_PRODUCT_COUNT: (state, value) => { state.currentProductCount += value },
  RESET_CURRENT_PRODUCT_COUNT: (state, value) => { state.currentProductCount = value },
  SET_PAGE: (state, value) => { state.page = value },
  APPEND_SPRODUCTS: (state, value) => { state.searchedProduct = [ ...state.searchedProduct, ...value ] }

}

export const actions = {

  async fetchProducts ({commit}, value) {
    commit('SET_LOADER', true)
    let filter = ''
    let currentNav = { categoryId: null, subCategoryId: null, childId: null }

    let slug = value.split('-')
    console.log('slug', slug)
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

    let {data} = await this.$axios.get(`products?cols=*&filters=${filter}&page=1`)
    commit('SET_BANNERS', data.meta.topBanners)
    commit('SET_TOTAL_PRODUCTS', parseInt(data.meta.pagination.total))
    commit('SET_PRODUCTS', data.data)
    commit('RESET_CURRENT_PRODUCT_COUNT', data.data.length)
    commit('RESET_PAGE')
    commit('SET_LOADER', false)
  },

  async fetchDeals({commit}, value) {
    let {data} = await this.$axios.get(`products?cols=*&filters=customFieldId:1`)
    commit('SET_DEALS', data.data)
  },

  async getSearchedProduct({commit, state}, value) {
    commit('SET_SLOADER', true)
    let {data} = await this.$axios.get(`products?filters=keyword:${value}&cols=*&page=1`)
    console.log('current total', data.data.length)
    commit('SET_TOTAL_PRODUCTS', parseInt(data.meta.pagination.total))
    commit('SET_SEARCHED_PRODUCTS', data.data)
    commit('RESET_CURRENT_PRODUCT_COUNT', data.data.length)
    commit('RESET_PAGE')
    this.$router.push('/search')
    commit('SET_SLOADER', false)
  },

  async loadMoreSearchedProducts({commit, state}, value) {
    let nextPage = state.page + 1
    commit('SET_SLOADER', true)
    let {data} = await this.$axios.get(`products?filters=keyword:${state.keyword}&cols=*&page=${nextPage}`)
    if (data.data.length > 0) {
      commit('APPEND_SPRODUCTS', data.data)
      commit('SET_PAGE', nextPage)
      commit('SET_CURRENT_PRODUCT_COUNT', data.data.length)
    }
    commit('SET_SLOADER', false)
  },

  async loadMoreProducts({commit, state, getters}, value) {
    let nextPage = state.page + 1
    commit('SET_LOADER', true)

    let filter = ''
    let slug = value.split('-')
    if (slug[slug.length - 1] && !isNaN(Number(slug[slug.length - 1]))) {
      const categoryId = slug.pop()
      const type = slug.pop()
      const subCategoryId = slug.pop()
      filter = `subCategoryId:${subCategoryId}`
    } else {
      const type = slug.pop()
      const id = slug.pop()
      if(type === 'c') {
        filter = `categoryId:${id}`
      } else {
        filter = `customFieldId:${id}`
      }

    }

    let {data} = await this.$axios.get(`products?cols=*&filters=${filter}&page=${nextPage}`)
    if (data.data.length > 0) {
      commit('APPEND_PRODUCTS', data.data)
      commit('SET_PAGE', nextPage)
      commit('SET_CURRENT_PRODUCT_COUNT', data.data.length)
    }

    commit('SET_LOADER', false)
  }
}

