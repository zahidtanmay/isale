<template>
  <v-row>
    <v-col
      v-for="card in banners"
      :key="card"
      :cols="card"
    >
      <v-card :class="[$vuetify.breakpoint.name === 'xs' ? '' : 'mx-16']" flat>
        <v-img
          :src="card"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
        </v-img>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CategoryBanner',
    computed: {
      ...mapGetters({
        banners: 'product/getBanners'
      })
    }
  }
</script>
