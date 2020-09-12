<template>
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

      <v-card-text class="white--text pt-0 footer-content">
        <v-row>
          <v-col cols="12" md="8">{{company.about}}</v-col>
          <v-col cols="12" md="4" :class="[$vuetify.breakpoint.name === 'xs' ? 'mx-4' : '']">

            <v-row class="footer-info-row">
              <v-col md="4">Mobile:</v-col>
              <v-col md="8">{{company.mobile}}</v-col>
            </v-row>

            <v-row class="footer-info-row">
              <v-col md="4">Telephone:</v-col>
              <v-col md="8">{{company.telephone}}</v-col>
            </v-row>

            <v-row class="footer-info-row">
              <v-col md="4">Email:</v-col>
              <v-col md="8">{{company.email}}</v-col>
            </v-row>

            <v-row class="footer-info-row">
              <v-col md="4">Address:</v-col>
              <v-col md="8">{{company.address}}, {{company.city}}, {{company.district}}-{{company.zip}}</v-col>
            </v-row>

          </v-col>
        </v-row>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text text-center">
        {{ new Date().getFullYear() }} — <strong>{{company.name}}</strong>
      </v-card-text>
    </v-card>

  </v-footer>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
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


<style>
  .footer-info-row .col:first-child {
    padding: 0 !important;
    /*line-height: 1px !important;*/
  }

  .footer-info-row .col:nth-child(2) {
    padding-left: 10px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-right: 0 !important;

    /*line-height: 1px !important;*/
  }

  .footer-content { font-size: .85rem !important; font-weight: lighter !important; }
</style>
