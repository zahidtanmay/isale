<template>
  <v-row justify="center">
    <v-col md="8">
      <v-card outlined>
        <v-card-title>
          <span class="headline font-weight-light">Address Book</span>
          <v-spacer />
          <v-btn fab depressed small @click="setAddressDialog({})" color=""><v-icon>mdi-plus</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>


        <template v-if="loader">
          <v-skeleton-loader
            :loading="true"
            height="94"
            type="list-item-two-line"
          >
          </v-skeleton-loader>
        </template>

        <template v-else>
          <template v-for="address in locations">

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{address.address1}}</v-list-item-title>
                <v-list-item-subtitle>{{address.city}}, {{address.district}}, {{address.zip}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="setAddressDialog(address)" icon depressed small color="error"><v-icon>mdi-pencil</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>

          </template>
        </template>



      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileAddressBook',

    data: () => ({

    }),

    computed: {
      ...mapGetters({
        locations: 'profile/getLocations',
        loader: 'profile/getLoader'
      })
    },

    methods: {
      setAddressDialog(address) {
        this.$store.commit('component/setAddressDialog', true)
        this.$store.commit('profile/SET_ACTIVE_ADDRESS', address)
      },
    }
  }
</script>
