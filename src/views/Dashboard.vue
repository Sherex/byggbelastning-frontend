<template>
  <v-container fill-height fluid>
    <v-row class="align-start justify-center">
      <v-col cols="auto" style="min-width: 375px;" v-for="school in schools" :key="school.name">
        <SchoolInfo :school="school"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import SchoolInfo from '../components/SchoolInfo.vue'
import { getDashboardData, DashboardData } from '../lib/get-dashboard-data'
import { getLocations, Location } from '../lib/get-locations'

export default Vue.extend({
  name: 'Dashboard',
  components: {
    SchoolInfo
  },
  created: function () {
    this.updateLocations()
    // this.updateData()
  },
  data: function () {
    const schools: DashboardData[] | Location[] | undefined[] = []
    return {
      schools
    }
  },
  methods: {
    updateLocations: async function () {
      this.schools = await getLocations()
    },
    updateData: async function () {
      // TODO: Handle if data fetch failed, display error
      this.schools = await getDashboardData()
    }
  }
})
</script>
