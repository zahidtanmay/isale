<template>
  <v-card id="create">


        <v-btn
          v-model="fab"
          dark
          class="ma-2 main-speed-dial d-inline"
          @click="setCartNav"
          height="80px"
        >

          <div class="d-inline" style="background: #55584D;color: #fdd670; width: 100%;">
            <v-row >
              <v-col >
                <div>
                  <v-icon>shopping_cart</v-icon>
                </div>
                <div>
                  <span>{{cartCount}} {{cartCount > 1 ? 'Items' : 'Item'}}</span>
                </div>
              </v-col>

            </v-row>

            <div class="grey lighten-4 grey--text">
              <span><v-icon small>mdi-currency-bdt</v-icon> </span>
              <span v-if="cartTotalDiscount > 0" class="text-decoration-line-through">{{cartTotal}}</span>
              <span v-else>{{cartTotal}}</span>
              <span v-if="cartTotalDiscount > 0">{{cartDiscountedTotal}}</span>
            </div>
          </div>





        </v-btn>

  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }),

    computed: {
      ...mapGetters({
        drawer: 'component/getCartDrawer',
        cartCount: 'cart/getCartCount',
        cartTotal: 'cart/getCartTotal',
        cartDiscountedTotal: 'cart/getCartDiscountedTotal',
        cartTotalDiscount: 'cart/getCartTotalDiscount'
      })
    },


    methods: {
      setCartNav () {
        this.$store.commit('component/setCartDrawer', !this.drawer)
      }
    },

    mounted(){
      console.log('landing speed')
    },

  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  .main-speed-dial {
    position: fixed;
    top: 50%;
    right: 0;
    padding: 0 !important;
  }

</style>
