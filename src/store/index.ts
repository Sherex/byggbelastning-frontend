import Vue from 'vue'
import Vuex from 'vuex'
import {
  useAccessor,
  getterTree,
  mutationTree,
  actionTree
} from 'typed-vuex'
import { config } from '../config'
import { vuexCreateMsalModule, CreateVuexModuleOptions } from './modules/msal'
import { getLocations, Location } from '../lib/get-locations'
import { getDashboardData, DashboardData } from '../lib/get-dashboard-data'

Vue.use(Vuex)

const msalOptions: CreateVuexModuleOptions = {
  namespaced: true,
  msalConfig: {
    auth: {
      clientId: config.msal.clientId,
      authority: config.msal.authority,
      redirectUri: '/login'
    }
  }
}

interface States {
  sideDrawer: boolean
  locations: Location[]
  filterTypes: (Location['type'] & { enabled: boolean })[]
  searchText: string
}

const state = (): States => ({
  sideDrawer: true,
  locations: [],
  filterTypes: [],
  searchText: ''
})

const getters = getterTree(state, {
  enabledFilterTypes: (state) => {
    return state.filterTypes.filter(type => type.enabled).map(type => type.code)
  }
})

const mutations = mutationTree(state, {
  toggleSideDrawer: (state) => {
    state.sideDrawer = !state.sideDrawer
  },
  setLocations: (state, locations: Location[]) => {
    state.locations = locations
  },
  setDashboardData: (state, data: DashboardData[]) => {
    data.forEach(location => {
      const foundLocation = state.locations.find(loc => loc.id === location.id)
      if (typeof foundLocation === 'undefined') return
      Vue.set(foundLocation, 'clients', location.clients)
    })
  },
  setFilterTypes: (state, types: string[]) => {
    state.filterTypes.forEach((type, i) => {
      Vue.set(state.filterTypes[i], 'enabled', types.includes(type.code))
    })
  },
  setSearchText: (state, text: string) => {
    state.searchText = text
  }
})

const actions = actionTree(
  { state, getters, mutations },
  {
    async updateLocations ({ commit, state }) {
      const locations = await getLocations()
      commit('setLocations', locations)

      state.locations.forEach(location => {
        if (state.filterTypes.findIndex(existingType => existingType.code === location.type.code) === -1) {
          state.filterTypes.push({
            ...location.type,
            enabled: true
          })
        }
      })
    },
    async updateDashboardData ({ commit }) {
      commit('setDashboardData', await getDashboardData())
    }
  }
)

Vue.use(Vuex)

export const storePattern = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    msal: vuexCreateMsalModule(msalOptions)
  }
}

const store = new Vuex.Store(storePattern)
export const accessor = useAccessor(store, storePattern)

Vue.prototype.$accessor = accessor

export default store
