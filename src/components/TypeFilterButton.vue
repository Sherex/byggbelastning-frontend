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

export default Vue.extend({
  name: 'TypeFilterButton',
  computed: {
    filterTypes: {
      set (types: string[]): void {
        this.$accessor.setFilterTypes(types)
      },
      get (): string[] {
        return this.$accessor.enabledFilterTypes
      }
    },
    allFilterTypes: function () {
      return this.$accessor.filterTypes
    }
  },
  created: function (): void {
    this.filterTypes = this.allFilterTypes.map(type => type.code)
  }
})
</script>
