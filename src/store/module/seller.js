import {getSeller} from '../../api/data'

export default {
  namespaced: true,
  state: {
    sellerDetail: {}
  },
  getters: {
    getSellerDetail: state => state.sellerDetail
  },
  mutations: {
    setSellerDetail: (state, sellerDetail) => {
      state.sellerDetail = sellerDetail
    }
  },
  actions: {
    reqSellerDetailAction: ({commit}) => {
      return new Promise((resolve, reject) => {
        getSeller({}).then(res => {
          if (res.result) {
            commit('setSellerDetail', res.data)
          } else {
            commit('setSellerDetail', {})
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
