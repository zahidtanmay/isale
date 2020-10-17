<template>
  <v-container>

    <v-row>
      <v-col>
        <div class="font-weight-light text-center" style="font-size: 25px;">My Orders</div>
      </v-col>
    </v-row>

    <v-row justify="center">

      <v-col md="8" v-if="loader">
        <template v-for="i in 5">
          <v-skeleton-loader
            :loading="true"
            height="94"
            type="list-item-two-line"
          >
          </v-skeleton-loader>
        </template>
      </v-col>

      <v-col md="8" v-else>
        <template v-for="(order, index) in orders">
          <single-order :orderDetails="order" :orderIndex="index" />
        </template>
        <template v-if="orders.length === 0">
          You have no order.
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

    head () {
      return {
        title: 'MyOrders',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },

    middleware({ store, redirect, $auth }) {
      // If the user is not authenticated
      if (!$auth.loggedIn) {
        return redirect('/login')
      }
    },

    computed: {
      ...mapGetters({
        orders: 'orders/getOrders',
        loader: 'orders/getLoader',
        currentTotal: 'orders/getCurrentOrderCount',
        totalOrders: 'orders/getTotalOrders',
      })
    },

    async mounted() {
      await this.$store.dispatch('profile/fetchLocations')
      await this.$store.dispatch('orders/fetchOrders')

      while(!this.scrollCheck() && this.currentTotal !== this.totalOrders) {
        if (this.currentTotal < this.totalOrders) {
          await this.$store.dispatch('orders/loadMoreOrders')
        }
      }
    },

    components: {
      SingleOrder,
      OrderDetailsDialog
    },

    methods: {
      onScroll ({e}) {
        if (this.bottomVisible() && this.currentTotal < this.totalOrders && !this.loader) {
          this.$store.dispatch('orders/loadMoreOrders')
        }
      },

      bottomVisible () {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        let pageHeight = null
        if (document.documentElement.clientWidth <= 800 && document.documentElement.clientHeight <= 600) {
          pageHeight = document.documentElement.scrollHeight - 60
        } else {
          pageHeight = document.documentElement.scrollHeight
        }

        const bottomOfPage = visible + scrollY + 150 >= pageHeight
        return bottomOfPage || pageHeight < visible
      },

      scrollCheck () {
        const visible = document.documentElement.clientHeight
        let pageHeight = null
        if (document.documentElement.clientWidth <= 800 && document.documentElement.clientHeight <= 600) {
          pageHeight = document.documentElement.scrollHeight - 60
        } else {
          pageHeight = document.documentElement.scrollHeight
        }

        return pageHeight > visible
      }
    },

    created () {
      window.addEventListener('scroll', this.onScroll)
    },

    destroyed () {
      window.removeEventListener('scroll', this.onScroll)
    }

  }
</script>

<style>
  .orders-list-text { margin: 0 !important; }
  .orders-list-action { background: #eceaea;}
</style>
