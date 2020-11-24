<template>
  <v-card>
    <v-card-title>{{location.name}}</v-card-title>
    <v-card-subtitle>
      <b>{{location.type.name || location.type.code}}</b><br>
      Bygninger: {{location.buildings.length}} - Etasjer: {{location.buildings.reduce((p, b) => p + b.floors.length, 0)}}
    </v-card-subtitle>
    <v-card-text v-if="location.clients">
      <v-container fluid style="text-align: center;">
        <v-row>
          <v-col cols="4">
            <div>
              <h1>{{location.clients.current}}</h1>
              <p>Nåværende</p>
            </div>
          </v-col>
          <v-col cols="4">
            <div>
              <h1>{{location.clients.uniqueToday}}</h1>
              <p>I dag</p>
            </div>
          </v-col>
          <v-col cols="4">
            <div>
              <h1>{{location.clients.uniqueYesterday}}</h1>
              <p>I går</p>
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
  ]
})
</script>
