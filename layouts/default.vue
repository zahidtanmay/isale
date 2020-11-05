<template>
  <v-app id="keep">


    <Header/>

    <no-ssr>
      <nav-bar></nav-bar>
    </no-ssr>


    <no-ssr>
      <cart-drawer></cart-drawer>
    </no-ssr>

<!--    <no-ssr>-->
      <v-main>
        <nuxt/>
      </v-main>

<!--      <template slot="placeholder">-->
<!--        <v-container class="fill-height">-->
<!--          <v-row align="center" justify="center" style="position: absolute; top: 50%;left: 50%;">-->
<!--            <v-progress-circular-->
<!--              class="text-center"-->
<!--              :size="72"-->
<!--              :width="6"-->
<!--              color="amber"-->
<!--              indeterminate-->
<!--            ></v-progress-circular>-->
<!--          </v-row>-->
<!--        </v-container>-->

<!--      </template>-->
<!--    </no-ssr>-->

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

    mounted () {
      console.log('hello mounted layout')
      this.$store.dispatch('bootstrap/fetchLayout')
      this.$store.dispatch('bootstrap/fetchCustomFields')
    }
  }
</script>

<style>
  .v-application { font-family: Poppins, sans-serif !important; }
  .v-btn:focus { outline:0; }
</style>
