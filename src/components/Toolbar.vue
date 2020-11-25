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
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import TypeFilterButton from './TypeFilterButton.vue'
import store from '../store'

export default Vue.extend({
  name: 'Toolbar',
  components: {
    TypeFilterButton
  },
  methods: {
    ...mapMutations({
      toggleSideDrawer: 'TOGGLE_SIDE_DRAWER'
    })
  },
  computed: {
    searchFieldContent: {
      set (searchText: string): void {
        store.commit('SET_SEARCH_TEXT', searchText)
      },
      get (): string {
        return store.state.searchText
      }
    }
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
