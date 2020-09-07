<template>
  <v-navigation-drawer v-model="drawer" app clipped right width="300px">

    <v-list two-line subheader>

      <CartDrawerHeader/>

      <template v-for="item in cartItems">

        <CartDrawerItem :item="item"/>

        <v-divider></v-divider>

      </template>

    </v-list>

    <CartDrawerBottom/>

  </v-navigation-drawer>

</template>

<script>
  import { mapGetters } from 'vuex'
  import CartDrawerHeader from '~/components/cartdrawer/CartDrawerHeader'
  import CartDrawerItem from '~/components/cartdrawer/CartDrawerItem'
  import CartDrawerBottom from '~/components/cartdrawer/CartDrawerBottom'

  export default {
    name: 'CartDrawer',

    components: {
      CartDrawerHeader,
      CartDrawerItem,
      CartDrawerBottom
    },

    computed: {

      ...mapGetters({
        cartItems: 'cart/getCartItems',
        cartCount: 'cart/getCartCount',
        cartTotal: 'cart/getCartTotal',
      }),

      drawer: {
        get () {
          return this.$store.state.component.cartDrawer
        },
        set (val) {
          this.$store.commit('component/setCartDrawer', val)
        }
      }
    },

    mounted(){
      console.log('landing cartdra')
    },
  }
</script>
