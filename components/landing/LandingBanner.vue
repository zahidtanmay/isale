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
        <v-sheet class="py-3">
          <v-row dense justify="center" align="center">
            <v-col md="8">
              <v-skeleton-loader
                type="image"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-sheet>
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
