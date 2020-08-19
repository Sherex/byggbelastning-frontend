import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideDrawer: true
  },
  mutations: {
    toggleSideDrawer: (state) => {
      state.sideDrawer = !state.sideDrawer
    }
  },
  actions: {
  },
  modules: {
  }
})
