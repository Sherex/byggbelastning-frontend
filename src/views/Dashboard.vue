<template>
  <v-container fill-height fluid align-start justify-center>
    <v-row>
      <v-col cols="4" v-for="school in schools" :key="school.name">
        <SchoolInfo :school="school"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import SchoolInfo from '../components/SchoolInfo.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    SchoolInfo
  },
  created: function () {
    this.schools.forEach(school => {
      school.clients.trend = this.genTrend(1300, 2000)
    })
  },
  data: function () {
    return {
      schools: [
        {
          name: 'Skogmo',
          clients: {
            current: 1066,
            uniqueToday: 1746,
            uniqueYesterday: 1533,
            trend: [0]
          }
        },
        {
          name: 'Bamble',
          clients: {
            current: 952,
            uniqueToday: 1430,
            uniqueYesterday: 1527,
            trend: [0]
          }
        },
        {
          name: 'Skien',
          clients: {
            current: 1589,
            uniqueToday: 2203,
            uniqueYesterday: 2120,
            trend: [0]
          }
        },
        {
          name: 'Porsgrunn',
          clients: {
            current: 1405,
            uniqueToday: 1832,
            uniqueYesterday: 1738,
            trend: [0]
          }
        }
      ]
    }
  },
  methods: {
    genTrend: (min: number, max: number): number[] => {
      return Array.from({ length: 12 }, () => Math.ceil(Math.random() * (max - min) + min))
    }
  }
})
</script>
