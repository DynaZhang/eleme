import axios from './index'

/**
 * 获取商家信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getSeller = (params) => {
  return axios.request({
    method: 'get',
    url: '/seller/detail',
    params
  })
}

/**
 * 获取商品
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getGoodsBySellerId = (params) => {
  return axios.request({
    method: 'get',
    url: '/goods/getGoodsBySellerId',
    params
  })
}
