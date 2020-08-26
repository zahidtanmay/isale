<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card class="text-center">
      <v-card-title>
        <span class="headline">Login</span>
        <v-spacer />
        <v-icon
          aria-label="Close"
          @click="dialog = false"
        >
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text>

        <login-form/>

      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
  import LoginForm from './Form'

  export default {
    name: 'LoginModal',

    computed: {
      dialog: {
        get () {
          return this.$store.state.component.loginDialog
        },
        set (val) {
          this.$store.commit('component/setLoginDialog', val)
        }
      }
    },

    components: {
      LoginForm
    }
  }
</script>
