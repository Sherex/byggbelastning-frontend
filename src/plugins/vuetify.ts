import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

// TODO: Configureable colors
export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#005260',
        background: '#f7f7f7',
        secondary: '#ebe6d6',
        accent: '#6ac4ae',
        error: '#e40017',
        info: '#00b1c7',
        success: '#C0DCB2',
        warning: '#FFCD00'
      }
    }
  }
})
