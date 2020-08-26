<template>
  <v-container fluid>
    <div class="pa-4 text-center">
      <h3 class="title font-weight-light mb-2">Your Order number #{{orderId}}</h3>
      <h3 class="title font-weight-light mb-2">Your Order is placed</h3>
      <span class="caption grey--text">Please pay with cash on delivery</span>
    </div>

    <v-row>
      <v-col md="6">

          <v-card outlined>

            <v-card-title>
              Preferred Delivery Address
            </v-card-title>
            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title>{{selectedLocation.address1}}</v-list-item-title>
                <v-list-item-subtitle>{{selectedLocation.city}}, {{selectedLocation.district}}, {{selectedLocation.zip}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>



            <v-card-title>
              Preferred Delivery Time
            </v-card-title>
            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title>{{deliveryDay}}</v-list-item-title>
                <v-list-item-subtitle>{{deliveryTime.title}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>

      </v-col>

      <v-col md="6">
        <v-card outlined>

          <v-card-title>
            Summary
          </v-card-title>

          <v-card-text>
            <div>Subtotal: {{checkoutDetails['total']}}</div>
            <template v-for="(ledger, index) in ledgers">
              <div>{{ledger.name}}: {{ledger.value}}</div>
            </template>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'OrderConfirm',
    computed: {
      ...mapGetters({
        locations: 'profile/getLocations',
        selectedLocation: 'checkout/getCheckoutLocation',
        deliveryDay: 'checkout/getDeliveryDay',
        deliveryTime: 'checkout/getDeliveryTime',
        ledgers: 'checkout/getLedgers',
        cartTotal: 'cart/getCartTotal',
        orderId: 'checkout/getOrderId',
        checkoutDetails: 'checkout/getCheckoutDetails'
      })
    }
  }
</script>
