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
        <p class="text-center mb-0">Dhaka, Bangladesh</p>

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
        <div>Subtotal: <v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.subTotal}}</div>
        <div>Total: <v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.total}}</div>
        <div>Paid Amount: <v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.paidAmount}}</div>
        <div>Due Amount: <v-icon small>mdi-currency-bdt</v-icon>{{activeOrder.dueAmount}}</div>
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
        activeOrder: 'orders/getActiveOrder'
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

  }
</script>
