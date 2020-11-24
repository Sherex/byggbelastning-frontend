import Vue from 'vue'
import Vuex from 'vuex'
import { getLocations, Location } from '../lib/get-locations'
import { getDashboardData, DashboardData } from '../lib/get-dashboard-data'

Vue.use(Vuex)

interface States {
  sideDrawer: boolean
  locations: Location[]
  filterTypes: (Location['type'] & { enabled: boolean })[]
  searchText: string
}

export default new Vuex.Store<States>({
  state: {
    sideDrawer: true,
    locations: [],
    filterTypes: [],
    searchText: ''
  },
  getters: {
    enabledFilterTypes: (state) => {
      return state.filterTypes.filter(type => type.enabled).map(type => type.code)
    }
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
    SET_FILTER_TYPES: (state, types: string[]) => {
      state.filterTypes.forEach((type, i) => {
        Vue.set(state.filterTypes[i], 'enabled', types.includes(type.code))
      })
    },
    SET_SEARCH_TEXT: (state, text: string) => {
      state.searchText = text
    }
  },
  actions: {
    async UPDATE_LOCATIONS ({ commit, state }) {
      const locations = await getLocations()
      commit('SET_LOCATIONS', locations)

      state.locations.forEach(location => {
        if (state.filterTypes.findIndex(existingType => existingType.code === location.type.code) === -1) {
          state.filterTypes.push({
            ...location.type,
            enabled: true
          })
        }
      })
    },
    async UPDATE_DASHBOARD_DATA ({ commit }) {
      commit('SET_DASHBOARD_DATA', await getDashboardData())
    }
  },
  modules: {
  }
})
