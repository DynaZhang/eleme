import Vue from 'vue'
import Vuex from 'vuex'

import seller from './module/seller'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    seller
  }
})
