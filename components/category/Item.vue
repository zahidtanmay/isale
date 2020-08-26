<template>
  <v-col
    :class="[$vuetify.breakpoint.name === 'xs' ? 'cat-s-i' : 'category-single-item']"
  >

    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card flat class="mx-auto" max-width="220px" height="320px">
          <v-img :src="itemDetails.imageUrl" width="210px" height="180px"></v-img>

          <v-card-text class="text-center">
            <div class="item-name-text mb-4">{{itemDetails.name}}</div>
            <div class="primary--text">{{itemDetails.unit}}</div>
            <div class="primary--text" v-if="discount > 0">
              <v-icon small>mdi-currency-bdt</v-icon> <span  class="text-decoration-line-through">{{itemDetails.price}}</span>
              <span>{{parseInt(itemDetails.price) - discount}}</span></div>
            <div class="primary--text" v-else><v-icon small>mdi-currency-bdt</v-icon> {{itemDetails.price}}</div>
          </v-card-text>

          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358" z-index="0">

              <div class="display-2 text-center" v-if="quantity > 0">{{quantity}} added</div>
              <div class="display-2 text-center" v-else>Add to cart</div>

              <div class="text-center">
                <v-btn small depressed color="grey" class="item-overlay-button mt-16" width="100%" v-if="hover" @click="setItemDetails(itemDetails, quantity)">
                  view details
                </v-btn>
              </div>

            </v-overlay>
          </v-fade-transition>

        </v-card>
      </template>
    </v-hover>

    <v-row v-if="quantity > 0" class="mt-1">

      <v-col xs="3" class="py-0">
        <v-btn depressed small width="100%" @click="removeFromCart">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>

      <v-col xs="5" class="py-0 text-center">{{quantity}}</v-col>

      <v-col xs="3" class="py-0">
        <v-btn depressed small width="100%" @click="addToCart">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

    </v-row>

    <v-btn depressed small width="100%" class="mt-1" v-else @click="addToCart">Add to cart</v-btn>

  </v-col>
</template>

<script>

  import { mapGetters } from 'vuex'
  import { mdiCurrencyBdt } from '@mdi/js'

  export default {
    name: 'SingleProductItem',

    props: ['itemDetails'],

    components: {
      mdiCurrencyBdt
    },

    data: () => ({
      quantity: 0,
    }),

    methods: {

      setItemDetails (item, quantity) {
        item.quantity = quantity
        this.$store.commit('product/SET_ACTIVE_PRODUCT', { product: item, customFields: this.$store.state.bootstrap.customFields })
        this.$store.commit('component/setItemDetailsDialog', true)
      },

      async addToCart () {
        await this.$store.dispatch('cart/addToCart', { item: this.itemDetails, quantity: this.quantity, discount: this.discount, cartPre: this.cartPre })
      },

      async removeFromCart () {
        await this.$store.dispatch('cart/removeFromCart', { item: this.itemDetails, quantity: this.quantity, cartPre: this.cartPre })
      },

      itemCountSet (val) {
        if (`${this.itemDetails.id}` in val) {
          const item = val[`${this.itemDetails.id}`]
          this.quantity = item.quantity
        } else {
          this.quantity = 0
        }
      },

    },

    computed: {
      ...mapGetters({
        cartItems: 'cart/getCartItems'
      }),

      cartPre () {
        return this.$route.params.category
      },

      discount () {
        const customFields = this.itemDetails.customFields
        const id = customFields.findIndex(field => parseInt(field.typeId) === 4)
        return id > -1 ? parseInt(customFields[id].value) : 0
      }

    },

    mounted () {
      this.itemCountSet(this.cartItems)
    },

    watch: {
      cartItems: {
        deep: true,
        handler (val) {
          this.itemCountSet(val)
        }

      }

    },


  }

</script>

<style>
  .category-single-item { max-width: 210px !important; }
  .item-name-text { min-height: 32px;
    font-size: .8rem !important;
    font-weight: 400;
    letter-spacing: 0.03125em !important;
    line-height: 1rem;
  }
</style>
