<template>
  <div>
    <div class="headline text-center my-6">
      What Our Clients Saying
    </div>

    <no-ssr>
      <v-carousel
        cycle
        :height="$vuetify.breakpoint.name === 'xs' ? 400 : 250"
        show-arrows-on-hover
        hide-delimiter-background
        light
      >
        <v-carousel-item v-for="(review, i) in reviews" :key="i">
          <v-row align="center" justify="center">
            <v-col class="pa-0 text-center" cols="12" md="3">
              <v-row class="text-center" align="center" justify="center">
                <v-avatar class="profile" color="grey" size="140">
                  <v-img :src="review.imageUrl"></v-img>
                </v-avatar>
              </v-row>

              <v-row class="text-center" align="center" justify="center">
                <div class="my-4">{{review.name}}</div>
              </v-row>

            </v-col>
            <v-col class="pa-0 my-auto" cols="12" md="9">
              <div :class="['client-review', $vuetify.breakpoint.name === 'xs' ? 'mx-4' : '']">{{review.review}}</div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>

      <template slot="placeholder">
        <v-row justify="center">
          <v-col md="8">
            <v-skeleton-loader
              type="list-item-avatar"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>

    </no-ssr>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        reviews: 'bootstrap/getReviews'
      })
    },
  }
</script>

<style>
  .client-review { font-size: .9rem !important; font-weight: lighter !important; }
</style>
