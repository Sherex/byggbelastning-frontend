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
      <v-col
        cols="12"
      >
        <v-btn @click="signIn()" >Sign in</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'

export default Vue.extend({
  name: 'Login',
  computed: {
    hash: () => location?.hash
    // login: () => store.msal?.login // TODO: Vuex + TS !== <3 (try package 'typed-vuex')
  },
  mounted () {
    if (location?.hash) {
      store.dispatch('msal/handleRedirect', location?.hash)
    } else {
      store.dispatch('msal/loginRedirect')
    }
  },
  methods: {
    signIn: async () => { await store.dispatch('msal/loginPopup') }
  }
})
</script>
