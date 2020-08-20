<template>
  <v-app-bar
    clipped-left
    color="secondary"
    app
  >
    <v-app-bar-nav-icon @click.stop="toggleSideDrawer()"></v-app-bar-nav-icon>

    <router-link to="/">
      <v-img class="toolbar-logo" alt="logo" src="/apple-touch-icon.png" max-height="40" max-width="40"/>
    </router-link>

    <router-link to="/">
      <v-toolbar-title>Byggbelastning</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>
    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Toolbar',
  methods: {
    ...mapMutations(['toggleSideDrawer'])
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: unset !important;
}
.toolbar-logo {
  margin: 0 15px 0 5px;
}
</style>
