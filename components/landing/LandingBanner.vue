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
      reverse-transition="fade-transition"
      transition="fade-transition">
    </v-carousel-item>
  </v-carousel>
</template>

<script>

  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'Food',
          'Baby Care',
          'Grocery',
          'Fish',
          'Vegetables',
        ],
      }
    },

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
