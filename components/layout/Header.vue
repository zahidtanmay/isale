<template>

  <v-app-bar app clipped-left clipped-right flat class="main-nav-bar">
    <v-app-bar-nav-icon @click="setNavDrawer"></v-app-bar-nav-icon>


    <nuxt-link to="/" class="main-logo black--text">
      <v-img
        :src="company.logo"
        contain
        max-height="60px"
        :width="$vuetify.breakpoint.name === 'xs' ? '40px' : '80px'"
        :class="$vuetify.breakpoint.name === 'xs' ? 'mx-3' : 'mx-8'"
      ></v-img>
    </nuxt-link>

    <no-ssr>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search" v-model="search" background-color="amber lighten-2" class="search-input"></v-text-field>
      <template slot="placeholder">
        <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search" background-color="amber lighten-2" class="search-input"></v-text-field>
      </template>
    </no-ssr>


    <v-spacer></v-spacer>

    <v-spacer></v-spacer>


    <no-ssr>
      <template v-if="this.$auth.loggedIn">

        <div><v-menu
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in sessions"
              :key="index"
              @click="sessionTo(item.link)"
            >
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></div>

      </template>

      <template v-else>
        <v-btn color="error" dark large tile outlined @click="setLoginDialog" class="my-2 d-none d-md-flex">Sign In</v-btn>
        <v-btn icon @click="setLoginDialog" class="d-md-none"><v-icon>mdi-login</v-icon></v-btn>
      </template>

      <template slot="placeholder"><v-btn depressed outlined color="amber" class="placeholder-btn"></v-btn></template>
    </no-ssr>

    <login-dialog></login-dialog>

  </v-app-bar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoginDialog from '~/components/login/LoginDialog.vue'

  export default {
    name: 'HeaderBar',
    data: () => ({
      sessions: [
        { 'title': 'Profile', 'link': 'profile' },
        { 'title': 'Orders', 'link': 'orders' },
        { 'title': 'Logout', 'link': 'logout' },
      ]
    }),

    computed: {
      ...mapGetters({
        company: 'bootstrap/getCompanyDetails',
        drawer: 'component/getNavDrawer',
      }),

      search: {
        get() {
          return this.$store.state.product.keyword
        },
        set(val) {
          this.$store.commit('product/SET_KEYWORD', val)
          this.$store.dispatch('product/getSearchedProduct', val)
        }
      }
    },

    methods: {
      setNavDrawer() {
        this.$store.commit('component/setNavDrawer', !this.drawer)
      },

      setLoginDialog () {
        this.$store.commit('component/setLoginDialog', true)
      },

      sessionTo (type) {
        switch (type) {
          case 'profile':
            this.$router.push('/profile')
            break
          case 'orders':
            this.$router.push('/orders')
            break
          case 'logout':
            this.$store.dispatch('profile/logout')
            break
          default:
        }
      }
    },

    components: {
      LoginDialog
    },
  }
</script>

<style lang="scss">
  .main-logo { text-decoration: none; }
  .main-nav-bar { background-color: $nav-bar-color !important;border-color: $nav-bar-color !important; }
  .place-holder-btn { color: $nav-bar-color !important; }
  .search-input { color: grey !important; }
</style>
