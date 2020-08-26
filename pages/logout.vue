<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'Logout',
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/login')
      }

      this.$store.dispatch('profile/logout')
    },
  }
</script>
