<template>
  <v-col cols="12">

    <div class="font-weight-light mt-1" style="font-size: 25px">Checkout</div>

    <v-row justify="center">

      <v-col md="8">

        <v-card flat class="text-center">

          <v-card-title class="title font-weight-regular text-center" justify="center" align="center">{{ currentTitle }}</v-card-title>

          <v-window v-model="step">

            <v-window-item :value="1"><Address/></v-window-item>

            <v-window-item :value="2"><DeliveryTime/></v-window-item>

            <v-window-item :value="3"><OrderConfirm/></v-window-item>

          </v-window>

          <v-divider></v-divider>

          <v-card-actions>

            <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>

            <v-spacer></v-spacer>

            <v-btn
              v-if="step === 1"
              :disabled="(step === 1 && !checkoutLocation)"
              color="primary"
              depressed
              @click="step++"
            >
              Next
            </v-btn>

            <v-btn
              v-if="step === 2"
              color="error"
              depressed
              :disabled="!deliveryDay && !deliveryTime"
              @click="placeOrder"
            >
              Confirm Order
            </v-btn>

          </v-card-actions>
        </v-card>

      </v-col>

    </v-row>

    <AddressDialog/>

  </v-col>

</template>


<script>
  import {mapGetters} from 'vuex'
  import Address from '~/components/checkout/Address'
  import DeliveryTime from '~/components/checkout/DeliveryTime'
  import OrderConfirm from '~/components/checkout/OrderConfirm'
  import AddressDialog from '~/components/address/AddressDialog.vue'

  export default {
    name: 'CheckoutForm',

    components: {
      Address,
      DeliveryTime,
      OrderConfirm,
      AddressDialog
    },

    middleware({ store, redirect }) {

      store.dispatch('checkout/fetchLedgers')
      store.dispatch('profile/fetchLocations')
      store.dispatch('bootstrap/fetchAreas')
    },

    data: () => ({
      step: 1,
      steps: ['Address', 'Select Delivery Date Time', 'Confirm'],
    }),

    computed: {
      ...mapGetters({
        checkoutLocation: 'checkout/getCheckoutLocation',
        deliveryDay: 'checkout/getDeliveryDay',
        deliveryTime: 'checkout/getDeliveryTime'
      }),

      currentTitle () {
        switch (this.step) {
          case 1: return 'Address'
          case 2: return 'Select Delivery Date Time'
          default: return 'Order Summary'
        }
      },
    },

    methods: {
      async placeOrder() {
        await this.$store.dispatch('checkout/PlaceOrder')
        this.step++
      }
    }
  }
</script>

<style>
  .checkout-stepper {
    box-shadow: none !important;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
  .step-1 {
    border: 0 !important;
  }
</style>
