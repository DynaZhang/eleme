import axios from './index'

export const getSeller = (params) => {
  return axios.request({
    method: 'get',
    url: '/seller/detail',
    params
  })
}
