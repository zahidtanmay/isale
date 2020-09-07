<template>
  <v-app id="keep">

    <no-ssr>
      <Header/>

      <template slot="placeholder">
        <place-holder-header></place-holder-header>
      </template>
    </no-ssr>


    <no-ssr>
      <nav-bar></nav-bar>

      <template slot="placeholder">
        <place-holder-nav-bar></place-holder-nav-bar>
      </template>
    </no-ssr>

    <no-ssr>
      <cart-drawer></cart-drawer>
    </no-ssr>


    <v-main>
        <nuxt/>
    </v-main>

    <speed-dial></speed-dial>

  </v-app>
</template>

<script>
  import Header from '~/components/layout/Header.vue'
  import PlaceHolderHeader from '~/components/placeholder/PlaceholderHeader.vue'

  import NavBar from '~/components/layout/NavBar.vue'
  import PlaceHolderNavBar from '~/components/placeholder/PlaceHolderNavbar.vue'

  import SpeedDial from '~/components/layout/SpeedDial.vue'
  import CartDrawer from '~/components/layout/CartDrawer.vue'

  export default {
    name: 'DefaultLayout',

    props: {
      source: String,
    },

    components: {
      Header,
      NavBar,
      SpeedDial,
      CartDrawer,
      PlaceHolderHeader,
      PlaceHolderNavBar
    },

    mounted(){
      console.log('layout index')
    },

    data: () => ({

    }),
  }
</script>

<style>
  .v-application { font-family: Poppins, sans-serif !important; }
  .v-btn:focus { outline:0; }
</style>
