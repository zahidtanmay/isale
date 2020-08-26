<template>

    <v-row
      justify="center"
    >
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

    components: {
      LoginForm
    }
  }
</script>
