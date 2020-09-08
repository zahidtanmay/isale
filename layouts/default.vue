<template>
  <v-app id="keep">


    <Header/>

    <nav-bar></nav-bar>

    <no-ssr>
      <cart-drawer></cart-drawer>
    </no-ssr>


    <v-main>
      <no-ssr>
        <nuxt/>
      </no-ssr>
    </v-main>

    <no-ssr>
      <speed-dial></speed-dial>
    </no-ssr>


  </v-app>
</template>

<script>
  import Header from '~/components/layout/Header.vue'
  import NavBar from '~/components/layout/NavBar.vue'
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
    },

    data: () => ({

    }),
  }
</script>

<style>
  .v-application { font-family: Poppins, sans-serif !important; }
  .v-btn:focus { outline:0; }
</style>
