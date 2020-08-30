<template>
  <v-container fluid>

    <!--<LandingBanner/>-->

    <LandingCategories/>

    <LandingExplore/>

    <div class="headline text-center my-6">
      What Our Clients Saying
    </div>

    <ClientsSaying/>

    <Footer/>


  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LandingBanner from '~/components/landing/LandingBanner'
  import LandingCategories from '~/components/landing/LandingCategories'
  import LandingExplore from '~/components/landing/LandingExplore'
  import ClientsSaying from '~/components/landing/ClientsSaying'
  import Footer from '~/components/landing/Footer'

  export default {
    name: 'Dashboard',
    auth: false,

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

    async middleware({ store, redirect, route }) {
      await store.dispatch('product/fetchDeals')
    },

    mounted(){
      // console.log('landing index')
    },


  }
</script>
