<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :value="sideDrawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item class="hidden-lg-and-up">
          <v-list-item-action>
            <v-img alt="logo" src="/apple-touch-icon.png" max-height="40" max-width="40"/>
          </v-list-item-action>
          <v-list-item-content>
            <h3>Byggbelastning</h3>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Oversikt</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Om</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <Toolbar/>

    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Toolbar from './components/Toolbar.vue'
import Footer from './components/Footer.vue'

export default Vue.extend({
  props: {
    source: String
  },
  components: {
    Footer,
    Toolbar
  },
  computed: mapState([
    'sideDrawer'
  ]),
  created: async function () {
    await this.$accessor.updateLocations()
    await this.$accessor.updateDashboardData()
  }
})
</script>
