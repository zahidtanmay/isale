<template>
  <v-list-item class="grow">

    <v-row align="center" justify="start" class="cart-drawer-item-action-row">
      <v-btn icon x-small @click="addToCart(item)"><v-icon color="warning">mdi-chevron-up</v-icon></v-btn>
      <span class="font-weight-light ma-auto cart-drawer-item-action-count">{{item.quantity}}</span>
      <v-btn icon x-small @click="removeFromCart(item)"><v-icon color="warning">mdi-chevron-down</v-icon></v-btn>
    </v-row>

    <v-list-item-avatar size="30" tile class="pr-1">
      <v-img :src="item.imageUrl"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-subtitle class="cart-drawer-item-content-title">{{item.name}}</v-list-item-subtitle>
      <v-list-item-subtitle class="cart-drawer-item-content-subtitle"><v-icon x-small>mdi-currency-bdt</v-icon>
        <span v-if="item.discount > 0" class="text-decoration-line-through">{{item.price}}</span>
        <span v-else>{{item.price}}</span>
        <span v-if="item.discount > 0">{{item.discountedPrice}}</span>
        / {{item.unit}}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-row align="center" justify="end" class="cart-drawer-item-right-row">
      <span><v-icon x-small>mdi-currency-bdt</v-icon></span>
      <span class="subheading mr-2 font-weight-light text-decoration-line-through" v-if="item.totalDiscount > 0">{{item.total}}</span>
      <span class="subheading mr-2 font-weight-light" v-else>{{item.total}}</span>
      <span class="subheading mr-2 font-weight-light" v-if="item.totalDiscount > 0">{{item.discountedTotal}}</span>
      <v-btn icon x-small @click="discardFromCart(item)"><v-icon  color="error">mdi-close</v-icon></v-btn>
    </v-row>
  </v-list-item>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartDrawerItem',
    props: ['item'],

    computed: {

      ...mapGetters({
        cartItems: 'cart/getCartItems',
        cartCount: 'cart/getCartCount',
        cartTotal: 'cart/getCartTotal',
      }),
    },

    methods: {

      async addToCart (item) {
        await this.$store.dispatch('cart/addToCart', { item: item, quantity: item.quantity })
      },

      async removeFromCart (item) {
        await this.$store.dispatch('cart/removeFromCart', { item: item, quantity: item.quantity })
      },

      async discardFromCart(item) {
        await this.$store.dispatch('cart/discardFromCart', item)
      }
    }
  }
</script>

<style>
  .cart-drawer-item-action-row { max-width: 30px;display: grid; }
  .cart-drawer-item-action-count { font-size: .75rem; }
  .cart-drawer-item-content-title { font-size: .8rem; }
  .cart-drawer-item-content-subtitle { font-size: .75rem; }
  .cart-drawer-item-right-row { max-width: 80px; }
</style>
