<template>
  <v-carousel
    cycle
    :height="$vuetify.breakpoint.name === 'xs' ? 400 : 250"
    show-arrows-on-hover
    hide-delimiter-background
    light
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-row align="center" justify="center">
        <v-col class="pa-0 text-center" cols="12" md="3">
          <v-row class="text-center" align="center" justify="center">
            <v-avatar class="profile" color="grey" size="150">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
          </v-row>

          <v-row class="text-center" align="center" justify="center">
            <div class="my-4">Ameer Khan</div>
          </v-row>

        </v-col>
        <v-col class="pa-0 my-auto" cols="12" md="9">
          <div :class="[$vuetify.breakpoint.name === 'xs' ? 'mx-4' : '']">
            Congratulations for being nominated for 9th best entrepreneur among 500 new entrepreneurs by Forbes Magazine!!! I wish chaldal team the very best.. And your products types, brand types need to be extended more.
          </div>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
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

    mounted(){
      console.log('landing banner')
    },
  }
</script>
