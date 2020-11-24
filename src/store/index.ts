import Vue from 'vue'
import Vuex from 'vuex'
import { getLocations, Location } from '../lib/get-locations'
import { getDashboardData, DashboardData } from '../lib/get-dashboard-data'

Vue.use(Vuex)

interface States {
  sideDrawer: boolean
  locations: Location[]
  filterTypes: string[]
  searchText: string
}

export default new Vuex.Store<States>({
  state: {
    sideDrawer: true,
    locations: [],
    filterTypes: [],
    searchText: ''
  },
  mutations: {
    TOGGLE_SIDE_DRAWER: (state) => {
      state.sideDrawer = !state.sideDrawer
    },
    SET_LOCATIONS: (state, locations: Location[]) => {
      state.locations = locations
    },
    SET_DASHBOARD_DATA: (state, data: DashboardData[]) => {
      data.forEach(location => {
        const foundLocation = state.locations.find(loc => loc.id === location.id)
        if (typeof foundLocation === 'undefined') return
        Vue.set(foundLocation, 'clients', location.clients)
      })
    },
    SET_FILTER_TYPES: (state, types: string[] | []) => {
      state.filterTypes = types
    },
    SET_SEARCH_TEXT: (state, text: string) => {
      state.searchText = text
    }
  },
  actions: {
    async UPDATE_LOCATIONS ({ commit }) {
      commit('SET_LOCATIONS', await getLocations())
    },
    async UPDATE_DASHBOARD_DATA ({ commit }) {
      commit('SET_DASHBOARD_DATA', await getDashboardData())
    }
  },
  modules: {
  }
})
