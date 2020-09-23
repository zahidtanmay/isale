<template>
  <v-container fluid>

    <no-ssr>
      <LandingBanner/>

      <template slot="placeholder">
        <v-skeleton-loader
          height="300"
          type="image"
        ></v-skeleton-loader>
      </template>
    </no-ssr>

    <LandingCategories/>

    <LandingExplore/>

    <no-ssr>
      <ClientsSaying/>
    </no-ssr>


    <Footer/>


  </v-container>
</template>

<script>
  import LandingBanner from '~/components/landing/LandingBanner'
  import LandingCategories from '~/components/landing/LandingCategories'
  import LandingExplore from '~/components/landing/LandingExplore'
  import ClientsSaying from '~/components/landing/ClientsSaying'
  import Footer from '~/components/landing/Footer'

  export default {
    name: 'Dashboard',
    auth: false,

    data: () => ({
      inject: ['theme'],
    }),

    components: {
      LandingBanner,
      LandingCategories,
      LandingExplore,
      ClientsSaying,
      Footer
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

    mounted(){
      console.log('xoxo')
      this.$store.dispatch('product/fetchDeals')
    },


  }
</script>
