<template>
  <v-card flat outlined :key="orderDetails.id" class="mb-4">
    <v-card-text class="py-1 text-center">
      <div><v-chip color="primary" outlined>{{status[orderDetails.statusId]}}</v-chip></div>
      <p class="font-weight-bold orders-list-text">Order # {{orderDetails.invoiceId}}</p>
      <p class="orders-list-text"><v-icon small>mdi-currency-bdt</v-icon>{{orderDetails.total}}</p>
    </v-card-text>
    <v-card-actions class="orders-list-action py-0">
      <v-spacer></v-spacer>
      <v-btn color="deep-purple lighten-2" text @click="setOrderDetailsDialog(orderDetails)">View Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {

    name: 'SingleOrder',

    props: ['orderDetails', 'orderIndex'],

    data: () => ({
      status: [
        'Cancelled',
        'Unknown',
        'Pending',
        'Approved'
      ]
    }),

    methods: {

      setOrderDetailsDialog(details) {
        this.$store.commit('orders/SET_ACTIVE_ORDER', details)
        this.$store.commit('component/setOrderDialog', true)
      }

    }

  }
</script>
