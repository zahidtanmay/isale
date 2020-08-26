<template>
  <v-card-text>

    <template v-if="locations.length > 0">
      <v-card flat outlined v-if="!locationChange" class="mb-4">
        <v-card-title>
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title>{{locations[selectedLocation].address1}}</v-list-item-title>
              <v-list-item-subtitle>{{locations[selectedLocation].city}}, {{locations[selectedLocation].district}}, {{locations[selectedLocation].zip}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn  depressed small @click="locationChange = !locationChange">
                change
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card-title>
      </v-card>

      <template v-else>
        <v-list dense class="checkout-location-select mb-4">
          <v-list-item-group v-model="selectedLocation">
            <template v-for="(address, i) in locations">

              <v-list-item
                :key="`address-${i}`"
                :value="address"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="deep-purple accent-4"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="address.address1"></v-list-item-title>
                    <v-list-item-subtitle>{{address.city}}, {{address.district}}, {{address.zip}}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider v-if="i < locations.length - 1" :key="`divider-${i}`"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>

        <v-btn block color="warning" @click="setAddressDialog({})">Add Location</v-btn>
      </template>

      <span class="caption grey--text text--darken-1">This is the address you will get your products</span>
    </template>

    <template v-else>
      <v-btn block color="warning" @click="setAddressDialog({})">Add Location</v-btn>
    </template>


  </v-card-text>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'AddressStep',
    data: () => ({
      locationChange: false,
      selected: null
    }),

    computed: {
      ...mapGetters({
        locations: 'profile/getLocations',
      }),
      selectedLocation: {
        get() {
          const id = this.selected != null ? this.selected : this.locations.length - 1
          this.$store.commit('checkout/SET_CHECKOUT_LOCATION', this.locations[id])
          return id
        },
        set(val) {
          const id = this.locations.findIndex(location => location.id === val.id)
          this.$store.commit('checkout/SET_CHECKOUT_LOCATION', this.locations[id])
          this.selected = id
          this.locationChange = false
        }
      }
    },

    methods: {
      async setAddressDialog(address) {
        await this.$store.commit('component/setAddressDialog', true)
        await this.$store.commit('profile/SET_ACTIVE_ADDRESS', address)
        this.locationChange = false
      },
    }
  }
</script>

<style>
  .checkout-location-select { max-height: 250px !important;overflow: auto !important; }
</style>
