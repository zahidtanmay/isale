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

          <!--<v-card-->
            <!--outlined-->
            <!--class="text-center mx-2"-->
            <!--nuxt-->
            <!--to="/discount1-cf"-->
            <!--hover-->
            <!--ripple-->
            <!--width="200"-->
            <!--height="300"-->
          <!--&gt;-->

            <!--<v-card-title class="text-center" justify="center">-->
              <!--<span class="headline font-weight-light">{{deal.name}}</span>-->
              <!--<v-spacer></v-spacer>-->

            <!--</v-card-title>-->

            <!--<v-card-text>-->
              <!--<v-img src="https://static.carfromjapan.com/d6f08b8d-2977-4fba-8a01-353889bf71c9">-->

              <!--</v-img>-->
            <!--</v-card-text>-->
          <!--</v-card>-->
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
