<template>
  <v-carousel
    cycle
    height="300"
    show-arrows-on-hover
    hide-delimiters
  >
    <v-carousel-item
      v-for="(banner, i) in banners"
      :key="i"
      :src="banner"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>

  import {mapGetters} from 'vuex'
  export default {
    data: () => ({
    }),

    computed: {
      ...mapGetters({
        banners: 'bootstrap/getBanners'
      })
    },

    mounted(){
      console.log('landing banner')
    },
  }
</script>
