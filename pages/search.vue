<template>
  <v-container class="pa-4">
    <v-row v-if="load" class="mx-8">
      <template v-for="n in 10">
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
      <template v-for="(item, i) in items">
        <single-item :key="i" :itemDetails="item"></single-item>
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
        load: 'product/getSLoader'
      }),
    }
  }
</script>

<style scoped>

</style>
