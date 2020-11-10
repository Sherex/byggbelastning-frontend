<template>
  <v-container fill-height fluid>
    <v-row class="align-start justify-center">
      <v-col cols="auto" style="min-width: 375px; max-width: 375px;" v-for="location in locations" :key="location.name">
        <LocationInfo :location="location"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import LocationInfo from '../components/LocationInfo.vue'
import { getDashboardData } from '../lib/get-dashboard-data'
import { getLocations } from '../lib/get-locations'

export default Vue.extend({
  name: 'Dashboard',
  components: {
    LocationInfo
  },
  created: async function () {
    const locations = await getLocations()
    this.$store.commit('UPDATE_LOCATIONS', locations)
    const locationData = await getDashboardData()
    this.$store.commit('UPDATE_DASHBOARD_DATA', locationData)
  },
  computed: {
    locations: function () {
      const filterTypes = this.$store.state.filterTypes
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
