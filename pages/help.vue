<template>
  <v-container class="pa-4">
    <template v-if="pages.length > 0">
      <v-card color="basil" flat>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-1 basil--text">{{title | showTitle}}</h1>
        </v-card-title>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="page in pages"
            :key="page.name"
          >
            {{ page.name }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="page in pages"
            :key="page.name"
          >
            <v-card
              color="basil"
              flat
            >
              <v-card-text>{{ page.body }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>

  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SingleItem from '~/components/category/Item'
  import ItemDetailsDialog from '~/components/item/ItemDetailsDialog'

  export default {
    name: 'Help',
    auth: false,
    inject: ['theme'],

    data: () => ({
      tab: null,
      items: [
        'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }),

    components: {
      SingleItem,
      ItemDetailsDialog
    },

    computed: {
      ...mapGetters({
        pages: 'bootstrap/getPages'
      }),
      title () {
        const tab = this.pages[this.tab]
        return tab
      }
    },
    mounted () {
      console.log('xoxo')
    },
    filters: {
      showTitle(val) {
        if (val) {
          return val.title
        }
      }
    }
  }
</script>

<style scoped>

</style>
