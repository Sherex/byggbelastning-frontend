<template>
  <div>
    <!-- TODO: Content -->
    <h3>{{appName}}</h3>
    <p>Kildekode: <a :href="repositoryUrl">{{repositoryUrl}}</a></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { config } from '../config'

export default Vue.extend({
  name: 'About',
  data: () => ({
    appName: config.metaData.appName,
    repositoryUrl: config.metaData.repositoryUrl
  })
})
</script>
