<template>

    <v-container fluid>

      <v-row dense>

        <v-col md="11">

          <banner></banner>

          <bread-crumb></bread-crumb>

          <category-title/>

          <Items/>

        </v-col>

      </v-row>

    </v-container>

</template>

<script>
  import Banner from '~/components/category/Banner.vue'
  import BreadCrumb from '~/components/category/BreadCrumb.vue'
  import Items from '~/components/category/Items.vue'
  import CategoryTitle from '~/components/category/Title.vue'
  export default {
    name: 'CategoryRoot',
    auth: false,

    head () {
      return {
        title: this.route,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },

    computed: {
      route() {
        const route = this.$route.params.category
        let str = ''
        let value = route.split('-')
        if (value[value.length - 1] && !isNaN(Number(value[value.length - 1]))) {
          value.splice(value.length - 3, 3)
        } else {
          value.splice(value.length - 2, 2)
        }
        value.map(word => {str = str + ' ' + word.charAt(0).toUpperCase() + word.slice(1)})
        return str.trim()
      }
    },

    data: () => ({
    }),

    components: {
      Banner,
      BreadCrumb,
      Items,
      CategoryTitle
    },

    mounted() {

    },

    async middleware({ store, redirect, route }) {
      await store.dispatch('product/fetchProduct', route.params.category)
    }
  }
</script>
