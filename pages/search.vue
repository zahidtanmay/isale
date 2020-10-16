<template>
  <v-container class="pa-4">
    <v-row v-if="load" class="mx-8">
      <template v-for="n in 28">
        <v-skeleton-loader
          class="mx-auto"
          min-width="210"
          max-width="280"
          height="320"
          type="card"
        ></v-skeleton-loader>
      </template>
    </v-row>

    <v-row align="center" justify="center" v-else>
      <template v-if="items.length > 0">
        <template v-for="(item, i) in items">
          <single-item :key="i" :itemDetails="item"></single-item>
        </template>
      </template>
      <template v-else>
        No product found
      </template>
    </v-row>

    <item-details-dialog></item-details-dialog>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SingleItem from '~/components/category/Item'
  import ItemDetailsDialog from '~/components/item/ItemDetailsDialog'

  export default {
    name: 'Search',
    auth: false,
    inject: ['theme'],

    components: {
      SingleItem,
      ItemDetailsDialog
    },

    computed: {
      ...mapGetters({
        items: 'product/getSearchedProducts',
        load: 'product/getSLoader',
        totalProducts: 'product/getTotalProducts',
        currentTotal: 'product/getCurrentProductCount',
        keyword: 'product/getKeyword'
      }),
    },

    async mounted() {
      while(!this.scrollCheck() && this.currentTotal !== this.totalProducts) {
        if (this.currentTotal < this.totalProducts) {
          console.log('load more search')
          await this.$store.dispatch('product/loadMoreSearchedProducts')
        }
      }
    },

    methods: {
      onScroll ({e}) {
        if (this.bottomVisible() && this.currentTotal < this.totalProducts && !this.load) {
          this.$store.dispatch('product/loadMoreSearchedProducts')
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

    watch: {
      async keyword (val) {
        await this.$store.dispatch('product/getSearchedProduct', val)
        while(!this.scrollCheck() && this.currentTotal !== this.totalProducts) {
          if (this.currentTotal < this.totalProducts) {
            await this.$store.dispatch('product/loadMoreSearchedProducts')
          }
        }
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

<style scoped>

</style>
