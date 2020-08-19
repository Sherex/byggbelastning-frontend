<template>
  <v-footer color="primary" dark app>
    <v-col
      class="text-center"
      cols="12"
    >
    &copy; {{ new Date().getFullYear() }} — {{ productOwner }}
    </v-col>
  </v-footer>
</template>

<script>

export default {
  name: 'Footer',
  data: () => ({
    productOwner: 'Vestfold og Telemark Fylkeskommune'
  })
}
</script>
