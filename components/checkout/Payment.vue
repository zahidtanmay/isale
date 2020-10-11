<template>

    <v-container class="pa-1">
      <v-item-group
        v-model="paymentMethod"
      >
        <v-row>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            md="6"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                height="150"
                class="pa-2"
                @click="toggle"
              >

                <v-row  justify="end">
                  <v-btn
                    icon
                    dark
                    color="green"
                  >
                    <v-icon>
                      {{ active ? 'mdi-check-circle' : '' }}
                    </v-icon>
                  </v-btn>
                </v-row>


                <v-card-text>{{item.text}}</v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
</template>


<script>

export default {
  data: () => ({
    items: [
      {
        text: 'Cash on Delivery',
        val: 1
      },
      {
        text: 'Bkash',
        val: 2
      },
      {
        text: 'Debit / Credit Card',
        val: 3
      },
    ],
  }),

  computed: {
    paymentMethod: {
      get () {
        return this.$store.state.checkout.paymentMethod
      },
      set (val) {
        this.$store.commit('checkout/SET_PAYMENT_METHOD', val)
      }
    }
  }
}
</script>
