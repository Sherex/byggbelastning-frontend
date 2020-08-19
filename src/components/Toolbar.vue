<template>
  <v-app-bar
    clipped-left
    color="secondary"
    app
  >
    <v-app-bar-nav-icon @click.stop="toggleSideDrawer()"></v-app-bar-nav-icon>

    <v-btn icon x-large color="secondary" class="hidden-xs-only mr-3">
      <v-img alt="logo" src="/apple-touch-icon.png" max-height="40" max-width="40">
      </v-img>
    </v-btn>

    <router-link to="/">
      <v-toolbar-title>Byggbelastning</v-toolbar-title>
    </router-link>

    <div class="flex-grow-1"></div>
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
</style>
