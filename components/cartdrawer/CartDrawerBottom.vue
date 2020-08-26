<template>
  <v-row justify="center" class="ma-5 cart-drawer-place-order-btn" @click="cartTotal > 0 ? $router.push('/checkout'): ''">
    <v-col md="6" class="text-center white-text cart-drawer-place-order-btn-content1">
      Place Order
    </v-col>
    <v-col md="6" class="cart-drawer-place-order-btn-content2">
      <v-icon color="white">mdi-currency-bdt</v-icon>
      <span v-if="cartTotalDiscount > 0" class="text-decoration-line-through">{{cartTotal}}</span>
      <span v-else>{{cartTotal}}</span>
      <span v-if="cartTotalDiscount > 0">{{cartDiscountedTotal}}</span>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CartDrawerBottom',
    computed: {
      ...mapGetters({
        cartTotal: 'cart/getCartTotal',
        cartDiscountedTotal: 'cart/getCartDiscountedTotal',
        cartTotalDiscount: 'cart/getCartTotalDiscount'
      })
    }
  }
</script>

<style>
  .cart-drawer-place-order-btn { cursor: pointer; }
  .cart-drawer-place-order-btn-content1 { background: #ff8182;color: white; }
  .cart-drawer-place-order-btn-content2 { background: #e04f54;color: white; }
</style>
