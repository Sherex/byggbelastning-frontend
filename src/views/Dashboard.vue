<template>
  <v-container fill-height fluid>
    <v-row class="align-start justify-center">
      <v-col cols="auto" style="min-width: 375px;" v-for="school in locations" :key="school.name">
        <SchoolInfo :school="school"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import SchoolInfo from '../components/SchoolInfo.vue'
// import { getDashboardData, DashboardData } from '../lib/get-dashboard-data'
import { getLocations, Location } from '../lib/get-locations'

export default Vue.extend({
  name: 'Dashboard',
  components: {
    SchoolInfo
  },
  created: async function () {
    const locations = await getLocations()
    this.$store.commit('UPDATE_LOCATIONS', locations)
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
