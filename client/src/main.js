// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'

import './common/stylus/icon.styl'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(Vuex)
Vue.http.options.emulateJSON = true

const state = {
  selected: [],
  seller: {}
}

const mutations = {
  updateSelectedFoods (state, selectedFoods) {
    state.selected = selectedFoods
  },
  updateSeller (state, seller) {
    state.seller = seller
  }
}

const store = new Vuex.Store(
  {
    state,
    mutations
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
