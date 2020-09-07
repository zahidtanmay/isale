<template>

  <v-app-bar app clipped-left clipped-right flat class="main-nav-bar">
      <v-app-bar-nav-icon @click="setNavDrawer"></v-app-bar-nav-icon>


      <nuxt-link to="/" class="main-logo black--text">
        <v-img
          :src="company.logo"
          contain
          max-height="60px"
          width="80px"
          class="mx-8"
        ></v-img>
      </nuxt-link>

      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>


      <template v-if="loggedIn">

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

      loggedIn() {
        return this.$auth.loggedIn
      },

      user() {
        return this.$auth.user
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

    mounted(){
      console.log('landing head')
    },


  }
</script>

<style lang="scss">
  .main-logo { text-decoration: none; }
  .main-nav-bar { background-color: $nav-bar-color !important;border-color: $nav-bar-color !important; }
</style>
