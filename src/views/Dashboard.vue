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

export default Vue.extend({
  name: 'Dashboard',
  components: {
    SchoolInfo
  },
  created: function () {
    this.updateData()
  },
  data: function () {
    const schools: DashboardData[] | undefined[] = []
    return {
      schools
    }
  },
  methods: {
    updateData: async function () {
      this.schools = await getDashboardData()
    }
  }
})
</script>
