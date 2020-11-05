<template>
  <div>
    <div class="headline text-center my-8">
      Our Product categories
    </div>

    <v-row justify="center">

      <no-ssr>
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

        <template slot="placeholder">
          <template v-for="i in 6">
            <v-col
              cols="12"
              md="4"
              class="py-1"
            >
              <v-skeleton-loader
                v-bind="attrs"
                type="card-heading"
              ></v-skeleton-loader>

            </v-col>
          </template>
        </template>
      </no-ssr>



    </v-row>
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
