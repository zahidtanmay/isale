<template>

    <v-row justify="center">
      <v-card class="mt-4" flat>
        <login-form/>
      </v-card>
    </v-row>

</template>

<script>
  import LoginForm from '~/components/login/Form'

  export default {
    name: 'LogIn',
    auth: 'guest',

    head () {
      return {
        title: 'Login',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },

    components: {
      LoginForm
    }
  }
</script>
