<template>
  <v-container fill-height fluid>
    <!-- TODO: Implement location details view -->
    <v-row class="align-start justify-center">
      <v-col cols="auto" style="min-width: 375px; max-width: 375px;">
        <LocationInfo v-if="location" :location="location"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import LocationInfo from '../components/LocationInfo.vue'

export default Vue.extend({
  name: 'Location',
  components: {
    LocationInfo
  },
  computed: {
    location: function () {
      const paramId = Number(this.$route.params.id)
      // TODO: Handle non number id param
      return store.state.locations.filter(location => location.id === paramId)[0]
    }
  }
})
</script>
