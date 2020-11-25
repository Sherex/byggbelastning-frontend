<template>
  <v-container
    v-if="location && location.clients"
    fill-height
    fluid
    align-start
    style="padding: 0 5em;"
  >
    <!-- TODO: Implement location details view -->
    <v-row class="justify-center stats">
      <v-col cols="12">
        <h1>{{location.name}}</h1>
        <h3 style="color: grey" >{{location.type.name || location.type.code}}</h3>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title class="stats">{{mockData.prints}}</v-card-title>
          <v-card-subtitle>Utskrifter</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title class="stats">{{mockData.powerUsage}} kWh</v-card-title>
          <v-card-subtitle>Strømforbruk</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title class="stats">{{location.clients.uniqueYesterday}}</v-card-title>
          <v-card-subtitle>Brukere</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Brukere i går</v-card-title>
          <v-card-text>
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
              <p></p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'

export default Vue.extend({
  name: 'Location',
  computed: {
    location: function () {
      const paramId = Number(this.$route.params.id)
      // TODO: Handle non number id param
      return store.state.locations.filter(location => location.id === paramId)[0]
    }
  },
  data: () => ({
    mockData: {
      prints: Math.ceil(Math.random() * 500),
      powerUsage: `${Math.ceil(Math.random() * 500)}`
    }
  })
})
</script>

<style>
.stats {
  justify-content: center;
  text-align: center;
}
</style>
