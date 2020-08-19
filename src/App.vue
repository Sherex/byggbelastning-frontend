<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="sideDrawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item  to="/" >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/traffic" >
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
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

<script>
import { mapState } from 'vuex'
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'

export default {
  props: {
    source: String
  },
  components: {
    Footer,
    Toolbar
  },
  computed: mapState([
    'sideDrawer'
  ])
}
</script>
