<template>
  <v-container
    fill-height
    fluid
    align-start
  >
    <v-row class="justify-center">
      <v-col
        cols="12"
      >
        <h1>{{hash ? 'Logger inn' : 'Omdirigerer'}}</h1>
        <h3>Vennligst vent..</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Login',
  computed: {
    hash: () => location?.hash
  },
  mounted () {
    this.$accessor.msal.performLogin(location?.hash)
  }
})
</script>
