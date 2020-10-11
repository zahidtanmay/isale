<template>
  <v-container>

    <v-row>
      <v-col>
        <div class="font-weight-light text-center" style="font-size: 25px;">Your Profile</div>
      </v-col>
    </v-row>

    <ProfileInfo/>

    <AddressBook/>

    <address-dialog/>

  </v-container>

</template>

<script>
  import AddressDialog from '~/components/address/AddressDialog.vue'
  import ProfileInfo from '~/components/profile/Info.vue'
  import AddressBook from '~/components/profile/AddressBook.vue'

  export default {
    name: 'YourProfile',

    title: 'Profile',

    head () {
      return {
        title: 'MyProfile',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },

    middleware({ store, redirect, $auth }) {
      if (!$auth.loggedIn) {
        return redirect('/login')
      }
      store.dispatch('checkout/fetchLedgers')
      store.dispatch('profile/fetchLocations')
      store.dispatch('bootstrap/fetchAreas')
      store.dispatch('checkout/fetchDeliverySlots')
    },

    mounted() {
      this.$store.dispatch('profile/fetchLocations')
      this.$store.dispatch('bootstrap/fetchAreas')
    },

    components: {
      AddressDialog,
      ProfileInfo,
      AddressBook
    },

  }
</script>

<style>
  .orders-list-text { margin: 0 !important; }
  .orders-list-action { background: #eceaea;}
</style>
