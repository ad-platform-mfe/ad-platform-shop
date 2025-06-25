import api from './index'

// 获取所有商铺信息
export const getAllStores = () => {
  return api.get('/stores')
}

// 根据ID获取商铺信息
export const getStoreById = (id: string) => {
  return api.get(`/stores/${id}`)
}

// 创建新商铺
export const createStore = (storeData: any) => {
  return api.post('/stores', storeData)
}

// 更新商铺信息
export const updateStore = (id: string, storeData: any) => {
  return api.put(`/stores/${id}`, storeData)
}

// 删除商铺
export const deleteStore = (id: string) => {
  return api.delete(`/stores/${id}`)
}