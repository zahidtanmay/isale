<template>
  <v-container>

    <v-row>
      <v-col>
        <div class="font-weight-light text-center" style="font-size: 25px;">My Orders</div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col md="8" v-if="orders.length > 0">
        <template v-for="(order, index) in orders">
          <single-order :orderDetails="order" :orderIndex="index" />
        </template>
      </v-col>

      <v-col v-else>
        <div class="font-weight-light text-center mt-16" style="">No Orders Found</div>
      </v-col>
    </v-row>

    <order-details-dialog/>

  </v-container>

</template>

<script>
  import {mapGetters} from 'vuex'
  import SingleOrder from '~/components/orders/Order.vue'
  import OrderDetailsDialog from '~/components/orders/DetailsDialog.vue'

  export default {
    name: 'MyOrders',

    async middleware({ store, redirect }) {
      await store.dispatch('orders/fetchOrders')
    },

    computed: {
      ...mapGetters({
        orders: 'orders/getOrders'
      })
    },

    data: () => ({

      // orders: [
      //   {
      //     id: 5,
      //     status: 'cancelled',
      //     amount: 120
      //   },
      //   {
      //     id: 8,
      //     status: 'pending',
      //     amount: 450
      //   }
      // ]

    }),

    components: {
      SingleOrder,
      OrderDetailsDialog
    }

  }
</script>

<style>
  .orders-list-text { margin: 0 !important; }
  .orders-list-action { background: #eceaea;}
</style>
