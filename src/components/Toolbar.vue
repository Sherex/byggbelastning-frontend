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
      <v-toolbar-title>{{appName}}</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>
    <v-text-field
      v-model="searchFieldContent"
      solo-inverted
      flat
      hide-details
      label="Søk"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>

    <type-filter-button/>

    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <!-- TODO: Add account dropdown -->
    <h2>{{login ? login.account.name || 'Innlogget' : 'Utlogget'}}</h2>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import TypeFilterButton from './TypeFilterButton.vue'
import { config } from '../config'

export default Vue.extend({
  name: 'Toolbar',
  components: {
    TypeFilterButton
  },
  data: () => ({
    appName: config.metaData.appName
  }),
  methods: {
    toggleSideDrawer: function () { this.$accessor.toggleSideDrawer() }
  },
  computed: {
    searchFieldContent: {
      set (searchText: string): void {
        this.$accessor.setSearchText(searchText)
      },
      get (): string {
        return this.$accessor.searchText
      }
    },
    login: function () { return this.$accessor.msal.login }
  }
})
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
