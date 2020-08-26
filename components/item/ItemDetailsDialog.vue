<template>
  <v-dialog
    v-model="dialog"
    width="900"
    height="1000"
  >

    <v-card >
      <v-card-title>
        <v-spacer />
        <v-icon aria-label="Close" @click="dialog = false">mdi-close</v-icon>
      </v-card-title>
      <v-container>

        <v-row>
          <v-col md="6">

            <Zoomer :imgSrc="item.imageUrl" :key="item.name" />

          </v-col>

          <v-col md="6"><v-card-text>


            <div class="headline mb-1 text-center">{{item.name}}</div>

            <div class="text-center">
              <template v-for="(field, fieldIndex) in item.customFields" >
                <span v-if="field.typeId == 2">{{field.name}}: {{field.convertedValue}}</span>
                <span v-if="field.typeId == 2 && fieldIndex < item.customFields.length - 1">, </span>
              </template>
            </div>

            <div class="mb-4 text-center title" v-if="item.itemDetailsDiscount > 0">
              <v-icon>mdi-currency-bdt</v-icon>
              <span class="text-decoration-line-through error--text">{{item.price}}</span>
              <span class="error--text">{{item.itemDetailsDiscountedPrice}}</span>
              <v-chip class="ma-2" color="orange" label outlined>
                {{item.itemDetailsDiscount}} <v-icon>mdi-currency-bdt</v-icon> OFF
              </v-chip>
            </div>
            <div class="mb-4 text-center title" v-else>
              <v-icon>mdi-currency-bdt</v-icon>
              <span class="error--text">{{item.price}}</span>
            </div>

            <v-row class="mb-4">

              <v-col xs="3" class="py-0">
                <v-btn depressed small width="100%" @click="removeFromCart">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>

              <v-col xs="5" class="py-0 text-center">{{item.quantity}}</v-col>

              <v-col xs="3" class="py-0">
                <v-btn depressed small width="100%" @click="addToCart">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>

            </v-row>


            <div class="item-details-description font-weight-thin">{{item.description}}</div>
          </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Zoomer from './Zoomer'

  export default {
    name: 'ItemDetailsDialog',

    components: {
      Zoomer
    },

    computed: {
      ...mapGetters({
        item: 'product/getActiveProduct',
        customFields: 'bootstrap/getCustomFields'
      }),

      dialog: {
        get () {
          return this.$store.state.component.itemDetailsDialog
        },

        set (val) {
          this.$store.commit('component/setItemDetailsDialog', val)
        }
      },

    },

    methods: {
      async addToCart () {
        await this.$store.dispatch('cart/addToCart', { item: this.item, quantity: this.item.quantity, cartPre: this.cartPre })
      },

      async removeFromCart () {
        await this.$store.dispatch('cart/removeFromCart', { item: this.item, quantity: this.item.quantity, cartPre: this.cartPre })
      },
    }

  }
</script>

<style>
  .item-details-description { color: rgba(0,0,0,1);}

</style>
