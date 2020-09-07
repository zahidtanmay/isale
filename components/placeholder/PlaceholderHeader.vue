<template>

  <v-app-bar app clipped-left clipped-right flat class="main-nav-bar">

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>

    <v-spacer></v-spacer>

    <v-spacer></v-spacer>


  </v-app-bar>
</template>

<script>

  export default {
    name: 'HeaderBarPlaceHolder',

  }
</script>

<style lang="scss">
  .main-logo { text-decoration: none; }
  .main-nav-bar { background-color: $nav-bar-color !important;border-color: $nav-bar-color !important; }
</style>
