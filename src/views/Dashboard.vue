<template>
  <v-container fill-height fluid>
    <v-row class="align-start justify-center">
      <v-col cols="auto" style="min-width: 375px; max-width: 375px;" v-for="location in locations" :key="location.id">
        <LocationInfo :location="location"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import LocationInfo from '../components/LocationInfo.vue'

export default Vue.extend({
  name: 'Dashboard',
  components: {
    LocationInfo
  },
  created: async function () {
    await store.dispatch('UPDATE_LOCATIONS')
    await store.dispatch('UPDATE_DASHBOARD_DATA')
  },
  computed: {
    locations: function () {
      const filterTypes = store.getters.enabledFilterTypes
      const locations = store.state.locations
      const searchText = store.state.searchText
      const locationsFiltered = locations
        .filter(location => filterTypes.includes(location.type.code))
        .filter(location => (new RegExp(searchText.replaceAll(' ', '.+'), 'i')).test(location.name))
      return locationsFiltered
    }
  }
})
</script>
