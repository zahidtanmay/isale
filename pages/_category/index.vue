<template>

  <v-container fluid>

    <v-row dense>

      <v-col md="11">

        <banner></banner>

        <bread-crumb></bread-crumb>

        <category-title/>

        <Items/>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>
  import {mapGetters} from 'vuex'
  import Banner from '~/components/category/Banner.vue'
  import BreadCrumb from '~/components/category/BreadCrumb.vue'
  import Items from '~/components/category/Items.vue'
  import CategoryTitle from '~/components/category/Title.vue'

  export default {
    name: 'CategoryRoot',
    auth: false,

    head () {
      return {
        title: this.route,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },

    computed: {
      ...mapGetters({
        totalProducts: 'product/getTotalProducts',
        currentTotal: 'product/getCurrentProductCount',
        loader: 'product/getLoader',
      }),

      route() {
        const route = this.$route.params.category
        let str = ''
        let value = route.split('-')
        if (value[value.length - 1] && !isNaN(Number(value[value.length - 1]))) {
          value.splice(value.length - 3, 3)
        } else {
          value.splice(value.length - 2, 2)
        }
        value.map(word => {str = str + ' ' + word.charAt(0).toUpperCase() + word.slice(1)})
        return str.trim()
      }
    },

    components: {
      Banner,
      BreadCrumb,
      Items,
      CategoryTitle
    },

    async mounted() {
      await this.$store.dispatch('product/fetchProducts', this.$route.params.category)
      while(!this.scrollCheck() && this.currentTotal !== this.totalProducts) {
        if (this.currentTotal < this.totalProducts) {
          await this.$store.dispatch('product/loadMoreProducts', this.$route.params.category)
        }
      }
    },

    methods: {
      onScroll ({e}) {
        if (this.bottomVisible() && this.currentTotal < this.totalProducts && !this.loader) {
          this.$store.dispatch('product/loadMoreProducts', this.$route.params.category)
        }
      },

      bottomVisible () {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        let pageHeight = null
        if (document.documentElement.clientWidth <= 800 && document.documentElement.clientHeight <= 600) {
          pageHeight = document.documentElement.scrollHeight - 60
        } else {
          pageHeight = document.documentElement.scrollHeight
        }

        const bottomOfPage = visible + scrollY + 150 >= pageHeight
        return bottomOfPage || pageHeight < visible
      },

      scrollCheck () {
        const visible = document.documentElement.clientHeight
        let pageHeight = null
        if (document.documentElement.clientWidth <= 800 && document.documentElement.clientHeight <= 600) {
          pageHeight = document.documentElement.scrollHeight - 60
        } else {
          pageHeight = document.documentElement.scrollHeight
        }

        return pageHeight > visible
      }
    },



    created () {
      window.addEventListener('scroll', this.onScroll)
    },

    destroyed () {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>
