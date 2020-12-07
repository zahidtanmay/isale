<template>
  <v-row>
<!--    {{banners}}-->
    <v-col>
      <v-card :class="[$vuetify.breakpoint.name === 'xs' ? '' : 'mx-16']" flat transition="scale-transition">
<!--        <v-img-->
<!--          :src="card"-->
<!--          class="white&#45;&#45;text align-end"-->
<!--          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"-->
<!--          height="200px"-->
<!--        >-->
<!--        </v-img>-->
        <template v-if="loader">
          <v-skeleton-loader
            type="image"
          ></v-skeleton-loader>
        </template>

        <template v-else>
          <v-carousel
            cycle
            height="200"
            show-arrows-on-hover
            hide-delimiters
            transition="slide-x-transition"
          >
            <v-carousel-item
              v-for="(banner, i) in banners"
              :key="i"
              :src="banner"
            >
            </v-carousel-item>
          </v-carousel>
        </template>

      </v-card>
    </v-col>
  </v-row>



</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CategoryBanner',
    data: () => ({
      attrs: {
        class: 'mb-6',
        boilerplate: true
      },
    }),
    computed: {
      ...mapGetters({
        banners: 'product/getBanners',
        loader: 'product/getLoader'
      })
    }
  }
</script>
