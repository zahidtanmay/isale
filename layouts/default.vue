<template>
  <v-app id="keep">

    <no-ssr>
      <Header/>
    </no-ssr>


    <no-ssr>
      <nav-bar></nav-bar>
    </no-ssr>


    <cart-drawer></cart-drawer>

    <v-main>
      <!--<no-ssr>-->
        <nuxt/>
      <!--</no-ssr>-->

    </v-main>

    <speed-dial></speed-dial>

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
      CartDrawer
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
