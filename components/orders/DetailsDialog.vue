<template>

  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline font-weight-light">Order Details</span>
        <v-spacer />
        <v-icon aria-label="Close" @click="dialog = false">mdi-close</v-icon>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <p class="text-center font-weight-medium mb-0 mt-2">Delivery Address</p>
        <template v-if="location(activeOrder.locationId) === -1">
          <p class="text-center mb-0">Location Not Found</p>
        </template>
        <template v-else>
          <p class="text-center mb-0">{{location(activeOrder.locationId).locationName }}</p>
          <p class="text-center mb-0">{{location(activeOrder.locationId).address1}},  {{location(activeOrder.locationId).city }} - {{location(activeOrder.locationId).zip }}</p>
        </template>

      </v-card-text>
      <v-divider></v-divider>
      <template v-for="item in activeOrder.items">
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3" tile>
            <v-img
              class="elevation-6"
              :src="item.imageUrl"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>{{item.quantity}} x <v-icon small>mdi-currency-bdt</v-icon>{{item.unitPrice}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-title><v-icon small>mdi-currency-bdt</v-icon>{{item.total}}</v-list-item-title>
          </v-list-item-action>

        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-card-text class="text-center">
        <v-row class="footer-info-row mt-4">
          <v-col md="8" align="end">Subtotal:</v-col>
          <v-col md="4" align="start"><v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.subTotal}}</v-col>
        </v-row>

        <v-row class="footer-info-row">
          <v-col md="8" align="end">Total:</v-col>
          <v-col md="4" align="start"><v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.total}}</v-col>
        </v-row>

        <v-row class="footer-info-row">
          <v-col md="8" align="end">Paid:</v-col>
          <v-col md="4" align="start"><v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.paidAmount}}</v-col>
        </v-row>

        <v-row class="footer-info-row">
          <v-col md="8" align="end">Due:</v-col>
          <v-col md="4" align="start"><v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.dueAmount}}</v-col>
        </v-row>

        <v-row>
          <v-col cols="12" v-if="activeOrder.statusId == 0 || activeOrder.statusId == 1">
            <v-btn block depressed @click="orderAgain">Order Again</v-btn>
          </v-col>
          <v-col cols="12" v-if="activeOrder.statusId == 2">
            <v-btn block depressed @click="cancelOrder">Cancel Order</v-btn>
          </v-col>
        </v-row>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    name: 'OrderDetailsDialog',

    computed: {
      ...mapGetters({
        activeOrder: 'orders/getActiveOrder',
        locations: 'profile/getLocations'
      }),



      dialog: {

        get () {
          return this.$store.state.component.orderDialog
        },

        set (val) {
          this.$store.commit('component/setOrderDialog', val)
        }

      }

    },

    methods: {
      location (val) {
        const locationId = this.locations.findIndex(location => location.id === val)
        if (locationId > -1) {
          return this.locations[locationId]
        }
        return -1
      },
      orderAgain () {
        this.$store.dispatch('cart/orderAgain', this.activeOrder.items)
      },
      cancelOrder () {
        this.$store.dispatch('cart/cancelOrder', this.activeOrder)
      }
    }

  }
</script>
