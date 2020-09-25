<template>
  <v-dialog v-model="dialog" width="900">

    <v-card>

      <v-btn @click="dialog = false" fab depressed small top right absolute style="top:3px;right: 3px;"><v-icon >mdi-close</v-icon></v-btn>

      <v-container>

        <v-row>

          <v-col md="6"><Zoomer :imgSrc="item.imageUrl" :key="item.name" /></v-col>

          <v-col md="6">

            <v-card-text class="py-0">

              <div class="headline mb-1 text-center">{{item.name}}</div>

              <!--<div class="text-center">-->
                <!--<template v-for="(field, fieldIndex) in customFields" >-->
                  <!--<span v-if="field.typeId == 2">{{field.name}}: {{field.convertedValue}}</span>-->
                  <!--<span v-if="field.typeId == 2 && fieldIndex < customFields.length - 1">, </span>-->
                <!--</template>-->
              <!--</div>-->

              <div class="mb-1 text-center title" v-if="item.itemDetailsDiscount > 0">
                <v-icon>mdi-currency-bdt</v-icon>
                <span class="text-decoration-line-through error--text">{{item.price}}</span>
                <span class="error--text">{{item.itemDetailsDiscountedPrice}}</span>
                <v-chip class="ma-2" color="orange" label outlined>
                  {{item.itemDetailsDiscount}} <v-icon>mdi-currency-bdt</v-icon> OFF
                </v-chip>
              </div>
              <div class="mb-1 text-center title" v-else>
                <v-icon>mdi-currency-bdt</v-icon>
                <span class="error--text">{{item.price}}</span>
              </div>

              <v-row class="mb-1">

                <v-col xs="3" class="py-0">
                  <v-btn depressed small width="100%" @click="removeFromCart" :disabled="item.quantity <= 0">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>

                <v-col xs="6" class="py-0 text-center">{{item.quantity}}</v-col>

                <v-col xs="3" class="py-0">
                  <v-btn depressed small width="100%" @click="addToCart">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>

              </v-row>

              <v-row>
                <v-col cols="12" class="pt-1">
                  <v-btn block depressed @click="buyNow">Buy Now</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                  <v-tab v-for="page in items" :key="page"> {{ page }}</v-tab>
                </v-tabs>
              </v-row>

              <v-row>
                <template v-if="tab === 0">
                  <v-card color="basil" flat class="specification-card"><v-card-text>{{ item.description }}</v-card-text></v-card>
                </template>

                <template v-if="tab === 1">
                  <v-card color="basil" flat style="width: 100%;" class="specification-card">
                    <v-card-text>
                    <template v-for="(field, fieldIndex) in customFields" >
                      <v-row>
                        <v-col md="3" align="end" class="py-0">{{field.name}}:</v-col>
                        <v-col md="9" align="start" clsss="mx-2" style="padding: 0;">{{field.convertedValue}}</v-col>
                      </v-row>

                    </template>
                  </v-card-text>
                  </v-card>

                </template>
              </v-row>
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

    data: () => ({
      tab: null,
      items: ['Description', 'Specification' ],
    }),

    components: {
      Zoomer
    },

    computed: {
      ...mapGetters({
        item: 'product/getActiveProduct',
        // customFields: 'bootstrap/getCustomFields'
      }),

      dialog: {
        get () {
          return this.$store.state.component.itemDetailsDialog
        },

        set (val) {
          this.$store.commit('component/setItemDetailsDialog', val)
        }
      },

      customFields () {
        let fields = this.item.customFields || []
        fields = fields.filter(field => field.typeId == 2)
        return fields
      }

    },

    methods: {
      async addToCart () {
        await this.$store.dispatch('cart/addToCart', { item: this.item, quantity: this.item.quantity, cartPre: this.cartPre })
      },

      async removeFromCart () {
        await this.$store.dispatch('cart/removeFromCart', { item: this.item, quantity: this.item.quantity, cartPre: this.cartPre })
      },

      async buyNow() {
        await this.$store.dispatch('cart/buyNow', { item: this.item, quantity: this.item.quantity, cartPre: this.cartPre })
      }
    },

  }
</script>

<style>
  .item-details-description { color: rgba(0,0,0,1);}
  .specification-card { max-height: 143px !important; overflow: auto !important; }
</style>
