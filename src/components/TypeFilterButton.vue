<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        icon
        large
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(types, index) in allFilterTypes"
        :key="index"
      >
        <v-checkbox
          :label="types.name || types.code"
          :value="types.code"
          v-model="filterTypes"
        ></v-checkbox>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Location } from '../lib/get-locations'
import store from '../store'

export default Vue.extend({
  name: 'TypeFilterButton',
  computed: {
    filterTypes: {
      set (types: string[]): void {
        store.commit('UPDATE_FILTER_TYPES', types)
      },
      get (): string[] {
        return store.state.filterTypes
      }
    },
    allFilterTypes: function (): Location['type'][] {
      const filterTypes: Location['type'][] = []
      store.state.locations.forEach(location => {
        if (filterTypes.findIndex(existingType => existingType.code === location.type.code) === -1) {
          filterTypes.push(location.type)
        }
      })
      return filterTypes
    }
  },
  created: function (): void {
    this.filterTypes = this.allFilterTypes.map(type => type.code)
  }
})
</script>
