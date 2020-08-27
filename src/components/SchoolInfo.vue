<template>
  <v-card>
    <v-card-title>{{school.name}}</v-card-title>
    <v-card-text>
      <v-container fluid style="text-align: center;">
        <v-row>
          <v-col cols="4">
            <div>
              <h1>{{school.clients.current}}</h1>
              <p>Currently</p>
            </div>
          </v-col>
          <v-col cols="4">
            <div>
              <h1>{{school.clients.uniqueToday}}</h1>
              <p>Today</p>
            </div>
          </v-col>
          <v-col cols="4">
            <div>
              <h1>{{school.clients.uniqueYesterday}}</h1>
              <p>Yesterday</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div style="text-align: center;">
        <v-sparkline
          :key="school.name"
          :smooth="16"
          color="primary"
          :line-width="3"
          :value="school.clients.trend"
          auto-draw
          stroke-linecap="round"
          fill
        ></v-sparkline>
        <p>Last 24h</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SchoolInfo',
  props: [
    'school'
  ]
}
</script>
