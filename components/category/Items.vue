<template>
  <v-container class="pa-4">

    <v-row v-if="loader">
      <template v-for="n in 12">
        <v-skeleton-loader
          class="mx-auto"
          min-width="210"
          max-width="300"
          height="320"
          type="card"
        ></v-skeleton-loader>
      </template>
    </v-row>

    <v-row align="center" justify="center" v-else>
      <template v-for="(item, i) in items">
        <single-item :key="i" :itemDetails="item"></single-item>
      </template>
    </v-row>

  <item-details-dialog></item-details-dialog>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SingleItem from './Item'
  import ItemDetailsDialog from '../item/ItemDetailsDialog'

  export default {
    name: 'ItemsList',
    inject: ['theme'],

    components: {
      SingleItem,
      ItemDetailsDialog
    },

    computed: {
      ...mapGetters({
        items: 'product/getProducts',
        loader: 'product/getLoader'
      })
    }
  }
</script>

<style scoped>

</style>
