<template>
  <v-card
    :to="`/location/${location.id}`"
    :elevation="cardMouseOver ? 5 : 1"
    @mouseover="cardMouseOver = true"
    @mouseout="cardMouseOver = false"
  >
    <v-card-title>
      {{location.name}}
      <v-spacer/>
      <v-btn
        color="primary"
        icon
        large
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      <b>{{location.type.name || location.type.code}}</b>
      <p>
        <v-icon small>mdi-office-building-outline</v-icon>
        {{location.buildings.length}}
        <v-icon small>mdi-floor-plan</v-icon>
        {{location.buildings.reduce((p, b) => p + b.floors.length, 0)}}
      </p>
    </v-card-subtitle>
    <v-card-text v-if="location.clients" class="stats">
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <div>
              <h1>{{mockData.prints}}</h1>
              <p>Utskrifter</p>
            </div>
          </v-col>
          <v-col cols="4">
            <div>
              <h1>{{mockData.powerUsage}}</h1>
              <p>Strømforbruk (kWh)</p>
            </div>
          </v-col>
          <v-col cols="4">
            <div>
              <h1>{{location.clients.uniqueYesterday}}</h1>
              <p>Brukere</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div style="text-align: center;">
        <v-sparkline
          :key="location.name"
          :smooth="16"
          color="primary"
          :line-width="3"
          :value="location.clients.trend"
          auto-draw
          stroke-linecap="round"
          fill
        ></v-sparkline>
        <p>Gårsdagen's 24 timer</p>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <!-- TODO: Find better solution for card size when no data -->
      <v-skeleton-loader
        class="mx-auto"
        type="card"
        boilerplate
        max-height="226px"
      ></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LocationInfo',
  props: [
    'location'
  ],
  data: () => ({
    cardMouseOver: false,
    mockData: {
      prints: Math.ceil(Math.random() * 500),
      powerUsage: `${Math.ceil(Math.random() * 3000) + 1000}`
    }
  })
})
</script>

<style scoped>
.stats {
  text-align: center;
  padding: 3px;
}
</style>
