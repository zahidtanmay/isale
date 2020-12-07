<template>
  <div>
    <div class="headline text-center my-8">
      Our Product categories
    </div>

    <no-ssr>
      <v-row justify="center">
        <v-col
          v-for="category in categories"
          :key="category.name"
          :cols="12"
          md="4"
          class="py-1"
        >
          <v-card outlined hover ripple nuxt :to="category.slug">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle v-text="category.name" class="text-center"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="`mdi-${category.icon}`" small></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <template slot="placeholder">

        <v-row justify="center">
          <v-col md="8">
            <v-row align="center" justify="center">
              <v-col
                v-for="category in 8"
                :key="category"
                md="4"
                class="py-1"
              >
                <v-card outlined>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle class="text-center">loading..</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <!--                  <v-icon v-text="`mdi-${category.icon}`" small></v-icon>-->
                    </v-list-item-icon>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

      </template>

    </no-ssr>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LandingCategories',

  data: () => ({
    inject: ['theme'],
  }),

  computed: {
    ...mapGetters({
      categories: 'bootstrap/getCategories'
    })
  },

}
</script>
