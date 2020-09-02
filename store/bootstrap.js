import Vue from 'vue'
export const state = () => ({
  version: '',
  categories: [],
  customCategories: [],
  company: {},
  areas: [],
  customFields: {},
  banners: [],
  reviews: []
})

export const getters = {
  getCategories: state => state.categories,
  getCompanyDetails: state => state.company,
  getAreas: state => state.areas,
  getAppVersion: state => state.version,
  getCustomFields: state => state.customFields,
  getCustomCategories: state => state.customCategories,
  getBanners: state => state.banners,
  getReviews: state => state.reviews
}

export const mutations = {
  SET_CATEGORIES: (state, value) => { state.categories = value },
  SET_COMPANY: (state, value) => { state.company = value },
  SET_AREAS: (state, value) => { state.areas = value },
  SET_VERSION: (state, value) => { state.version = value },
  SET_CUSTOM_FIELDS: (state, value) => {
    value.forEach(field => {
      if(parseInt(field.typeId) === 3 || parseInt(field.typeId) === 4) {
        state.customCategories.push(field)
      }
      state.customFields = { ...state.customFields, [field.name]: Vue._.cloneDeep(field) }
    })
  },

  SET_BANNERS: (state, value) => { state.banners = value },
  SET_REVIEWS: (state, value) => { state.reviews = value }

}

export const actions = {

  async fetchLayout (context) {
    let { data } = await this.$axios.get('/layout')
    context.commit('SET_CATEGORIES', data.data.categories)
    context.commit('SET_COMPANY', data.data.company)
    context.commit('SET_BANNERS', data.meta.topBanners)
    context.commit('SET_REVIEWS', data.data.reviews)
  },

  async fetchVersion (context) {
    let { data } = await this.$axios.get('/version')
    const version = data.data.version
    context.commit('SET_VERSION', version)
    localStorage.setItem('e-shop-version', version)
    return version
  },

  async fetchCustomFields (context) {
    let { data } = await this.$axios.get('/custom-fields?cols=*')
    context.commit('SET_CUSTOM_FIELDS', data.data)
  },

  async fetchAreas (context) {
    const token = this.$auth.getToken('local')
    let { data } = await this.$axios.get(`/areas?cols=*&token=${token}`)
    context.commit('SET_AREAS', data.data)
  }

}
