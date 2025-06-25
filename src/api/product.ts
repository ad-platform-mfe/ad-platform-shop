import api from './index'
import type { Product } from '../views/product/management/types'

// 获取所有商品信息
export const getAllProducts = () => {
  return api.get('/products')
}

// 根据ID获取商品信息
export const getProductById = (id: string) => {
  return api.get(`/products/${id}`)
}

// 创建新商品
export const createProduct = (productData: Partial<Product>) => {
  return api.post('/products', productData)
}

// 更新商品信息
export const updateProduct = (id: string, productData: Partial<Product>) => {
  return api.put(`/products/${id}`, productData)
}

// 删除商品
export const deleteProduct = (id: string) => {
  return api.delete(`/products/${id}`)
}

// 搜索商品信息
export const searchProducts = (params: Record<string, any>) => {
  return api.get('/products/search', { params })
}

// 获取指定商铺的所有商品
export const getProductsByStoreId = (storeId: string) => {
  return api.get(`/stores/${storeId}/products`)
}