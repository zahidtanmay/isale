<template>
  <div>
    <no-ssr>

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

      <template slot="placeholder">
        <v-row align="center" justify="center">
          <v-col md="8">
            <v-sheet
              :color="`grey lighten-2`"
              class="pa-3"
              style="min-height: 300px"
            >
            </v-sheet>
          </v-col>
        </v-row>

      </template>
    </no-ssr>
  </div>

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
  }
</script>
