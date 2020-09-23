import Vue from 'vue'
export const state = () => ({
  version: '',
  categories: [],
  customCategories: [],
  company: {},
  areas: [],
  customFields: {},
  banners: [],
  reviews: [],
  pages: [],
})

export const getters = {
  getCategories: state => state.categories,
  getCompanyDetails: state => state.company,
  getAreas: state => state.areas,
  getAppVersion: state => state.version,
  getCustomFields: state => state.customFields,
  getCustomCategories: state => state.customCategories,
  getBanners: state => state.banners,
  getReviews: state => state.reviews,
  getPages: state => state.pages,
}

export const mutations = {
  SET_CATEGORIES: (state, value) => { state.categories = value },
  SET_COMPANY: (state, value) => { state.company = value },
  SET_AREAS: (state, value) => { state.areas = value },
  SET_VERSION: (state, value) => { state.version = value },
  SET_CUSTOM_FIELDS: (state, value) => {
    state.customFields = Object.assign({}, {})
    state.customCategories = []

    value.forEach(field => {

      if(parseInt(field.typeId) === 3 || parseInt(field.typeId) === 4) {
        state.customCategories.push(field)
      }

      if (!(field.name in state.customFields)) {
        state.customFields = { ...state.customFields, [field.name]: field }
      }

    })
  },

  SET_BANNERS: (state, value) => { state.banners = value },
  SET_REVIEWS: (state, value) => { state.reviews = value },
  SET_PAGES: (state, value) => { state.pages = value },

}

export const actions = {

  async fetchLayout ({commit}) {
    let { data } = await this.$axios.get('/layout')
    commit('SET_CATEGORIES', data.data.categories)
    commit('SET_COMPANY', data.data.company)
    commit('SET_BANNERS', data.meta.topBanners)
    commit('SET_REVIEWS', data.data.reviews)
    commit('SET_PAGES', data.data.pages)
  },

  async fetchVersion ({commit}) {
    let { data } = await this.$axios.get('/version')
    const version = data.data.version
    commit('SET_VERSION', version)
    localStorage.setItem('e-shop-version', version)
    return version
  },

  async fetchCustomFields ({commit}) {
    let { data } = await this.$axios.get('/custom-fields?cols=*')
    commit('SET_CUSTOM_FIELDS', data.data)
  },

  async fetchAreas ({commit}) {
    const token = this.$auth.getToken('local')
    let { data } = await this.$axios.get(`/areas?cols=*&token=${token}`)
    commit('SET_AREAS', data.data)
  }

}
