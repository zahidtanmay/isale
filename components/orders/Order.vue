<template>
  <v-card flat outlined :key="orderDetails.id" class="mb-4">
    <v-list-item dense>
      <v-list-item-content>
        <v-list-item-title>Order # {{orderDetails.invoiceId}}</v-list-item-title>
        <v-list-item-subtitle>Total: <v-icon small>mdi-currency-bdt</v-icon>{{orderDetails.total}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-chip color="primary" outlined>{{status[orderDetails.statusId]}}</v-chip>
      </v-list-item-action>

    </v-list-item>

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
