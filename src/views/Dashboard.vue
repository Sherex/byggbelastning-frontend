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
import LocationInfo from '../components/LocationInfo.vue'
import { getDashboardData } from '../lib/get-dashboard-data'
import { getLocations, Location } from '../lib/get-locations'

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
      const locations: Location[] = this.$store.state.locations
      return locations.filter(location => filterTypes.includes(location.type.code))
    }
  }
})
</script>
