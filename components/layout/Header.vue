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

    <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search" v-model="search" background-color="amber lighten-2" class="search-input"></v-text-field>

    <v-spacer></v-spacer>

    <span class="title d-none d-md-flex"><v-icon>mdi-phone</v-icon> {{company.mobile}}</span>

    <v-divider class="mx-4 d-none d-md-flex" inset vertical></v-divider>

    <v-btn text nuxt to="/help" class="ml-2 d-none d-md-flex">Help & More</v-btn>

    <v-divider class="mx-4 d-none d-md-flex" inset vertical></v-divider>

    <no-ssr>

      <template v-if="this.$auth.loggedIn">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in authDropdown" :key="index" @click="sessionTo(item.link)" class="menu-item">
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </template>

      <template v-else>
        <v-btn color="error" dark large tile text @click="setLoginDialog" class="my-2 d-none d-md-flex">Sign In</v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon class="d-md-none"> <v-icon>mdi-dots-vertical</v-icon></v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in dropdown" :key="index" @click="sessionTo(item.link)" class="menu-item">
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template slot="placeholder"><v-btn depressed text color="amber" class="placeholder-btn"></v-btn></template>

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
      authDropdown: [
        { 'title': 'Profile', 'link': 'profile' },
        { 'title': 'Orders', 'link': 'orders' },
        { 'title': 'Logout', 'link': 'logout' },
      ],
      dropdown: [
        { 'title': 'Need Help', 'link': 'help' },
        { 'title': 'Sign In', 'link': 'login' },
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

      setLoginDialog() {
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
          case 'help':
            this.$router.push('/help')
            break
          case 'login':
            this.setLoginDialog()
            break
          default:
        }
      }
    },

    components: {
      LoginDialog
    },

    mounted () {
      console.log('header')
    }
  }
</script>

<style lang="scss">
  .main-logo { text-decoration: none; }
  .main-nav-bar { background-color: $nav-bar-color !important;border-color: $nav-bar-color !important; }
  .place-holder-btn { color: $nav-bar-color !important; }
  .search-input { color: grey !important; }
  .menu-item { min-height: 36px; }
</style>
