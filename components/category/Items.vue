<template>
  <v-container class="pa-4">
    <v-row>
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

    data: () => ({

    }),

    components: {
      SingleItem,
      ItemDetailsDialog
    },

    computed: {
      ...mapGetters({
        items: 'product/getProducts'
      })
    }
  }
</script>

<style scoped>
  .item-overlay-button {

  }


</style>
