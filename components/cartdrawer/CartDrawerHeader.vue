<template>

  <v-row class="cart-drawer-header">

    <v-col class="ml-2 my-auto cart-drawer-header-text">
      <div justify="center" align="start"><v-icon>shopping_cart</v-icon> {{cartCount}} {{cartCount > 0 ? 'Items' : 'Item'}} added</div>
    </v-col>

    <v-col>
      <div justify="center" align="end" ><v-btn fab x-small  @click="setCartDrawer" icon><v-icon>mdi-close</v-icon></v-btn></div>
    </v-col>

  </v-row>

</template>

<script>

  import { mapGetters } from 'vuex'
  export default {
    name: 'CartDrawerHeader',

    props: ['cartCountData'],

    computed: {
      ...mapGetters({
        cartCount: 'cart/getCartCount',
      })
    },

    methods: {

      setCartDrawer () {
        this.$store.commit('component/setCartDrawer', false)
      }

    }
  }

</script>

<style>
  .cart-drawer-header { background: #f5f5f5 !important; }
  .cart-drawer-header-text { font-size: .9rem !important; }
</style>
