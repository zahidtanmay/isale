<template>
  <v-container fluid>

    <!--<LandingBanner/>-->

    <LandingCategories/>

    <LandingExplore/>

    <v-footer
      dark
      padless
      class="mt-12"
    >

      <v-card
        flat
        tile
        class="lighten-1 white--text"
        style="background: none"
      >
        <v-card-text class="text-center">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>


        </v-card-text>

        <v-card-text class="white--text pt-0">
          <v-row>
            <v-col cols="12" md="7">{{company.about}}</v-col>
            <v-col cols="12" md="5">
              <div>Mobile: {{company.mobile}}</div>
              <div>Telephone: {{company.telephone}}</div>
              <div>Email: {{company.email}}</div>
              <div>Address: {{company.address}}</div>
              <div>{{company.city}}, {{company.district}}-{{company.zip}}</div>
            </v-col>
          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          {{ new Date().getFullYear() }} — <strong>{{company.name}}</strong>
        </v-card-text>
      </v-card>

    </v-footer>

  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LandingBanner from '~/components/landing/LandingBanner'
  import LandingCategories from '~/components/landing/LandingCategories'
  import LandingExplore from '~/components/landing/LandingExplore'

  export default {
    name: 'Dashboard',
    auth: false,

    components: {
      LandingBanner,
      LandingCategories,
      LandingExplore
    },

    head () {
      return {
        title: 'Home',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },

    async middleware({ store, redirect, route }) {
      await store.dispatch('product/fetchDeals')
    },

    mounted(){
      // console.log('landing index')
    },

    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),

    computed: {
      ...mapGetters({
        company: 'bootstrap/getCompanyDetails'
      })
    }


  }
</script>
