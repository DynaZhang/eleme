import {getSeller} from '../../api/data'

export default {
  namespaced: true,
  state: {
    sellerDetail: {},
    selectFoods: []
  },
  getters: {
    getSellerDetail: state => state.sellerDetail,
    getSelectFoods: state => state.selectFoods
  },
  mutations: {
    setSellerDetail: (state, sellerDetail) => {
      state.sellerDetail = sellerDetail
    },
    setSelectFoods: (state, selectFoods) => {
      state.selectFoods = selectFoods
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
