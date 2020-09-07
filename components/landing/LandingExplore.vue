<template>

  <div>
    <div class="headline text-center my-8">
      Explore
    </div>
    <v-sheet
      class="mx-auto"
      elevation="0"
      max-width="1000"
    >
      <v-slide-group
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item
          v-for="(deal, n) in deals"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <single-item :key="`deal-${n}`" :itemDetails="deal"></single-item>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <item-details-dialog></item-details-dialog>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import SingleItem from '../category/Item'
  import ItemDetailsDialog from '../item/ItemDetailsDialog'
  export default {
    computed: {
      ...mapGetters({
        deals: 'product/getDeals',
      })
    },

    components: {
      SingleItem,
      ItemDetailsDialog
    },

    mounted(){
      console.log('landing exp')
    },
  }
</script>
