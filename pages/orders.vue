<template>
  <v-container>

    <v-row>
      <v-col>
        <div class="font-weight-light text-center" style="font-size: 25px;">My Orders</div>
      </v-col>
    </v-row>

    <v-row justify="center">

      <v-col md="8" v-if="loader">

        <v-skeleton-loader
          :loading="true"
          height="94"
          type="list-item-two-line"
        >
        </v-skeleton-loader>
      </v-col>

      <v-col md="8" v-else>
        <template v-for="(order, index) in orders">
          <single-order :orderDetails="order" :orderIndex="index" />
        </template>
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
    title: 'Orders',

    mounted() {
      this.$store.dispatch('orders/fetchOrders')
    },

    computed: {
      ...mapGetters({
        orders: 'orders/getOrders',
        loader: 'orders/getLoader'
      })
    },

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
