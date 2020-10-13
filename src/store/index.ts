import Vue from 'vue'
import Vuex from 'vuex'
import { Location } from '../lib/get-locations'

Vue.use(Vuex)

interface States {
  sideDrawer: boolean
  locations: Location[] | []
  filterTypes: string[] | []
}

export default new Vuex.Store<States>({
  state: {
    sideDrawer: true,
    locations: [],
    filterTypes: []
  },
  mutations: {
    TOGGLE_SIDE_DRAWER: (state) => {
      state.sideDrawer = !state.sideDrawer
    },
    UPDATE_LOCATIONS: (state, locations: Location[]) => {
      state.locations = locations
    },
    UPDATE_FILTER_TYPES: (state, types: string[] | []) => {
      state.filterTypes = types
    }
  },
  actions: {
  },
  modules: {
  }
})
